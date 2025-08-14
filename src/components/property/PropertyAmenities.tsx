'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';

interface Facility {
  name: string;
  category?: string;
  details?: string;
  icon?: string;
}

interface PropertyAmenitiesProps {
  facilities: Facility[];
  title?: string;
  className?: string;
}

export default function PropertyAmenities({ 
  facilities, 
  title = 'Property Amenities', 
  className = '' 
}: PropertyAmenitiesProps) {
  // Group facilities by category
  const facilitiesByCategory = facilities.reduce<Record<string, Facility[]>>((acc, facility) => {
    const category = facility.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(facility);
    return acc;
  }, {});

  const categories = Object.keys(facilitiesByCategory);

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore the premium amenities designed to enhance your lifestyle and comfort.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-blue-900/10 p-1">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full py-3 text-sm font-medium leading-5 text-blue-700 rounded-lg
                    ${selected
                      ? 'bg-white shadow'
                      : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'}`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-6">
              {categories.map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className="rounded-xl p-3 focus:outline-none"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {facilitiesByCategory[category].map((facility, index) => (
                      <div 
                        key={index} 
                        className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        {facility.icon && (
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-xl">{facility.icon}</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{facility.name}</h3>
                          {facility.details && (
                            <p className="text-sm text-gray-600 mt-1">{facility.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No amenities information available.</p>
        </div>
      )}

      {/* Amenities Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="text-2xl font-bold mb-2">{facilities.length}</div>
          <div className="text-sm opacity-90">Total Amenities</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="text-2xl font-bold mb-2">{categories.length}</div>
          <div className="text-sm opacity-90">Amenity Categories</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="text-2xl font-bold mb-2">24/7</div>
          <div className="text-sm opacity-90">Access & Security</div>
        </div>
      </div>
    </div>
  );
}