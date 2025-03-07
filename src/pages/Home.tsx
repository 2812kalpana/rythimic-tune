import React, { useEffect, useState } from 'react';
import { getCategories, getRecommendedSongs } from '../api/musicApi';
import { Category, Song } from '../types';
import SongCard from '../components/SongCard';
import CategoryCard from '../components/CategoryCard';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, recommendedData] = await Promise.all([
          getCategories(),
          getRecommendedSongs()
        ]);
        
        setCategories(categoriesData);
        setRecommendedSongs(recommendedData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-pink-900">
        <div className="animate-pulse">
          <div className="h-8 bg-pink-300/50 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-pink-300/40 p-4 rounded-md">
                <div className="bg-pink-300/50 aspect-square rounded-md mb-4"></div>
                <div className="h-4 bg-pink-300/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-pink-300/50 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-pink-900">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Music</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedSongs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Made For You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recommendedSongs.slice(0, 5).map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;