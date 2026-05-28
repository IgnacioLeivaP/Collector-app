import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CollectionPage } from './pages/CollectionPage';
import { AddItemPage } from './pages/AddItemPage';
import { SettingsPage } from './pages/SettingsPage';
import { ShelfPage } from './pages/ShelfPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { EditItemPage } from './pages/EditItemPage';
import { WantedPage } from './pages/WantedPage';
import { SellingPage } from './pages/SellingPage';
import { HelpPage } from './pages/HelpPage';
import { StatsPage } from './pages/StatsPage';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ItemsProvider } from './contexts/ItemsContext';
import { CategoriesProvider } from './contexts/CategoriesContext';

function App() {
  return (
    <NotificationsProvider>
      <SettingsProvider>
        <ItemsProvider>
          <CategoriesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<CollectionPage />} />
                  <Route path="shelf" element={<ShelfPage />} />
                  <Route path="wanted" element={<WantedPage />} />
                  <Route path="selling" element={<SellingPage />} />
                  <Route path="stats" element={<StatsPage />} />
                  <Route path="add" element={<AddItemPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="item/:id" element={<ItemDetailPage />} />
                  <Route path="item/:id/edit" element={<EditItemPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CategoriesProvider>
        </ItemsProvider>
      </SettingsProvider>
    </NotificationsProvider>
  );
}

export default App;
