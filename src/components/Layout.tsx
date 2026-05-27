import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Library, Plus, Settings, Star, Search } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Layout() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-dark-900 page-bg flex">
      <nav className="fixed left-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-b from-dark-700/30 via-dark-800 to-dark-900 border-r border-dark-700/50 nav-glow">
        <div className="flex flex-col h-full p-4">
          <div className="mb-6 px-3 flex items-center gap-3">
            <img src="/dusticon.jpg" alt="Dust Collector" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <span className="hidden md:block text-white text-lg tracking-tight logo-font">Dust Collector</span>
          </div>
          <div className="flex-1 space-y-2">
            {settings.showCollection && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-indigo-500/20 to-transparent border-l-2 border-indigo-400'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50 border-l-2 border-transparent'
                  }`
                }
              >
                <Library className="w-5 h-5" />
                <span className="hidden md:inline">Collection</span>
              </NavLink>
            )}

            {settings.showShelf && (
              <NavLink
                to="/shelf"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-indigo-500/20 to-transparent border-l-2 border-indigo-400'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50 border-l-2 border-transparent'
                  }`
                }
              >
                <Star className="w-5 h-5" />
                <span className="hidden md:inline">Shelf</span>
              </NavLink>
            )}

            {settings.showWanted && (
              <NavLink
                to="/wanted"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-indigo-500/20 to-transparent border-l-2 border-indigo-400'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50 border-l-2 border-transparent'
                  }`
                }
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Wanted</span>
              </NavLink>
            )}
          </div>

          <div className="space-y-2">
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-dark-700'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`
              }
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Add New</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-dark-700'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`
              }
            >
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">Settings</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 ml-16 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}