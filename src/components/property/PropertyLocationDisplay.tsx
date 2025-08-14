'use client';

import { useState } from 'react';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface LocationPoint {
  id: string;
  name: string;
  type: 'metro' | 'mall' | 'office' | 'hotel' | 'road' | 'airport' | 'hospital' | 'school' | 'landmark';
  distance?: string;
  travelTime?: string;
  description?: string;
  icon?: string;
}

interface LocationData {
  mapImage?: string;
  nearbyPoints?: LocationPoint[];
  coordinates?: { latitude: number; longitude: number };
  address?: string;
}

interface PropertyLocationDisplayProps {
  locationData: LocationData;
  className?: string;
}

const locationTypeConfig = {
  metro: { icon: '🚇', label: 'Metro Station', color: 'text-blue-500 bg-blue-50' },
  mall: { icon: '🛍️', label: 'Shopping Mall', color: 'text-purple-500 bg-purple-50' },
  office: { icon: '🏢', label: 'Office Hub', color: 'text-gray-500 bg-gray-50' },
  hotel: { icon: '🏨', label: 'Hotel', color: 'text-orange-500 bg-orange-50' },
  road: { icon: '🛣️', label: 'Highway/Road', color: 'text-yellow-500 bg-yellow-50' },
  airport: { icon: '✈️', label: 'Airport', color: 'text-red-500 bg-red-50' },
  hospital: { icon: '🏥', label: 'Hospital', color: 'text-green-500 bg-green-50' },
  school: { icon: '🏫', label: 'School/College', color: 'text-indigo-500 bg-indigo-50' },
  landmark: { icon: '📍', label: 'Landmark', color: 'text-pink-500 bg-pink-50' },
};

export default function PropertyLocationDisplay({ locationData, className = '' }: PropertyLocationDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!locationData || (!locationData.mapImage && !locationData.nearbyPoints?.length)) {
    return null;
  }

  const nearbyPoints = locationData.nearbyPoints || [];
  const categories = Array.from(new Set(nearbyPoints.map(point => point.type)));

  const filteredPoints = selectedCategory === 'all' 
    ? nearbyPoints 
    : nearbyPoints.filter(point => point.type === selectedCategory);

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Location</h2>
      </div>

      {/* Location Map */}
      {locationData.mapImage && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="aspect-video relative">
            <Image
              src={locationData.mapImage}
              alt="Location Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Prime Location with Excellent Connectivity
                </h3>
                <p className="text-gray-600 text-sm">
                  Strategically located with easy access to major landmarks and transportation hubs
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Locations ({nearbyPoints.length})
          </button>
          {categories.map(category => {
            const config = locationTypeConfig[category as keyof typeof locationTypeConfig];
            const count = nearbyPoints.filter(p => p.type === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {config?.icon} {config?.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Nearby Points Grid */}
      {filteredPoints.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoints.map((point) => {
            const config = locationTypeConfig[point.type as keyof typeof locationTypeConfig];
            return (
              <div
                key={point.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config?.color || 'bg-gray-50'}`}>
                    <span className="text-2xl">{config?.icon || '📍'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{point.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{config?.label}</p>
                    
                    {point.description && (
                      <p className="text-sm text-gray-600 mb-3">{point.description}</p>
                    )}

                    <div className="flex items-center space-x-4 text-sm">
                      {point.distance && (
                        <div className="flex items-center text-blue-600">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="font-medium">{point.distance}</span>
                        </div>
                      )}
                      {point.travelTime && (
                        <div className="flex items-center text-green-600">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span className="font-medium">{point.travelTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Connectivity Summary */}
      {nearbyPoints.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Connectivity Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(locationTypeConfig).map(([type, config]) => {
              const points = nearbyPoints.filter(p => p.type === type);
              if (points.length === 0) return null;
              
              const nearest = points.reduce((closest, current) => {
                if (!closest.distance || !current.distance) return current;
                const closestNum = parseFloat(closest.distance.replace(/[^\d.]/g, ''));
                const currentNum = parseFloat(current.distance.replace(/[^\d.]/g, ''));
                return currentNum < closestNum ? current : closest;
              });

              return (
                <div key={type} className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${config.color}`}>
                    <span className="text-xl">{config.icon}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{config.label}</div>
                  <div className="text-xs text-gray-600">{nearest.name}</div>
                  <div className="text-xs text-blue-600 font-medium">
                    {nearest.distance && `${nearest.distance} away`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Address Display */}
      {locationData.address && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Address</h3>
          <p className="text-gray-600">{locationData.address}</p>
          {locationData.coordinates && (
            <div className="mt-3 text-sm text-gray-500">
              Coordinates: {locationData.coordinates.latitude}, {locationData.coordinates.longitude}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
