import type { NowPlayingData, Track } from "@/types/spotify";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";
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

async function getRecentlyPlayed(access_token: string): Promise<NowPlayingData> {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (!response.ok) return { isPlaying: false };

    const data = await response.json();
    const track = data.items?.[0]?.track;

    if (!track) return { isPlaying: false };

    return {
      isPlaying: false,
      isRecentlyPlayed: true,
      title: track.name,
      artist: track.artists.map((a: { name: string }) => a.name).join(", "),
      albumArt: track.album.images[0]?.url,
      spotifyUrl: track.external_urls.spotify,
      duration: track.duration_ms,
    };
  } catch {
    return { isPlaying: false };
  }
}

export async function getNowPlaying(): Promise<NowPlayingData> {
  let access_token: string;
  try {
    access_token = await getAccessToken();
  } catch {
    return { isPlaying: false };
  }

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (response.status === 204 || response.status >= 400) {
      return getRecentlyPlayed(access_token);
    }

    const song = await response.json();

    if (!song || !song.item) {
      return getRecentlyPlayed(access_token);
    }

    return {
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
  } catch {
    return getRecentlyPlayed(access_token);
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
