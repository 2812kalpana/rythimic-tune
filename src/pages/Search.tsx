import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { searchSongs, getCategories } from '../api/musicApi';
import { Song, Category } from '../types';
import SongCard from '../components/SongCard';
import CategoryCard from '../components/CategoryCard';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const results = await searchSongs(query);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching songs:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="p-8 text-white">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-pink-300" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-pink-800/50 text-white placeholder-pink-300 w-full py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {loading && (
        <div className="animate-pulse">
          <div className="h-6 bg-pink-800/50 rounded w-1/4 mb-4"></div>
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
      )}

      {!loading && query.trim() && (
        <>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map(song => (
                <SongCard key={song.id} song={song} variant="list" />
              ))}
            </div>
          ) : (
            <p className="text-pink-300">No results found for "{query}"</p>
          )}
        </>
      )}

      {!query.trim() && (
        <>
          <h2 className="text-2xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;