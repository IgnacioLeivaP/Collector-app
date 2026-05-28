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
  const currentOption = sortOptions.find(option => option.id === currentSort);
  const Icon = currentOption?.icon || ArrowUpDown;

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none w-full rounded-lg bg-dark-900 border-dark-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors pl-10 pr-8 py-2"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="w-5 h-5 text-dark-300" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg className="h-5 w-5 fill-current text-dark-300" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}