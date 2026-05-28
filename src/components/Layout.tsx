import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Library, Plus, Settings, Star, Search, DollarSign, HelpCircle, BarChart } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { MobileNav } from './MobileNav';

export function Layout() {
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors border-l-2 ${
      isActive
        ? 'text-white bg-indigo-500/20 border-indigo-400'
        : 'text-dark-300 hover:text-white hover:bg-dark-700/50 border-transparent'
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 bottom-0 w-64 glass-effect nav-glow rounded-r-xl">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <img
              src="/dusticon.jpg"
              alt="Dust Collector"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <span className="logo-font text-lg text-white">Dust Collector</span>
          </div>

          <div className="flex-1 space-y-2">
            <NavLink to="/" end className={navLinkClass}>
              <Library className="w-5 h-5" />
              <span>Collection</span>
            </NavLink>

            {settings.showShelf && (
              <NavLink to="/shelf" className={navLinkClass}>
                <Star className="w-5 h-5" />
                <span>Shelf</span>
              </NavLink>
            )}

            {settings.showWanted && (
              <NavLink to="/wanted" className={navLinkClass}>
                <Search className="w-5 h-5" />
                <span>Wanted</span>
              </NavLink>
            )}

            {settings.showSelling && (
              <NavLink to="/selling" className={navLinkClass}>
                <DollarSign className="w-5 h-5" />
                <span>Selling</span>
              </NavLink>
            )}

            <NavLink to="/stats" className={navLinkClass}>
              <BarChart className="w-5 h-5" />
              <span>Statistics</span>
            </NavLink>
          </div>

          <div className="space-y-2">
            <NavLink to="/add" className={navLinkClass}>
              <Plus className="w-5 h-5" />
              <span>Add New</span>
            </NavLink>

            <NavLink to="/settings" className={navLinkClass}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </NavLink>

            <NavLink to="/help" className={navLinkClass}>
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav />

      <main className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
