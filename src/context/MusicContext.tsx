import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Song } from '../types';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (position: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  queue: Song[];
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const audioElement = new Audio();
    audioRef.current = audioElement;

    const updateProgress = () => {
      if (audioElement) {
        setProgress(audioElement.currentTime);
      }
    };

    const handleEnded = () => {
      nextSong();
    };

    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });

    return () => {
      audioElement.pause();
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('loadedmetadata', () => {});
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.volume = volume;
      if (isPlaying) {
        // Safely play audio
        safePlay();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Safe play function to handle play promises correctly
  const safePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      // If there's an existing play promise, wait for it to resolve
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
      
      // Start a new play operation and store the promise
      playPromiseRef.current = audioRef.current.play();
      await playPromiseRef.current;
      
      // Once play is successful, clear the promise reference
      playPromiseRef.current = null;
    } catch (error) {
      console.error('Error playing audio:', error);
      // Reset playing state if play fails
      setIsPlaying(false);
      playPromiseRef.current = null;
    }
  };

  const playSong = (song: Song) => {
    // If we're already playing a song, pause it first
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    if (audioRef.current) {
      // Only pause if we're not in the middle of a play operation
      if (!playPromiseRef.current) {
        audioRef.current.pause();
      } else {
        // If there's a pending play operation, wait for it to complete before pausing
        playPromiseRef.current
          .then(() => {
            if (audioRef.current) audioRef.current.pause();
            playPromiseRef.current = null;
          })
          .catch(() => {
            playPromiseRef.current = null;
          });
      }
    }
    setIsPlaying(false);
  };

  const resumeSong = () => {
    if (audioRef.current) {
      safePlay();
    }
    setIsPlaying(true);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (position: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = position;
      setProgress(position);
    }
  };

  const nextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      playSong(nextSong);
    } else if (currentSong) {
      // If no queue, just restart the current song
      seekTo(0);
      resumeSong();
    }
  };

  const prevSong = () => {
    if (audioRef.current && progress > 3) {
      // If more than 3 seconds into the song, restart it
      seekTo(0);
    } else if (currentSong) {
      // Otherwise, just restart the current song (in a real app, you'd go to previous song)
      seekTo(0);
    }
  };

  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        progress,
        duration,
        playSong,
        pauseSong,
        resumeSong,
        setVolume,
        seekTo,
        nextSong,
        prevSong,
        queue,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};