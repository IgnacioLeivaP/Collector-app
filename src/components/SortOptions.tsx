import React from 'react';
import { sortOptions } from '../constants/sortOptions';

interface SortOptionsProps {
  currentSort: string;
  onSortChange: (sortId: string) => void;
}

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