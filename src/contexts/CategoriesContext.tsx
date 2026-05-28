import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useItemsContext } from './ItemsContext';
import { loadCategories, saveCategory } from '../utils/storage';

type CategoriesContextType = {
  categories: string[];
  addCategory: (category: string) => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items } = useItemsContext();
  const [storedCategories, setStoredCategories] = useState<string[]>([]);

  useEffect(() => {
    setStoredCategories(loadCategories());
  }, []);

  const categories = useMemo(() => {
    const fromItems = items.map((i) => i.category).filter(Boolean);
    return Array.from(new Set([...storedCategories, ...fromItems])).sort();
  }, [items, storedCategories]);

  const addCategory = (category: string) => {
    const normalized = category.trim();
    if (!normalized) return;
    const updated = saveCategory(normalized);
    setStoredCategories(updated);
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (!context) throw new Error('useCategoriesContext must be used within CategoriesProvider');
  return context;
}
