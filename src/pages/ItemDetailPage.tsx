import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Edit, Trash2 } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { deleteItem, toggleShelfItem } from '../utils/storage';

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, loadItems } = useItems();
  const item = items.find(item => item.id === id);
  const [itemToDelete, setItemToDelete] = useState<CollectionItem | null>(null);

  if (!item) {
    return (
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
        <p className="text-dark-300 mb-2">Item no encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Volver a la colección
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteItem(item.id);
    navigate('/');
  };

  const handleShelfToggle = () => {
    const success = toggleShelfItem(item.id);
    if (success) {
      loadItems();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la colección
        </button>

        <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen */}
            <div className="aspect-square bg-dark-900">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dark-400">
                  No image
                </div>
              )}
            </div>

            {/* Información */}
            <div className="p-8">
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{item.name}</h1>
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleShelfToggle}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isShelfItem
                        ? 'text-yellow-400 bg-dark-700'
                        : 'text-dark-300 hover:text-yellow-400'
                    }`}
                    title={item.isShelfItem ? "Remove from Shelf" : "Add to Shelf"}
                  >
                    <Star className="w-5 h-5" fill={item.isShelfItem ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => navigate(`/item/${item.id}/edit`)}
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

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-2">Descripción</h3>
                  <p className="text-white">{item.description || 'Sin descripción'}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Valor</h3>
                    <p className="text-white">${item.value.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Condición</h3>
                    <p className="text-white">{item.condition || 'No especificada'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-dark-300 mb-2">Fecha de adquisición</h3>
                  <p className="text-white">
                    {item.acquisitionDate
                      ? new Date(item.acquisitionDate).toLocaleDateString()
                      : 'No especificada'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {item.releaseDate && (
                    <div>
                      <h3 className="text-sm font-medium text-dark-300 mb-2">Release Date</h3>
                      <p className="text-white">
                        {new Date(item.releaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {item.color && (
                    <div>
                      <h3 className="text-sm font-medium text-dark-300 mb-2">Color</h3>
                      <p className="text-white">{item.color}</p>
                    </div>
                  )}
                  
                  {item.variant && (
                    <div>
                      <h3 className="text-sm font-medium text-dark-300 mb-2">Variant</h3>
                      <p className="text-white">{item.variant}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Has</h3>
                    {item.has && item.has.length > 0 ? (
                      <ul className="space-y-1">
                        {item.has.map((item, index) => (
                          <li key={index} className="text-white flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-dark-400 text-sm italic">No items registered</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Missing</h3>
                    {item.missing && item.missing.length > 0 ? (
                      <ul className="space-y-1">
                        {item.missing.map((item, index) => (
                          <li key={index} className="text-white flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-dark-400 text-sm italic">No items registered</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                onClick={handleDelete}
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