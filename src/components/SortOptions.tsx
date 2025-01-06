import React from 'react';
import { ArrowUpDown, SortAsc, SortDesc, Clock } from 'lucide-react';
import { CollectionItem } from '../types/collection';

export type SortOption = {
  id: string;
  label: string;
  icon: React.ElementType;
  sortFn: (a: CollectionItem, b: CollectionItem) => number;
};

interface SortOptionsProps {
  currentSort: string;
  onSortChange: (sortId: string) => void;
}

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

export function SortOptions({ currentSort, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex gap-2 mb-6">
      {sortOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              currentSort === option.id
                ? 'bg-indigo-500 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
} 