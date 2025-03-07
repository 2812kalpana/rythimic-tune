import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory } from '../api/musicApi';
import { Category } from '../types';
import SongCard from '../components/SongCard';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getCategory(id);
        if (data) {
          setCategory(data);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <div className="animate-pulse">
          <div className="h-10 bg-pink-800/50 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
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

  if (!category) {
    return (
      <div className="p-8 text-white">
        <p className="text-pink-300">Category not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <div className="flex items-center mb-8">
        <img 
          src={category.coverUrl} 
          alt={category.name} 
          className="w-48 h-48 object-cover rounded-md mr-6"
        />
        <div>
          <p className="uppercase text-sm font-medium text-pink-300">Category</p>
          <h1 className="text-5xl font-bold mt-2 mb-4">{category.name}</h1>
          <p className="text-pink-300">{category.songs.length} songs</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
        <div className="space-y-1">
          {category.songs.map(song => (
            <SongCard key={song.id} song={song} variant="list" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;