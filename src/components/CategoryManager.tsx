import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { addCategory } from '../utils/storage';

interface CategoryManagerProps {
  categories: string[];
  onCategoryAdded: () => void;
}

export function CategoryManager({ categories, onCategoryAdded }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim().toLowerCase());
      setNewCategory('');
      setIsAdding(false);
      onCategoryAdded();
    }
  };

  return (
    <div className="mb-8 bg-dark-800 p-6 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Categories</h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1 text-sm rounded-full bg-dark-700 text-dark-200"
          >
            {category}
          </span>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="flex-1 rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-4 py-2"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-2 text-dark-300 hover:text-dark-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}