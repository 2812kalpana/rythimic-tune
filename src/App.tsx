import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import CategoryDetail from './pages/CategoryDetail';
import PlaylistDetail from './pages/PlaylistDetail';
import { MusicProvider } from './context/MusicContext';

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="flex h-screen bg-gradient-to-b from-pink-200 to-pink-300 text-pink-900">
          <Sidebar />
          
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/category/:id" element={<CategoryDetail />} />
              <Route path="/playlist/:id" element={<PlaylistDetail />} />
              <Route path="/liked-songs" element={<Library />} />
              <Route path="/create-playlist" element={<Library />} />
            </Routes>
          </main>
        </div>
        
        <Player />
      </Router>
    </MusicProvider>
  );
}

export default App;