import { useState, useEffect } from 'react';
import { CollectionItem } from '../types/collection';
import { getItems } from '../utils/storage';

export function useItems() {
  const [items, setItems] = useState<CollectionItem[]>([]);

  const loadItems = () => {
    setItems(getItems());
  };

  useEffect(() => {
    loadItems();
  }, []);

  return { items, loadItems };
}