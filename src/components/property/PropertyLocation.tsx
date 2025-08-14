'use client';

import { MapPinIcon, GlobeAltIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface LocationPoint {
  name: string;
  distance: string;
  icon?: string;
  category: string;
}

interface PropertyLocationProps {
  title?: string;
  description?: string;
  address?: string;
  mapImage?: string;
  latitude?: number;
  longitude?: number;
  nearbyPoints?: LocationPoint[];
  className?: string;
}

export default function PropertyLocation({
  title = 'Location',
  description = 'Strategically located with excellent connectivity and proximity to key landmarks',
  address = '123 Downtown Plaza, Metropolitan District',
  mapImage = '/placeholder-map.svg',
  latitude = 40.7128,
  longitude = -74.0060,
  nearbyPoints = [
    { name: 'Central Park', distance: '0.5 km', category: 'Recreation' },
    { name: 'Downtown Mall', distance: '1.2 km', category: 'Shopping' },
    { name: 'City Hospital', distance: '2.5 km', category: 'Healthcare' },
    { name: 'International Airport', distance: '15 km', category: 'Transportation' },
    { name: 'Business District', distance: '3.2 km', category: 'Business' },
    { name: 'Metro Station', distance: '0.3 km', category: 'Transportation' },
  ],
  className = '',
}: PropertyLocationProps) {
  // Group nearby points by category
  const groupedPoints: Record<string, LocationPoint[]> = {};
  nearbyPoints.forEach(point => {
    if (!groupedPoints[point.category]) {
      groupedPoints[point.category] = [];
    }
    groupedPoints[point.category].push(point);
  });

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Map Section - Takes 3/5 of the width on large screens */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <MapPinIcon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Property Address</h3>
                <p className="text-gray-600">{address}</p>
                <div className="mt-3 flex items-center text-blue-600">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Lat: {latitude}, Long: {longitude}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Image */}
          <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
            <Image 
              src={mapImage} 
              alt="Property Location Map" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                <p className="text-sm text-gray-500">Interactive map available on request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Points Section - Takes 2/5 of the width on large screens */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Nearby Points of Interest</h3>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[500px]">
            {Object.entries(groupedPoints).map(([category, points]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h4 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {points.map((point, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{point.name}</span>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {point.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Distances are approximate and subject to actual route taken
            </p>
          </div>
        </div>
      </div>

      {/* Connectivity Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Connectivity & Transportation</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3">Public Transport</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center justify-between">
                  <span>Metro Station</span>
                  <span className="text-sm font-medium">0.3 km</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Bus Terminal</span>
                  <span className="text-sm font-medium">0.8 km</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Train Station</span>
                  <span className="text-sm font-medium">5.2 km</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3">Major Roads</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center justify-between">
                  <span>Highway 101</span>
                  <span className="text-sm font-medium">2.1 km</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Main Boulevard</span>
                  <span className="text-sm font-medium">0.5 km</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Ring Road</span>
                  <span className="text-sm font-medium">3.7 km</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3">Travel Time</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center justify-between">
                  <span>To City Center</span>
                  <span className="text-sm font-medium">15 mins</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>To Airport</span>
                  <span className="text-sm font-medium">30 mins</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>To Business Hub</span>
                  <span className="text-sm font-medium">20 mins</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}