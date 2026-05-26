import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useItems } from '../hooks/useItems';
import { loadCategories, saveCategory } from '../utils/storage';

type CategoriesContextType = {
  categories: string[];
  addCategory: (category: string) => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items } = useItems();
  const [storedCategories, setStoredCategories] = useState<string[]>([]);

  useEffect(() => {
    setStoredCategories(loadCategories());
  }, []);

  const categories = useMemo(() => {
    const categoriesFromItems = items
      .map((item) => item.category)
      .filter(Boolean);
    return Array.from(new Set([...storedCategories, ...categoriesFromItems])).sort();
  }, [items, storedCategories]);

  const addCategory = (category: string) => {
    const normalized = category.trim();
    if (!normalized) return;
    const updatedCategories = saveCategory(normalized);
    setStoredCategories(updatedCategories);
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategoriesContext must be used within a CategoriesProvider');
  }
  return context;
}
