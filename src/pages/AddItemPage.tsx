import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AddItemForm } from '../components/AddItemForm';
import { CategoryList } from '../components/CategoryList';
import { loadCategories, saveCategory } from '../utils/storage';

export function AddItemPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedCategories = loadCategories();
    setCategories(savedCategories);
  }, []);

  const handleCategoryAdded = (newCategory: string) => {
    const updatedCategories = saveCategory(newCategory);
    setCategories(updatedCategories);
  };

  const handleItemAdded = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Collection
      </button>

      <CategoryList 
        categories={categories} 
        onCategoryAdded={handleCategoryAdded} 
      />

      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Item</h2>
        <AddItemForm 
          onItemAdded={handleItemAdded}
          categories={categories}
        />
      </div>
    </div>
  );
}