import { useMemo } from 'react';
import { CollectionItem } from '../types/collection';

export function useCategories(items: CollectionItem[]) {
  const categoriesWithItems = useMemo(() => {
    // Solo usar las categorías que tienen items
    const categoriesFromItems = new Set<string>();
    items.forEach(item => categoriesFromItems.add(item.category));
    
    return Array.from(categoriesFromItems).sort();
  }, [items]);

  return categoriesWithItems;
}