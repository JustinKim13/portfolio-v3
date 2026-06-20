import type { NowPlayingData, Track } from "@/types/spotify";

// used for caching the currently playing song in Redis, so we don't have to hit the Spotify API on every request
import { Redis } from "@upstash/redis"

// create the Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
// Seed refresh token from env. The live source of truth is Redis (see getRefreshToken),
// so rotated tokens survive across serverless invocations without a redeploy.
const ENV_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term";

// Redis keys
const LAST_TRACK_KEY = "spotify:last-track";
const ACCESS_TOKEN_KEY = "spotify:access-token";
const REFRESH_TOKEN_KEY = "spotify:refresh-token";
// Set when a refresh fails with invalid_grant. Short-circuits further refresh attempts
// (Spotify: "Do not retry a failed refresh") until it expires or a re-mint succeeds.
const AUTH_FAILED_KEY = "spotify:auth-failed";

// Thrown when the refresh token is expired/revoked (invalid_grant). As of July 20, 2026
// Spotify refresh tokens expire after six months. Callers should fall back to cached data;
// recovery is a manual re-mint via `node scripts/get-refresh-token.mjs`.
class SpotifyAuthError extends Error {}

async function getRefreshToken(): Promise<string> {
  // Prefer the (possibly rotated) token persisted in Redis; fall back to the env seed.
  const stored = await redis.get<string>(REFRESH_TOKEN_KEY).catch(() => null);
  return stored ?? ENV_REFRESH_TOKEN;
}

async function getAccessToken(): Promise<string> {
  // 1. Reuse a cached access token if one is still valid (~1h lifetime).
  const cached = await redis.get<string>(ACCESS_TOKEN_KEY).catch(() => null);
  if (cached) return cached;

  // 2. If the refresh token recently failed (invalid_grant), don't hammer the token
  //    endpoint — bail so callers serve cached data instead.
  const failed = await redis.get(AUTH_FAILED_KEY).catch(() => null);
  if (failed) throw new SpotifyAuthError("refresh previously failed (invalid_grant)");

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const refresh_token = await getRefreshToken();

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({} as Record<string, unknown>));

  if (!response.ok || !data.access_token) {
    // invalid_grant => the refresh token is expired/revoked (the new 6-month expiry).
    // Flag it so we stop retrying, then surface a clear recovery message.
    if (data?.error === "invalid_grant") {
      await redis.set(AUTH_FAILED_KEY, Date.now(), { ex: 1800 }).catch(() => {});
      console.error(
        "[spotify] Refresh token is invalid/expired (invalid_grant). " +
          "Re-mint it: `node scripts/get-refresh-token.mjs` (writes the new token to " +
          "Redis and prints it for SPOTIFY_REFRESH_TOKEN). Serving cached data until then."
      );
      throw new SpotifyAuthError("invalid_grant");
    }
    throw new Error(`spotify token refresh failed: HTTP ${response.status}`);
  }

  // Spotify may rotate the refresh token. Persist a new one when present; otherwise keep
  // using the existing token. (Per Spotify's refreshing-tokens guidance.)
  if (typeof data.refresh_token === "string") {
    await redis.set(REFRESH_TOKEN_KEY, data.refresh_token).catch(() => {});
  }

  // Cache the access token until just before expiry (Spotify default: 3600s).
  const ttl =
    typeof data.expires_in === "number" ? data.expires_in - 60 : 3000;
  await redis
    .set(ACCESS_TOKEN_KEY, data.access_token, { ex: Math.max(ttl, 60) })
    .catch(() => {});
  // We have a working token again — clear any stale failure flag.
  await redis.del(AUTH_FAILED_KEY).catch(() => {});

  return data.access_token as string;
}

async function getFromRedis(): Promise<NowPlayingData> {
  try {
    const cached = await redis.get<{
      title: string;
      artist: string;
      albumArt: string;
      spotifyUrl: string;
      duration: number;
    }>(LAST_TRACK_KEY);
    if (!cached) return { isPlaying: false };
    return { ...cached, isPlaying: false, isRecentlyPlayed: true };
  } catch {
    return { isPlaying: false };
  }
}

export async function getNowPlaying(): Promise<NowPlayingData> {
  let access_token: string;
  try {
    access_token = await getAccessToken();
  } catch {
    return getFromRedis();
  }

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (response.status === 204 || response.status >= 400) {
      return getFromRedis();
    }

    const song = await response.json();

    if (!song || !song.item) {
      return getFromRedis();
    }

    const track: NowPlayingData = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      albumArt: song.item.album.images[0]?.url,
      spotifyUrl: song.item.external_urls.spotify,
      progress: song.progress_ms,
      duration: song.item.duration_ms,
    };

    // write to Redis so we always have a fallback, regardless of how long ago we last played
    await redis.set(LAST_TRACK_KEY, {
      title: track.title,
      artist: track.artist,
      albumArt: track.albumArt,
      spotifyUrl: track.spotifyUrl,
      duration: track.duration,
    });

    return track;
  } catch {
    return getFromRedis();
  }
}

export async function getTopTracks(): Promise<Track[]> {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const data = await response.json();

    return data.items.map(
      (track: {
        name: string;
        artists: { name: string }[];
        album: { images: { url: string }[] };
        external_urls: { spotify: string };
      }) => ({
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        albumArt: track.album.images[0]?.url,
        spotifyUrl: track.external_urls.spotify,
      })
    );
  } catch {
    return [];
  }
}
