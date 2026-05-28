import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AddItemForm } from '../components/AddItemForm';
import { CategoryList } from '../components/CategoryList';
import { useCategoriesContext } from '../contexts/CategoriesContext';

export function AddItemPage() {
  const navigate = useNavigate();
  const { categories, addCategory } = useCategoriesContext();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Plus className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Add New Item</h2>
          <p className="text-dark-300 text-sm">Add a new item to your collection</p>
        </div>
      </div>

      <CategoryList
        categories={categories}
        onCategoryAdded={addCategory}
      />

      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        <AddItemForm
          onItemAdded={() => navigate('/')}
          categories={categories}
        />
      </div>
    </div>
  );
}
