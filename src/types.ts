export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

export interface Category {
  id: string;
  name: string;
  coverUrl: string;
  songs: Song[];
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  songs: Song[];
}