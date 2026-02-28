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
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
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
    }>("spotify:last-track");
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
    await redis.set("spotify:last-track", {
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
