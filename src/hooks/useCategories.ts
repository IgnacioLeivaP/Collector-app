import { useMemo } from 'react';
import { CollectionItem } from '../types/collection';

export function useCategories(items: CollectionItem[]) {
  const categoriesWithItems = useMemo(() => {
    const categories = new Set<string>();
    items.forEach(item => categories.add(item.category));
    return Array.from(categories);
  }, [items]);

  return categoriesWithItems;
}