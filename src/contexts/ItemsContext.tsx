import React, { createContext, useContext, useEffect, useState } from 'react';
import { CollectionItem } from '../types/collection';
import {
  loadAllItems,
  saveItem as storageSaveItem,
  deleteItem as storageDeleteItem,
  toggleShelfItem as storageToggleShelfItem,
  toggleForSale as storageToggleForSale,
  toggleWantedItem as storageToggleWantedItem,
} from '../utils/storage';

type ItemsContextType = {
  items: CollectionItem[];
  loading: boolean;
  error: string | null;
  loadItems: () => void;
  addItem: (item: CollectionItem) => void;
  updateItem: (item: CollectionItem) => void;
  removeItem: (id: string) => void;
  toggleShelf: (id: string) => boolean;
  toggleForSale: (id: string) => boolean;
  toggleWanted: (id: string) => boolean;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = () => {
    setLoading(true);
    try {
      setItems(loadAllItems());
      setError(null);
    } catch {
      setError('Error loading items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'shelfu_items') loadItems();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addItem = (item: CollectionItem) => {
    storageSaveItem(item);
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (item: CollectionItem) => {
    storageSaveItem(item);
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  };

  const removeItem = (id: string) => {
    storageDeleteItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleShelf = (id: string): boolean => {
    const ok = storageToggleShelfItem(id);
    if (ok) setItems((prev) => prev.map((i) => i.id === id ? { ...i, isShelfItem: !i.isShelfItem } : i));
    return ok;
  };

  const toggleForSale = (id: string): boolean => {
    const ok = storageToggleForSale(id);
    if (ok) setItems((prev) => prev.map((i) => i.id === id ? { ...i, isForSale: !i.isForSale } : i));
    return ok;
  };

  const toggleWanted = (id: string): boolean => {
    const ok = storageToggleWantedItem(id);
    if (ok) {
      setItems((prev) => prev.map((i) => {
        if (i.id !== id) return i;
        const nextIsWanted = !i.isWanted;
        return { ...i, isWanted: nextIsWanted, isShelfItem: nextIsWanted ? false : i.isShelfItem };
      }));
    }
    return ok;
  };

  return (
    <ItemsContext.Provider value={{ items, loading, error, loadItems, addItem, updateItem, removeItem, toggleShelf, toggleForSale, toggleWanted }}>
      {children}
    </ItemsContext.Provider>
  );
};

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) throw new Error('useItemsContext must be used within ItemsProvider');
  return context;
}
