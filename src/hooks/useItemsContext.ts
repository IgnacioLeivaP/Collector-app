import { useContext } from 'react';
import ItemsContext from '../contexts/ItemsContext';

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
