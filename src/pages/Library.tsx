import React, { useEffect, useState } from 'react';
import { getPlaylists } from '../api/musicApi';
import { Playlist } from '../types';
import { Link } from 'react-router-dom';

const Library: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <div className="animate-pulse">
          <div className="h-8 bg-pink-800/50 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-pink-900/40 p-4 rounded-md">
                <div className="bg-pink-800/50 aspect-square rounded-md mb-4"></div>
                <div className="h-4 bg-pink-800/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-pink-800/50 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>
      
      {playlists.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map(playlist => (
            <Link 
              key={playlist.id} 
              to={`/playlist/${playlist.id}`}
              className="bg-pink-900/40 p-4 rounded-md hover:bg-pink-800/60 transition-colors block"
            >
              <div className="relative mb-4">
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.name} 
                  className="w-full aspect-square object-cover rounded-md"
                />
              </div>
              
              <h3 className="font-bold text-white">{playlist.name}</h3>
              <p className="text-xs text-pink-300 mt-1">{playlist.songs.length} songs</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-pink-300 mb-4">Your library is empty</p>
          <Link 
            to="/create-playlist" 
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full transition-colors"
          >
            Create Playlist
          </Link>
        </div>
      )}
    </div>
  );
};

export default Library;