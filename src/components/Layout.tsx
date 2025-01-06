import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Library, Plus, Settings, Star, Search } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-dark-900 flex">
      <nav className="fixed left-0 top-0 bottom-0 w-16 md:w-64 bg-dark-800 border-r border-dark-700">
        <div className="flex flex-col h-full p-4">
          <div className="flex-1 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-dark-700'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`
              }
            >
              <Library className="w-5 h-5" />
              <span className="hidden md:inline">Collection</span>
            </NavLink>

            <NavLink
              to="/shelf"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-dark-700'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`
              }
            >
              <Star className="w-5 h-5" />
              <span className="hidden md:inline">Shelf</span>
            </NavLink>

            <NavLink
              to="/wanted"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-dark-700'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`
              }
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Wanted</span>
            </NavLink>
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