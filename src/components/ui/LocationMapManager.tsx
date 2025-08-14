'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon, MapPinIcon, BuildingOfficeIcon, AcademicCapIcon, HeartIcon } from '@heroicons/react/24/outline';
import ImageUpload from './ImageUpload';

interface LocationPoint {
  id: string;
  name: string;
  type: 'metro' | 'mall' | 'office' | 'hotel' | 'road' | 'airport' | 'hospital' | 'school' | 'landmark';
  distance?: string;
  travelTime?: string;
  description?: string;
  icon?: string;
}

interface LocationMapManagerProps {
  value: {
    mapImage?: string;
    nearbyPoints?: LocationPoint[];
    coordinates?: { latitude: number; longitude: number };
    address?: string;
  };
  onChange: (data: any) => void;
  className?: string;
}

const locationTypes = [
  { value: 'metro', label: 'Metro Station', icon: '🚇', color: 'text-blue-500' },
  { value: 'mall', label: 'Shopping Mall', icon: '🛍️', color: 'text-purple-500' },
  { value: 'office', label: 'Office Hub', icon: '🏢', color: 'text-gray-500' },
  { value: 'hotel', label: 'Hotel', icon: '🏨', color: 'text-orange-500' },
  { value: 'road', label: 'Highway/Road', icon: '🛣️', color: 'text-yellow-500' },
  { value: 'airport', label: 'Airport', icon: '✈️', color: 'text-red-500' },
  { value: 'hospital', label: 'Hospital', icon: '🏥', color: 'text-green-500' },
  { value: 'school', label: 'School/College', icon: '🏫', color: 'text-indigo-500' },
  { value: 'landmark', label: 'Landmark', icon: '📍', color: 'text-pink-500' },
];

export default function LocationMapManager({ value, onChange, className = '' }: LocationMapManagerProps) {
  const [locationData, setLocationData] = useState(value);

  // Sync with parent value changes (for when data is loaded from API)
  useEffect(() => {
    setLocationData(value);
  }, [value]);

  const addNearbyPoint = () => {
    const newPoint: LocationPoint = {
      id: Date.now().toString(),
      name: '',
      type: 'metro',
      distance: '',
      travelTime: '',
      description: ''
    };
    
    const updated = {
      ...locationData,
      nearbyPoints: [...(locationData.nearbyPoints || []), newPoint]
    };
    setLocationData(updated);
    onChange(updated);
  };

  const updateNearbyPoint = (index: number, field: keyof LocationPoint, value: string) => {
    const updated = {
      ...locationData,
      nearbyPoints: (locationData.nearbyPoints || []).map((point, i) => 
        i === index ? { ...point, [field]: value } : point
      )
    };
    setLocationData(updated);
    onChange(updated);
  };

  const removeNearbyPoint = (index: number) => {
    const updated = {
      ...locationData,
      nearbyPoints: (locationData.nearbyPoints || []).filter((_, i) => i !== index)
    };
    setLocationData(updated);
    onChange(updated);
  };

  const updateMapImage = (url: string) => {
    const updated = { ...locationData, mapImage: url };
    setLocationData(updated);
    onChange(updated);
  };

  const updateCoordinates = (field: 'latitude' | 'longitude', value: string) => {
    const parsedValue = parseFloat(value) || 0;
    const updated = {
      ...locationData,
      coordinates: {
        latitude: field === 'latitude' ? parsedValue : (locationData.coordinates?.latitude || 0),
        longitude: field === 'longitude' ? parsedValue : (locationData.coordinates?.longitude || 0)
      }
    };
    setLocationData(updated);
    onChange(updated);
  };

  const getTypeConfig = (type: string) => {
    return locationTypes.find(t => t.value === type) || locationTypes[0];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Location & Connectivity</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add location map and nearby landmarks for better connectivity information
        </p>
      </div>

      {/* Location Map Upload */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Location Map</h4>
        <ImageUpload
          value={locationData.mapImage || ''}
          onChange={updateMapImage}
          placeholder="Upload location map showing nearby landmarks"
          folder="projects/location-maps"
        />
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={locationData.coordinates?.latitude || ''}
            onChange={(e) => updateCoordinates('latitude', e.target.value)}
            placeholder="28.4595"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={locationData.coordinates?.longitude || ''}
            onChange={(e) => updateCoordinates('longitude', e.target.value)}
            placeholder="77.0266"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Nearby Points */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">Nearby Landmarks</h4>
          <button
            type="button"
            onClick={addNearbyPoint}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Landmark
          </button>
        </div>

        {(!locationData.nearbyPoints || locationData.nearbyPoints.length === 0) ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No landmarks added yet</p>
            <button
              type="button"
              onClick={addNearbyPoint}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add First Landmark
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {(locationData.nearbyPoints || []).map((point, index) => {
              const typeConfig = getTypeConfig(point.type);
              return (
                <div
                  key={point.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{typeConfig.icon}</span>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {point.name || 'New Landmark'}
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNearbyPoint(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={point.name}
                        onChange={(e) => updateNearbyPoint(index, 'name', e.target.value)}
                        placeholder="e.g., MG Metro Station"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type *
                      </label>
                      <select
                        value={point.type}
                        onChange={(e) => updateNearbyPoint(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        {locationTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Distance
                      </label>
                      <input
                        type="text"
                        value={point.distance || ''}
                        onChange={(e) => updateNearbyPoint(index, 'distance', e.target.value)}
                        placeholder="2.5 km"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Travel Time
                      </label>
                      <input
                        type="text"
                        value={point.travelTime || ''}
                        onChange={(e) => updateNearbyPoint(index, 'travelTime', e.target.value)}
                        placeholder="5 mins"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={point.description || ''}
                      onChange={(e) => updateNearbyPoint(index, 'description', e.target.value)}
                      placeholder="Brief description about this landmark"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Location Preview */}
      {locationData.mapImage && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Location Preview</h4>
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={locationData.mapImage}
              alt="Location Map"
              className="w-full h-full object-cover"
            />
          </div>
          {(locationData.nearbyPoints || []).length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {(locationData.nearbyPoints || []).slice(0, 8).map((point) => {
                const typeConfig = getTypeConfig(point.type);
                return (
                  <div key={point.id} className="flex items-center space-x-2 text-sm">
                    <span className="text-lg">{typeConfig.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 truncate">
                      {point.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
