import React from 'react';
import { Play, Pause, Plus } from 'lucide-react';
import { Song } from '../types';
import { useMusic } from '../context/MusicContext';

interface SongCardProps {
  song: Song;
  variant?: 'grid' | 'list';
}

const SongCard: React.FC<SongCardProps> = ({ song, variant = 'grid' }) => {
  const { currentSong, isPlaying, playSong, pauseSong, resumeSong, addToQueue } = useMusic();
  
  const isCurrentSong = currentSong?.id === song.id;
  
  const handlePlayClick = () => {
    if (isCurrentSong) {
      isPlaying ? pauseSong() : resumeSong();
    } else {
      playSong(song);
    }
  };
  
  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
  };

  if (variant === 'list') {
    return (
      <div 
        className="flex items-center p-2 hover:bg-pink-300/50 rounded-md transition-colors cursor-pointer group"
        onClick={handlePlayClick}
      >
        <div className="relative w-10 h-10 mr-3 flex-shrink-0">
          <img 
            src={song.coverUrl} 
            alt={song.title} 
            className="w-full h-full object-cover rounded"
          />
          <button 
            className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded ${isCurrentSong && isPlaying ? 'opacity-100' : ''}`}
          >
            {isCurrentSong && isPlaying ? (
              <Pause size={16} className="text-white" />
            ) : (
              <Play size={16} className="text-white" />
            )}
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{song.title}</p>
          <p className="text-xs text-pink-600 truncate">{song.artist}</p>
        </div>
        
        <button 
          onClick={handleAddToQueue}
          className="p-1 text-pink-600 hover:text-pink-900 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="bg-pink-300/40 p-4 rounded-md hover:bg-pink-300/60 transition-colors cursor-pointer group"
      onClick={handlePlayClick}
    >
      <div className="relative mb-4">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full aspect-square object-cover rounded-md"
        />
        <button 
          className={`absolute bottom-2 right-2 p-2 bg-pink-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentSong && isPlaying ? 'opacity-100' : ''}`}
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white" />
          )}
        </button>
      </div>
      
      <h3 className="font-medium text-sm truncate">{song.title}</h3>
      <p className="text-xs text-pink-600 truncate">{song.artist}</p>
      
      <div className="mt-2 flex justify-end">
        <button 
          onClick={handleAddToQueue}
          className="p-1 text-pink-600 hover:text-pink-900 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SongCard;