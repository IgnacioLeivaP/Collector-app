import React, { createContext, useEffect, useState } from 'react';
import { CollectionItem } from '../types/collection';
import {
  loadAllItems,
  saveItem as storageSaveItem,
  deleteItem as storageDeleteItem,
  toggleShelfItem as storageToggleShelfItem,
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
      const loaded = loadAllItems();
      setItems(loaded);
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
      if (!e.key) return;
      if (e.key === 'collection_items') {
        loadItems();
      }
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

  const toggleShelf = (id: string) => {
    const ok = storageToggleShelfItem(id);
    if (ok) {
      setItems((prev) => prev.map((i) =>
        i.id === id ? { ...i, isShelfItem: !i.isShelfItem } : i
      ));
    }
    return ok;
  };

  const toggleWanted = (id: string) => {
    const ok = storageToggleWantedItem(id);
    if (ok) {
      setItems((prev) => prev.map((i) => {
        if (i.id !== id) return i;
        const nextIsWanted = !i.isWanted;
        return {
          ...i,
          isWanted: nextIsWanted,
          isShelfItem: nextIsWanted ? false : i.isShelfItem,
        };
      }));
    }
    return ok;
  };

  return (
    <ItemsContext.Provider value={{ items, loading, error, loadItems, addItem, updateItem, removeItem, toggleShelf, toggleWanted }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
