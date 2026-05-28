import React from 'react';
import { useItems } from '../hooks/useItems';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { items } = useItems();
  
  // Obtener categorías únicas de los items
  const categories = Array.from(new Set(items.map(item => item.category)))
    .filter(Boolean) // Eliminar categorías vacías
    .sort();

  return (
    <div className="relative">
      <select
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        className="appearance-none rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2 pr-8"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-dark-300">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}