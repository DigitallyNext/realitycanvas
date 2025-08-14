'use client';

import { useState } from 'react';
import { UserGroupIcon, PlusIcon, XMarkIcon, PhoneIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface BuyerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedUnitType: string;
  budget: string;
  timeline: string;
  source: string;
  notes: string;
  status: 'inquiry' | 'site_visit' | 'negotiating' | 'closed' | 'follow_up';
  followUpDate?: string;
  createdAt: string;
}

interface BuyerInfoManagerProps {
  value: BuyerInfo[];
  onChange: (buyers: BuyerInfo[]) => void;
  className?: string;
  readonly?: boolean;
}

const buyerStatuses = [
  { value: 'inquiry', label: 'Initial Inquiry', color: 'bg-blue-100 text-blue-800' },
  { value: 'site_visit', label: 'Site Visit Scheduled', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-orange-100 text-orange-800' },
  { value: 'closed', label: 'Deal Closed', color: 'bg-green-100 text-green-800' },
  { value: 'follow_up', label: 'Follow Up Required', color: 'bg-purple-100 text-purple-800' },
];

const leadSources = [
  'Website', 'Referral', 'Social Media', 'Advertisement', 'Walk-in', 'Broker', 'Event', 'Other'
];

export default function BuyerInfoManager({ value, onChange, className = '', readonly = false }: BuyerInfoManagerProps) {
  const [buyers, setBuyers] = useState<BuyerInfo[]>(value);
  const [showAddForm, setShowAddForm] = useState(false);

  const addBuyer = () => {
    const newBuyer: BuyerInfo = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      interestedUnitType: '',
      budget: '',
      timeline: '',
      source: 'Website',
      notes: '',
      status: 'inquiry',
      createdAt: new Date().toISOString()
    };
    
    const updated = [...buyers, newBuyer];
    setBuyers(updated);
    onChange(updated);
    setShowAddForm(true);
  };

  const updateBuyer = (index: number, field: keyof BuyerInfo, value: string) => {
    const updated = [...buyers];
    updated[index] = { ...updated[index], [field]: value };
    setBuyers(updated);
    onChange(updated);
  };

  const removeBuyer = (index: number) => {
    const updated = buyers.filter((_, i) => i !== index);
    setBuyers(updated);
    onChange(updated);
  };

  const getStatusConfig = (status: string) => {
    return buyerStatuses.find(s => s.value === status) || buyerStatuses[0];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Buyer Information</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track interested buyers and their requirements
          </p>
        </div>
        {!readonly && (
          <button
            type="button"
            onClick={addBuyer}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Buyer
          </button>
        )}
      </div>

      {buyers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No buyer information added yet</p>
          {!readonly && (
            <button
              type="button"
              onClick={addBuyer}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add First Buyer
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {buyers.map((buyer, index) => {
            const statusConfig = getStatusConfig(buyer.status);
            return (
              <div
                key={buyer.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {buyer.name ? buyer.name.charAt(0).toUpperCase() : 'B'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {buyer.name || 'New Buyer'}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  {!readonly && (
                    <button
                      type="button"
                      onClick={() => removeBuyer(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={buyer.name}
                      onChange={(e) => updateBuyer(index, 'name', e.target.value)}
                      placeholder="Enter buyer name"
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={buyer.email}
                        onChange={(e) => updateBuyer(index, 'email', e.target.value)}
                        placeholder="buyer@email.com"
                        disabled={readonly}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={buyer.phone}
                        onChange={(e) => updateBuyer(index, 'phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        disabled={readonly}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Interested Unit Type
                    </label>
                    <input
                      type="text"
                      value={buyer.interestedUnitType}
                      onChange={(e) => updateBuyer(index, 'interestedUnitType', e.target.value)}
                      placeholder="e.g., Retail Shop"
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <input
                      type="text"
                      value={buyer.budget}
                      onChange={(e) => updateBuyer(index, 'budget', e.target.value)}
                      placeholder="₹50L - ₹1Cr"
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={buyer.timeline}
                      onChange={(e) => updateBuyer(index, 'timeline', e.target.value)}
                      placeholder="3-6 months"
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lead Source
                    </label>
                    <select
                      value={buyer.source}
                      onChange={(e) => updateBuyer(index, 'source', e.target.value)}
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    >
                      {leadSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={buyer.status}
                      onChange={(e) => updateBuyer(index, 'status', e.target.value)}
                      disabled={readonly}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                    >
                      {buyerStatuses.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Follow-up Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={buyer.followUpDate || ''}
                        onChange={(e) => updateBuyer(index, 'followUpDate', e.target.value)}
                        disabled={readonly}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={buyer.notes}
                    onChange={(e) => updateBuyer(index, 'notes', e.target.value)}
                    placeholder="Additional notes about this buyer..."
                    rows={2}
                    disabled={readonly}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm disabled:opacity-60"
                  />
                </div>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Added on: {new Date(buyer.createdAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Stats */}
      {buyers.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Buyer Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {buyerStatuses.map(status => {
              const count = buyers.filter(b => b.status === status.value).length;
              return (
                <div key={status.value} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{status.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
