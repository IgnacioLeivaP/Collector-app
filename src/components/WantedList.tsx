import React, { useState } from 'react';
import { Trash2, Edit, ExternalLink } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { deleteItem } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

interface WantedListProps {
  items: CollectionItem[];
  onItemDeleted: () => void;
  onEditItem: (item: CollectionItem) => void;
}

export function WantedList({ items, onItemDeleted, onEditItem }: WantedListProps) {
  const navigate = useNavigate();
  const [itemToDelete, setItemToDelete] = useState<CollectionItem | null>(null);

  const handleDelete = (id: string) => {
    deleteItem(id);
    onItemDeleted();
    setItemToDelete(null);
  };

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden hover:border-dark-600 transition-colors"
          >
            <div className="flex">
              <div className="w-48 h-48 flex-shrink-0">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-900 flex items-center justify-center text-dark-400">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.name}
                    </h3>
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 mb-4">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/item/${item.id}`)}
                      className="p-2 rounded-lg text-dark-300 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEditItem(item)}
                      className="p-2 rounded-lg text-dark-300 hover:text-white transition-colors"
                      title="Edit Item"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-2 rounded-lg text-dark-300 hover:text-red-400 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-dark-300 mb-4 line-clamp-2">{item.description}</p>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-dark-300">Condition:</span>{" "}
                    <span className="text-white">{item.condition}</span>
                  </div>
                  <div>
                    <span className="text-dark-300">Expected Value:</span>{" "}
                    <span className="text-white">${item.value.toFixed(2)}</span>
                  </div>
                  {item.variant && (
                    <div>
                      <span className="text-dark-300">Variant:</span>{" "}
                      <span className="text-white">{item.variant}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Item</h3>
            <p className="text-dark-300 mb-4">
              Are you sure you want to delete "{itemToDelete.name}" from your wanted list?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(itemToDelete.id)}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 