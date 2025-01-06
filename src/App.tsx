import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CollectionPage } from './pages/CollectionPage';
import { AddItemPage } from './pages/AddItemPage';
import { SettingsPage } from './pages/SettingsPage';
import { ShelfPage } from './pages/ShelfPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { EditItemPage } from './pages/EditItemPage';
import { WantedPage } from './pages/WantedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CollectionPage />} />
          <Route path="shelf" element={<ShelfPage />} />
          <Route path="wanted" element={<WantedPage />} />
          <Route path="add" element={<AddItemPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="item/:id" element={<ItemDetailPage />} />
          <Route path="item/:id/edit" element={<EditItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;