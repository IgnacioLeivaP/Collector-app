import { useState, useEffect } from 'react';
import { CollectionItem } from '../types/collection';
import { loadAllItems } from '../utils/storage';

export function useItems() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = () => {
    try {
      const loadedItems = loadAllItems();
      setItems(loadedItems);
      setError(null);
    } catch (err) {
      setError('Error loading items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    items,
    loading,
    error,
    loadItems,
  };
}