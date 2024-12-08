import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 bg-dark-800 p-6 rounded-xl border border-dark-700">
      <div className="flex items-center gap-3 mb-4">
        <Tag className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Filter by Category</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white'
              : 'bg-dark-700 text-dark-300 hover:text-white'
          }`}
        >
          All Items
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}