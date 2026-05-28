import React from 'react';
import { HelpCircle, Smartphone, Tag, Star, Edit, Trash2, DollarSign } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Help</h2>
          <p className="text-dark-300 text-sm">Guides and documentation</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Icons Guide</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-white font-medium">Showcase Star</p>
              <p className="text-dark-300 text-sm">Add or remove items from your showcase shelf. Starred items appear in the Shelf section.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-white font-medium">For Sale</p>
              <p className="text-dark-300 text-sm">Mark items as available for sale. These items will appear in the Selling section.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-white font-medium">Edit</p>
              <p className="text-dark-300 text-sm">Modify item details, including name, condition, value, and other properties.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-white font-medium">Delete</p>
              <p className="text-dark-300 text-sm">Remove an item from your collection. This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Use as App</h3>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-2">Install on Android</h4>
            <ol className="list-decimal list-inside space-y-1 text-dark-200">
              <li>Open Chrome and visit this website</li>
              <li>Tap the menu button (three dots) in the top right</li>
              <li>Tap "Add to Home Screen" and follow the prompts</li>
            </ol>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Install on iOS</h4>
            <ol className="list-decimal list-inside space-y-1 text-dark-200">
              <li>Open Safari and visit this website</li>
              <li>Tap the Share button at the bottom</li>
              <li>Scroll down and tap "Add to Home Screen"</li>
            </ol>
          </div>
          <p className="text-dark-300 text-sm">
            Installing as an app gives you faster access, offline support, and a better fullscreen experience.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Item Condition Guide</h3>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-2">Common Conditions</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-indigo-400 font-medium">Mint (M)</span>
                <p className="text-dark-300 text-sm">Perfect condition, like new</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Near Mint (NM)</span>
                <p className="text-dark-300 text-sm">Almost perfect with minimal wear</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Very Good (VG)</span>
                <p className="text-dark-300 text-sm">Minor wear but still in great condition</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Good (G)</span>
                <p className="text-dark-300 text-sm">Shows wear but still fully functional</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Fair (F)</span>
                <p className="text-dark-300 text-sm">Significant wear, may have minor damage</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Poor (P)</span>
                <p className="text-dark-300 text-sm">Heavy wear, may have significant damage</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Packaging States</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-indigo-400 font-medium">Sealed (S)</span>
                <p className="text-dark-300 text-sm">Factory sealed, never opened</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Complete in Box (CIB)</span>
                <p className="text-dark-300 text-sm">Includes original box and all contents</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Boxed</span>
                <p className="text-dark-300 text-sm">Has original box but may be missing minor items</p>
              </li>
              <li>
                <span className="text-indigo-400 font-medium">Loose</span>
                <p className="text-dark-300 text-sm">Item only, no original packaging</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}