import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Music } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-pink-100 text-pink-900 w-64 flex-shrink-0 h-full overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Music size={32} className="text-pink-500" />
          <span className="text-2xl font-bold text-pink-500">Pink Music</span>
        </Link>
        
        <nav className="space-y-6">
          <div className="space-y-3">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-pink-200 text-pink-600' : 'hover:bg-pink-200'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/search" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive('/search') ? 'bg-pink-200 text-pink-600' : 'hover:bg-pink-200'
              }`}
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
            
            <Link 
              to="/library" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive('/library') ? 'bg-pink-200 text-pink-600' : 'hover:bg-pink-200'
              }`}
            >
              <Library size={20} />
              <span>Your Library</span>
            </Link>
          </div>
          
          <div className="pt-4 border-t border-pink-200 space-y-3">
            <Link 
              to="/create-playlist" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-pink-200 transition-colors"
            >
              <PlusSquare size={20} />
              <span>Create Playlist</span>
            </Link>
            
            <Link 
              to="/liked-songs" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive('/liked-songs') ? 'bg-pink-200 text-pink-600' : 'hover:bg-pink-200'
              }`}
            >
              <Heart size={20} />
              <span>Liked Songs</span>
            </Link>
          </div>
        </nav>
      </div>
      
      <div className="px-6 mt-4">
        <div className="space-y-2">
          <p className="text-xs text-pink-500 uppercase font-semibold">Playlists</p>
          <div className="space-y-1">
            <Link to="/playlist/1" className="block px-3 py-2 text-sm text-pink-700 hover:text-pink-900">
              My Favorites
            </Link>
            <Link to="/playlist/2" className="block px-3 py-2 text-sm text-pink-700 hover:text-pink-900">
              Workout Mix
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;