export interface NowPlayingData {
  isPlaying: boolean;
  isRecentlyPlayed?: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  spotifyUrl?: string;
  progress?: number;       // ms
  duration?: number;       // ms
}

export interface Track {
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
}
