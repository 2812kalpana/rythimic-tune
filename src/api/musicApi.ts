import axios from 'axios';
import { Song, Category, Playlist } from '../types';

// Mock data for demonstration
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Pink Venom',
    artist: 'BLACKPINK',
    album: 'Born Pink',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 180
  },
  {
    id: '2',
    title: 'Shut Down',
    artist: 'BLACKPINK',
    album: 'Born Pink',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 210
  },
  {
    id: '3',
    title: 'How You Like That',
    artist: 'BLACKPINK',
    album: 'The Album',
    coverUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 195
  },
  {
    id: '4',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'BE',
    coverUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 220
  },
  {
    id: '5',
    title: 'Butter',
    artist: 'BTS',
    album: 'Butter',
    coverUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 190
  },
  {
    id: '6',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 200
  },
  {
    id: '7',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 215
  },
  {
    id: '8',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    coverUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 203
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'K-Pop',
    coverUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.filter(song => song.artist === 'BLACKPINK' || song.artist === 'BTS')
  },
  {
    id: '2',
    name: 'Pop',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.filter(song => song.artist === 'The Weeknd' || song.artist === 'Dua Lipa')
  },
  {
    id: '3',
    name: 'Trending',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.slice(0, 4)
  },
  {
    id: '4',
    name: 'New Releases',
    coverUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.slice(4, 8)
  }
];

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    coverUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.slice(0, 5)
  },
  {
    id: '2',
    name: 'Workout Mix',
    coverUrl: 'https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    songs: mockSongs.slice(2, 7)
  }
];

// API functions
export const searchSongs = async (query: string): Promise<Song[]> => {
  // In a real app, this would be an API call
  // For now, we'll filter the mock data
  const normalizedQuery = query.toLowerCase();
  return mockSongs.filter(
    song => 
      song.title.toLowerCase().includes(normalizedQuery) || 
      song.artist.toLowerCase().includes(normalizedQuery) ||
      song.album.toLowerCase().includes(normalizedQuery)
  );
};

export const getCategories = async (): Promise<Category[]> => {
  return mockCategories;
};

export const getCategory = async (id: string): Promise<Category | undefined> => {
  return mockCategories.find(category => category.id === id);
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  return mockPlaylists;
};

export const getPlaylist = async (id: string): Promise<Playlist | undefined> => {
  return mockPlaylists.find(playlist => playlist.id === id);
};

export const getRecommendedSongs = async (): Promise<Song[]> => {
  // In a real app, this would be based on user preferences
  return mockSongs.slice(0, 4);
};

// This function would integrate with the Gemini API for AI-powered recommendations
export const getAIRecommendations = async (songIds: string[]): Promise<Song[]> => {
  // In a real implementation, this would call the Gemini API
  // For now, we'll return a subset of mock songs
  const API_KEY = 'AIzaSyBloipR9TLjRjHbIvqdUsAmNVTt5reuoVg';
  
  try {
    // This is a placeholder for the actual Gemini API call
    // In a production app, you would make a real API call here
    console.log(`Would call Gemini API with key ${API_KEY} and song IDs: ${songIds.join(', ')}`);
    
    // For demo purposes, return some mock songs
    return mockSongs.filter(song => !songIds.includes(song.id)).slice(0, 3);
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return [];
  }
};