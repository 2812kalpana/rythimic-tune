import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../api/musicApi';
import { Playlist } from '../types';
import SongCard from '../components/SongCard';
import { Play, Clock } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getPlaylist(id);
        if (data) {
          setPlaylist(data);
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const playAll = () => {
    if (playlist && playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTotalDuration = (): string => {
    if (!playlist) return '0:00';
    
    const totalSeconds = playlist.songs.reduce((total, song) => total + song.duration, 0);
    const mins = Math.floor(totalSeconds / 60);
    
    if (mins < 60) {
      return `${mins} min`;
    } else {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hours} hr ${remainingMins} min`;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        <div className="animate-pulse">
          <div className="flex items-center mb-8">
            <div className="bg-pink-800/50 w-48 h-48 rounded-md mr-6"></div>
            <div>
              <div className="h-4 bg-pink-800/50 rounded w-20 mb-2"></div>
              <div className="h-10 bg-pink-800/50 rounded w-48 mb-4"></div>
              <div className="h-4 bg-pink-800/50 rounded w-32"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center p-2">
                <div className="bg-pink-800/50 w-10 h-10 rounded mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-pink-800/50 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-pink-800/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-8 text-white">
        <p className="text-pink-300">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <div className="flex items-center mb-8">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="w-48 h-48 object-cover rounded-md mr-6 shadow-lg"
        />
        <div>
          <p className="uppercase text-sm font-medium text-pink-300">Playlist</p>
          <h1 className="text-5xl font-bold mt-2 mb-4">{playlist.name}</h1>
          <p className="text-pink-300">{playlist.songs.length} songs • {getTotalDuration()}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <button 
          onClick={playAll}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 px-8 flex items-center gap-2 transition-colors"
        >
          <Play size={20} fill="white" />
          <span>Play</span>
        </button>
      </div>
      
      <div className="mb-8">
        <div className="border-b border-pink-800 pb-2 mb-2 grid grid-cols-12 text-pink-300 text-sm">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Title</div>
          <div className="col-span-4">Album</div>
          <div className="col-span-2 flex justify-end items-center">
            <Clock size={16} />
          </div>
        </div>
        
        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-12 items-center py-2 px-2 hover:bg-pink-800/50 rounded-md transition-colors group"
              onClick={() => playSong(song)}
            >
              <div className="col-span-1 text-center text-pink-300 group-hover:hidden">{index + 1}</div>
              <div className="col-span-1 text-center hidden group-hover:block">
                <Play size={16} className="mx-auto" />
              </div>
              <div className="col-span-5 flex items-center">
                <img 
                  src={song.coverUrl} 
                  alt={song.title} 
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-pink-300">{song.artist}</p>
                </div>
              </div>
              <div className="col-span-4 text-pink-300">{song.album}</div>
              <div className="col-span-2 text-pink-300 text-right">{formatDuration(song.duration)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;