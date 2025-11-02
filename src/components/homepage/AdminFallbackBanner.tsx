"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

type DataSources = {
  featuredSource: 'db' | 'api' | 'fallback';
  trendingSource: 'db' | 'api' | 'fallback';
};

export default function AdminFallbackBanner({ dataSources, counts }: { dataSources: DataSources; counts?: { featured: number; trending: number } }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;

  const { featuredSource, trendingSource } = dataSources || { featuredSource: 'db', trendingSource: 'db' };
  const featuredCount = counts?.featured ?? 0;
  const trendingCount = counts?.trending ?? 0;

  const isFallback = featuredSource !== 'db' || trendingSource !== 'db' || featuredCount === 0 || trendingCount === 0;
  if (!isFallback) return null;

  const badgeColor = (src: 'db' | 'api' | 'fallback') => {
    switch (src) {
      case 'db': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'api': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'fallback': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="mx-4 md:mx-8 my-4 p-4 rounded-lg border border-blue-300 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Admin notice: Homepage using fallback sources</div>
        <button
          onClick={async () => {
            try {
              const res = await fetch('/api/admin/warm-caches', { method: 'POST' });
              if (!res.ok) throw new Error(`Status ${res.status}`);
              const data = await res.json();
              console.log('Warm caches result', data);
              alert('Caches warmed successfully. You may refresh the page.');
            } catch (e) {
              console.error(e);
              alert('Failed to warm caches. Check server logs.');
            }
          }}
          className="px-3 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
          title="Prime API caches and revalidate homepage"
        >
          Warm caches
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`px-2 py-1 rounded ${badgeColor(featuredSource)}`}>Featured: {featuredSource}</span>
        <span className={`px-2 py-1 rounded ${badgeColor(trendingSource)}`}>Trending: {trendingSource}</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Featured count: {featuredCount}</span>
        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Trending count: {trendingCount}</span>
      </div>
      <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">This banner appears only for admins and indicates when homepage sections are served via API cache or empty fallbacks due to database unavailability or cold starts.</p>
    </div>
  );
}