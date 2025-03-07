import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const Player: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    progress, 
    duration,
    pauseSong, 
    resumeSong, 
    setVolume, 
    seekTo,
    nextSong,
    prevSong
  } = useMusic();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseFloat(e.target.value);
    seekTo(newPosition);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  if (!currentSong) {
    return (
      <div className="bg-pink-400 border-t border-pink-300 p-4 text-white flex items-center justify-center h-20">
        <p className="text-white">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="bg-pink-400 border-t border-pink-300 p-4 text-white flex items-center h-20">
      <div className="flex items-center w-1/4">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="h-12 w-12 rounded mr-3"
        />
        <div>
          <p className="text-sm font-medium">{currentSong.title}</p>
          <p className="text-xs text-pink-100">{currentSong.artist}</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={prevSong}
            className="text-white hover:text-pink-100 transition-colors"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={isPlaying ? pauseSong : resumeSong}
            className="bg-white text-pink-500 rounded-full p-1 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={nextSong}
            className="text-white hover:text-pink-100 transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-white w-10 text-right">
            {formatTime(progress)}
          </span>
          
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="flex-1 h-1 bg-pink-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          
          <span className="text-xs text-white w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      
      <div className="w-1/4 flex justify-end">
        <div className="relative">
          <button 
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="text-white hover:text-pink-100 transition-colors"
          >
            {getVolumeIcon()}
          </button>
          
          {showVolumeSlider && (
            <div className="absolute bottom-8 right-0 bg-pink-500 p-2 rounded-lg w-32 transform rotate-270">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-pink-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;