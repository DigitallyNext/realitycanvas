"use client";

import { useState } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface FilterOptions {
  category: string;
  status: string;
  city: string;
  state: string;
  priceRange: {
    min: number;
    max: number;
  };
}

interface MobileProjectFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  filteredCount: number;
}

export default function MobileProjectFilters({ 
  filters,
  onFiltersChange, 
  onClearFilters,
  filteredCount
}: MobileProjectFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'ALL',
    'COMMERCIAL',
    'RESIDENTIAL'
  ];

  const statuses = [
    'ALL',
    'UNDER_CONSTRUCTION',
    'READY'
  ];

  const priceRanges = [
    { label: 'Any Price', min: 0, max: 10000000 },
    { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
    { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
    { label: '₹2Cr - ₹5Cr', min: 20000000, max: 50000000 },
    { label: '₹5Cr - ₹10Cr', min: 50000000, max: 100000000 },
    { label: '₹10Cr+', min: 100000000, max: 1000000000 },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsOpen(false);
  };

  const hasActiveFilters = (
    filters.category !== 'ALL' ||
    filters.status !== 'ALL' ||
    (filters.city && filters.city.trim().length > 0) ||
    (filters.state && filters.state.trim().length > 0) ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 10000000
  );

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative"
      >
        <FunnelIcon className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
        )}
      </button>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden ">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={filters.category === category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {category === 'ALL' ? 'All Categories' : category.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Status</h3>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={filters.status === status}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {status === 'ALL' ? 'All Status' : status.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Budget</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={`${range.min}-${range.max}`}
                          checked={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
                          onChange={() => handleFilterChange('priceRange', { min: range.min, max: range.max })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filters */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Location</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        placeholder="Enter city"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        placeholder="Enter state"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleClearFilters}
                  className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Show {filteredCount} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}