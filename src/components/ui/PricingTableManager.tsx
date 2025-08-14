'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon, CurrencyRupeeIcon, EyeIcon } from '@heroicons/react/24/outline';

interface PricingRow {
  id: string;
  type: string;
  reraArea: string;
  price: string;
  pricePerSqft?: string;
  availableUnits?: number;
  floorNumbers?: string;
  features?: string[];
}

interface PricingTableManagerProps {
  value: PricingRow[];
  onChange: (pricingRows: PricingRow[]) => void;
  className?: string;
}

const unitTypes = [
  'Basement', 'Ground Floor', 'First Floor', 'Second Floor', 'Mezzanine Floor',
  'Third Floor', 'Fourth Floor', 'Retail Shop', 'Food Court', 'Office Space',
  'Anchor Store', 'Kiosk', 'ATM Space', 'Multiplex'
];

export default function PricingTableManager({ value, onChange, className = '' }: PricingTableManagerProps) {
  const [pricingRows, setPricingRows] = useState<PricingRow[]>(value);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PricingRow | null>(null);

  const addPricingRow = () => {
    const newRow: PricingRow = {
      id: Date.now().toString(),
      type: '',
      reraArea: '',
      price: '',
      pricePerSqft: '',
      availableUnits: 0,
      floorNumbers: '',
      features: []
    };
    
    const updated = [...pricingRows, newRow];
    setPricingRows(updated);
    onChange(updated);
  };

  const updatePricingRow = (index: number, field: keyof PricingRow, value: string | number | string[]) => {
    const updated = [...pricingRows];
    updated[index] = { ...updated[index], [field]: value };
    setPricingRows(updated);
    onChange(updated);
  };

  const removePricingRow = (index: number) => {
    const updated = pricingRows.filter((_, i) => i !== index);
    setPricingRows(updated);
    onChange(updated);
  };

  const viewPricingDetails = (row: PricingRow) => {
    setSelectedRow(row);
    setShowPricingModal(true);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pricing Table</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configure unit types, areas, and pricing information
          </p>
        </div>
        <button
          type="button"
          onClick={addPricingRow}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Pricing Row
        </button>
      </div>

      {/* Pricing Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type***</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">RERA Area***</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price (in ₹)***</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pricingRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <CurrencyRupeeIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No pricing information added</p>
                    <p className="text-sm">Add pricing rows to display unit costs and areas</p>
                  </td>
                </tr>
              ) : (
                pricingRows.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      {unitTypes.includes(row.type) || row.type === '' ? (
                        <select
                          value={row.type}
                          onChange={(e) => {
                            if (e.target.value === 'CUSTOM') {
                              updatePricingRow(index, 'type', 'Custom Type');
                            } else {
                              updatePricingRow(index, 'type', e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        >
                          <option value="">Select Type</option>
                          {unitTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                          <option value="CUSTOM">Custom Type...</option>
                        </select>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={row.type}
                            onChange={(e) => updatePricingRow(index, 'type', e.target.value)}
                            placeholder="Enter custom type"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => updatePricingRow(index, 'type', '')}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            ← Back to dropdown
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.reraArea}
                        onChange={(e) => updatePricingRow(index, 'reraArea', e.target.value)}
                        placeholder="e.g., 700 Sq.ft"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.price}
                        onChange={(e) => updatePricingRow(index, 'price', e.target.value)}
                        placeholder="e.g., ₹3 Crore 50 Lakhs"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          type="button"
                          onClick={() => viewPricingDetails(row)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors flex items-center"
                        >
                          <EyeIcon className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => removePricingRow(index)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Form for Each Row */}
      {pricingRows.length > 0 && (
        <div className="grid gap-6">
          {pricingRows.map((row, index) => (
            <div key={row.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {row.type || `Pricing Row ${index + 1}`} - Additional Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price per Sq.ft
                  </label>
                  <input
                    type="text"
                    value={row.pricePerSqft || ''}
                    onChange={(e) => updatePricingRow(index, 'pricePerSqft', e.target.value)}
                    placeholder="₹5,000/sq.ft"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Units
                  </label>
                  <input
                    type="number"
                    value={row.availableUnits || ''}
                    onChange={(e) => updatePricingRow(index, 'availableUnits', parseInt(e.target.value) || 0)}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Floor Numbers
                  </label>
                  <input
                    type="text"
                    value={row.floorNumbers || ''}
                    onChange={(e) => updatePricingRow(index, 'floorNumbers', e.target.value)}
                    placeholder="GF, 1F, 2F"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Details Modal */}
      {showPricingModal && selectedRow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedRow.type} Details
                </h3>
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">RERA Area:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedRow.reraArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{selectedRow.price}</span>
                </div>
                {selectedRow.pricePerSqft && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Price per Sq.ft:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedRow.pricePerSqft}</span>
                  </div>
                )}
                {selectedRow.availableUnits && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Available Units:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedRow.availableUnits}</span>
                  </div>
                )}
                {selectedRow.floorNumbers && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Floor Numbers:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedRow.floorNumbers}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
