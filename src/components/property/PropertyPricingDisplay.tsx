'use client';

import { useState } from 'react';
import { EyeIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

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

interface PropertyPricingDisplayProps {
  pricingData: PricingRow[];
  className?: string;
}

export default function PropertyPricingDisplay({ pricingData, className = '' }: PropertyPricingDisplayProps) {
  const [selectedRow, setSelectedRow] = useState<PricingRow | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (!pricingData || pricingData.length === 0) {
    return null;
  }

  const viewDetails = (row: PricingRow) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Price</h2>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
            <tbody className="divide-y divide-gray-200">
              {pricingData.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{row.type}</div>
                    {row.floorNumbers && (
                      <div className="text-sm text-gray-500">Floors: {row.floorNumbers}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {row.reraArea ? (
                      <div className="font-medium text-gray-900">{row.reraArea}</div>
                    ) : (
                      <button
                        onClick={() => viewDetails(row)}
                        className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        View Unit Size
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {row.price ? (
                      <div>
                        <div className="font-bold text-gray-900">{row.price}</div>
                        {row.pricePerSqft && (
                          <div className="text-sm text-gray-600">{row.pricePerSqft}</div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => viewDetails(row)}
                        className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        View Unit Price
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => viewDetails(row)}
                      className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <CurrencyRupeeIcon className="w-8 h-8 mr-3" />
            <div>
              <div className="text-sm opacity-90">Total Unit Types</div>
              <div className="text-2xl font-bold">{pricingData.length}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">📐</span>
            </div>
            <div>
              <div className="text-sm opacity-90">Available Units</div>
              <div className="text-2xl font-bold">
                {pricingData.reduce((sum, row) => sum + (row.availableUnits || 0), 0)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">🏢</span>
            </div>
            <div>
              <div className="text-sm opacity-90">Floor Types</div>
              <div className="text-2xl font-bold">
                {new Set(pricingData.map(row => row.type)).size}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedRow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedRow.type} Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Unit Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-gray-900">{selectedRow.type}</span>
                    </div>
                    {selectedRow.reraArea && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">RERA Area:</span>
                        <span className="font-semibold text-gray-900">{selectedRow.reraArea}</span>
                      </div>
                    )}
                    {selectedRow.floorNumbers && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor Numbers:</span>
                        <span className="font-semibold text-gray-900">{selectedRow.floorNumbers}</span>
                      </div>
                    )}
                    {selectedRow.availableUnits && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available Units:</span>
                        <span className="font-semibold text-green-600">{selectedRow.availableUnits}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">Pricing Information</h4>
                  <div className="space-y-2">
                    {selectedRow.price && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Price:</span>
                        <span className="font-bold text-green-600 text-lg">{selectedRow.price}</span>
                      </div>
                    )}
                    {selectedRow.pricePerSqft && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per Sq.ft:</span>
                        <span className="font-semibold text-gray-900">{selectedRow.pricePerSqft}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Handle inquiry action
                      setShowModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
