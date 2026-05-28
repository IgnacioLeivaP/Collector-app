import React, { useMemo } from 'react';
import { BarChart, Package, TrendingUp, ListChecks, DollarSign, Star, Calendar, Tag } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import { CONDITIONS } from '../utils/conditions';
import { formatCurrency } from '../utils/settings';

export function StatsPage() {
  const { items } = useItems();
  const collectionItems = items.filter(item => !item.isWanted);

  const stats = useMemo(() => {
    const totalValue = collectionItems.reduce((sum, item) => sum + item.value, 0);
    const totalItems = collectionItems.length;

    // Monthly/Yearly Growth
    const itemsByMonth: Record<string, number> = {};
    collectionItems.forEach(item => {
      if (item.acquisitionDate) {
        const month = item.acquisitionDate.substring(0, 7); // YYYY-MM
        itemsByMonth[month] = (itemsByMonth[month] || 0) + 1;
      }
    });

    // Completeness Ratio
    const completenessStats = collectionItems.reduce(
      (acc, item) => {
        if (item.missing.length === 0) acc.complete++;
        else acc.incomplete++;
        return acc;
      },
      { complete: 0, incomplete: 0 }
    );

    // Condition Distribution
    const conditionStats = collectionItems.reduce((acc, item) => {
      acc[item.condition] = (acc[item.condition] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Additional Stats
    const shelfItems = collectionItems.filter(item => item.isShelfItem).length;
    const forSaleItems = collectionItems.filter(item => item.isForSale).length;
    const wantedItems = items.filter(item => item.isWanted).length;
    
    // Categories Distribution
    const categories = collectionItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Average Value
    const avgValue = totalValue / totalItems;

    return {
      totalValue,
      totalItems,
      itemsByMonth,
      completenessStats,
      conditionStats,
      shelfItems,
      forSaleItems,
      wantedItems,
      categories,
      avgValue
    };
  }, [collectionItems, items]);

  const monthlyGrowth = Object.entries(stats.itemsByMonth)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 12);

  const topCategories = Object.entries(stats.categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <BarChart className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Statistics</h2>
          <p className="text-dark-300 text-sm">Insights and analytics about your collection</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-medium text-white">Total Value</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-400">{formatCurrency(stats.totalValue)}</p>
          <p className="text-sm text-dark-300 mt-1">
            Avg: {formatCurrency(stats.avgValue)}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-medium text-white">Total Items</h3>
          </div>
          <p className="text-2xl font-bold text-indigo-400">{stats.totalItems}</p>
          <p className="text-sm text-dark-300 mt-1">
            In Collection
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-medium text-white">Featured</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-500">{stats.shelfItems}</p>
          <p className="text-sm text-dark-300 mt-1">
            On Shelf
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-medium text-white">Market</h3>
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.forSaleItems}</p>
          <p className="text-sm text-dark-300 mt-1">
            For Sale
          </p>
        </div>
      </div>

      {/* Monthly Growth */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Collection Growth</h3>
        </div>
        <div className="space-y-2">
          {monthlyGrowth.map(([month, count]) => (
            <div key={month} className="flex items-center justify-between">
              <span className="text-dark-200">{month}</span>
              <div className="flex-1 mx-4">
                <div 
                  className="h-2 bg-indigo-500/20 rounded-full overflow-hidden"
                  style={{ 
                    width: `${(count / Math.max(...monthlyGrowth.map(m => m[1]))) * 100}%` 
                  }}
                />
              </div>
              <span className="text-dark-300">{count} items</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completeness Ratio */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Completeness</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {stats.completenessStats.complete}
              </div>
              <div className="text-dark-300 text-sm">Complete</div>
            </div>
            <div className="bg-dark-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {stats.completenessStats.incomplete}
              </div>
              <div className="text-dark-300 text-sm">Incomplete</div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Top Categories</h3>
          </div>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-2 bg-dark-800 rounded-lg">
                <span className="text-white">{category}</span>
                <span className="text-dark-300">{count} items</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Condition Distribution */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Condition Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(CONDITIONS).map(([code, label]) => (
            <div key={code} className="flex items-center justify-between p-2 bg-dark-800 rounded-lg text-sm">
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-indigo-400" />
                <span className="text-white">{code}</span>
              </div>
              <span className="text-dark-300">
                {stats.conditionStats[code] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}