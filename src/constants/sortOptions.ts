import type { ElementType } from 'react';
import { CollectionItem } from '../types/collection';
import { ArrowUpDown, SortAsc, SortDesc, Clock } from 'lucide-react';

export type SortOption = {
  id: string;
  label: string;
  icon: ElementType;
  sortFn: (a: CollectionItem, b: CollectionItem) => number;
};

export const sortOptions: SortOption[] = [
  {
    id: 'name-asc',
    label: 'Name A-Z',
    icon: SortAsc,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: 'name-desc',
    label: 'Name Z-A',
    icon: SortDesc,
    sortFn: (a, b) => b.name.localeCompare(a.name),
  },
  {
    id: 'price-asc',
    label: 'Price Low-High',
    icon: ArrowUpDown,
    sortFn: (a, b) => a.value - b.value,
  },
  {
    id: 'price-desc',
    label: 'Price High-Low',
    icon: ArrowUpDown,
    sortFn: (a, b) => b.value - a.value,
  },
  {
    id: 'date',
    label: 'Acquisition Date',
    icon: Clock,
    sortFn: (a, b) => new Date(b.acquisitionDate).getTime() - new Date(a.acquisitionDate).getTime(),
  },
];
