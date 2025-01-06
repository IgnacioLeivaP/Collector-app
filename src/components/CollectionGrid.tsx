import React, { useState } from 'react';
import { Trash2, Edit, Star, MoreVertical } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { deleteItem, toggleShelfItem } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

interface CollectionGridProps {
  items: CollectionItem[];
  onItemDeleted: () => void;
  onEditItem: (item: CollectionItem) => void;
  onShelfToggle: () => void;
}

export function CollectionGrid({ items, onItemDeleted, onEditItem, onShelfToggle }: CollectionGridProps) {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<CollectionItem | null>(null);

  const handleDelete = (id: string) => {
    deleteItem(id);
    onItemDeleted();
    setItemToDelete(null);
  };

  const handleShelfToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const success = toggleShelfItem(id);
    if (success) {
      onShelfToggle();
    }
  };

  const handleMenuClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-dark-800 rounded-xl shadow-xl overflow-hidden border border-dark-700 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/item/${item.id}`)}
          >
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
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 mt-1 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleShelfToggle(item.id, e)}
                    className={`text-dark-300 hover:text-yellow-400 transition-colors ${
                      item.isShelfItem ? 'text-yellow-400' : ''
                    }`}
                    title={item.isShelfItem ? "Remove from Shelf" : "Add to Shelf"}
                  >
                    <Star className="w-5 h-5" fill={item.isShelfItem ? "currentColor" : "none"} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, item.id)}
                      className="text-dark-300 hover:text-white transition-colors p-1"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openMenuId === item.id && (
                      <div 
                        className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-dark-700 ring-1 ring-black ring-opacity-5 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditItem(item);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-dark-200 hover:text-white hover:bg-dark-600 w-full text-left"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Item
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setItemToDelete(item);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-dark-600 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Item
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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

      {/* Modal de confirmación de borrado */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Item</h3>
            <p className="text-dark-300 mb-4">
              Are you sure you want to delete "{itemToDelete.name}"? This action cannot be undone.
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