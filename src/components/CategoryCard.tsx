import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="bg-pink-300/40 p-4 rounded-md hover:bg-pink-300/60 transition-colors block"
    >
      <div className="relative mb-4">
        <img 
          src={category.coverUrl} 
          alt={category.name} 
          className="w-full aspect-square object-cover rounded-md"
        />
      </div>
      
      <h3 className="font-bold text-pink-900">{category.name}</h3>
      <p className="text-xs text-pink-600 mt-1">{category.songs.length} songs</p>
    </Link>
  );
};

export default CategoryCard;