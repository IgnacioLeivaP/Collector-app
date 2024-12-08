import React from 'react';
import { Trash2 } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { deleteItem } from '../utils/storage';

interface CollectionGridProps {
  items: CollectionItem[];
  onItemDeleted: () => void;
}

export function CollectionGrid({ items, onItemDeleted }: CollectionGridProps) {
  const handleDelete = (id: string) => {
    deleteItem(id);
    onItemDeleted();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-dark-800 rounded-xl shadow-xl overflow-hidden border border-dark-700 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
          {item.imageUrl && (
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
            </div>
          )}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-indigo-500/20 text-indigo-300 mt-1 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-dark-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-dark-300 text-sm">{item.description}</p>
            <div className="mt-4 space-y-1">
              <p className="text-sm text-dark-200">
                <span className="font-medium text-dark-100">Condition:</span> {item.condition}
              </p>
              <p className="text-sm text-dark-200">
                <span className="font-medium text-dark-100">Value:</span> ${item.value.toFixed(2)}
              </p>
              <p className="text-sm text-dark-200">
                <span className="font-medium text-dark-100">Acquired:</span> {item.acquisitionDate}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}