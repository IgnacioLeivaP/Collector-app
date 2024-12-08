import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Library, PlusCircle, Settings } from 'lucide-react';

export function Layout() {
  const navItems = [
    { to: '/', icon: Library, label: 'Collection' },
    { to: '/add', icon: PlusCircle, label: 'Add New' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-dark-900 to-dark-800">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-dark-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Library className="w-8 h-8" />
            Collection
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-dark-700 text-white border-r-4 border-indigo-500'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}