import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CategoryListProps {
  categories: string[];
  onCategoryAdded: (category: string) => void;
}

export function CategoryList({ categories, onCategoryAdded }: CategoryListProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onCategoryAdded(newCategory.trim());
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white">Categories</h3>
        <button
          type="button"
          onClick={() => setIsAddingCategory(true)}
          className="p-1.5 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1.5 bg-dark-700 text-white rounded-lg text-sm"
          >
            {category}
          </span>
        ))}
      </div>

      {isAddingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 p-6 rounded-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Add New Category</h3>
              <button
                onClick={() => setIsAddingCategory(false)}
                className="text-dark-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 