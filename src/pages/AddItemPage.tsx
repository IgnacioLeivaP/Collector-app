import React, { useState, useEffect } from 'react';
import { AddItemForm } from '../components/AddItemForm';
import { CategoryManager } from '../components/CategoryManager';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../utils/storage';

export function AddItemPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  const loadCategories = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Add New Item</h2>
      <CategoryManager categories={categories} onCategoryAdded={loadCategories} />
      <AddItemForm onItemAdded={() => navigate('/')} categories={categories} />
    </div>
  );
}