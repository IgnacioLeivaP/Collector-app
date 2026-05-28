import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { EditItemModal } from '../components/EditItemModal';

export function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, loadItems } = useItems();
  const item = items.find(item => item.id === id);

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

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(`/item/${id}`)}
        className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al detalle
      </button>

      <EditItemModal
        item={item}
        onClose={() => navigate(`/item/${id}`)}
        onSave={() => {
          loadItems();
          navigate(`/item/${id}`);
        }}
      />
    </div>
  );
} 