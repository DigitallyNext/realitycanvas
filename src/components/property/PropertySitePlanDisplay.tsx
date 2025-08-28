'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface SitePlanData {
  sitePlanImage?: string;
  sitePlanTitle?: string;
  sitePlanDescription?: string;
  amenities?: Array<{
    name: string;
    category: string;
    details?: string;
  }>;
}

interface PropertySitePlanDisplayProps {
  sitePlanData: SitePlanData;
  className?: string;
}

export default function PropertySitePlanDisplay({ sitePlanData, className = '' }: PropertySitePlanDisplayProps) {
  const [showZoomedView, setShowZoomedView] = useState(false);

  if (!sitePlanData?.sitePlanImage) {
    return null;
  }

  const amenitiesByCategory = (sitePlanData.amenities || []).reduce<Record<string, Array<{name: string; category: string; details?: string}>>>((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {});

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Site Plan</h2>
        {sitePlanData.sitePlanTitle && (
          <p className="text-lg text-gray-600 mb-2">{sitePlanData.sitePlanTitle}</p>
        )}
        {sitePlanData.sitePlanDescription && (
          <p className="text-gray-500 max-w-2xl mx-auto">{sitePlanData.sitePlanDescription}</p>
        )}
      </div>

      {/* Site Plan Image */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <div className="aspect-video relative cursor-pointer" onClick={() => setShowZoomedView(true)}>
            <Image
              src={sitePlanData.sitePlanImage}
              alt="Site Plan"
              fill
              className="object-contain bg-gray-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              onError={(e) => {
                console.error('Site plan image failed to load:', sitePlanData.sitePlanImage);
                // Fallback to regular img if Next.js Image fails
                const img = document.createElement('img');
                img.src = sitePlanData.sitePlanImage || '';
                img.alt = 'Site Plan';
                img.className = 'w-full h-full object-contain bg-gray-50';
                e.currentTarget.parentNode?.replaceChild(img, e.currentTarget);
              }}
            />
            
            {/* Zoom Icon Overlay */}
            <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/80 transition-colors">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </div>
            
            {/* Click to Zoom Text */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              Click to zoom
            </div>
          </div>
        </div>
      </div>

      {/* Site Plan Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Master Plan Highlights */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Master Plan Highlights</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Landscaped Gardens & Green Spaces</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Water Features & Fountains</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">Kids Play Areas</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Sports & Recreation Zones</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Swimming Pool & Deck</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">Dedicated Parking Areas</span>
            </div>
          </div>
        </div>

        {/* Development Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Development Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">65%</div>
              <div className="text-sm text-gray-600">Open Spaces</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">35%</div>
              <div className="text-sm text-gray-600">Built-up Area</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">25+</div>
              <div className="text-sm text-gray-600">Amenities</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Building Blocks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities by Category */}
      {Object.keys(amenitiesByCategory).length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Site Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {amenities?.map((amenity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-gray-900">{amenity.name}</div>
                        {amenity.details && (
                          <div className="text-sm text-gray-600">{amenity.details}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoomed View Modal */}
      {showZoomedView && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-screen">
            <button
              onClick={() => setShowZoomedView(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-full">
              <Image
                src={sitePlanData.sitePlanImage}
                alt="Site Plan - Detailed View"
                fill
                className="object-contain"
                sizes="100vw"
                onError={(e) => {
                  console.error('Site plan zoomed image failed to load:', sitePlanData.sitePlanImage);
                  // Fallback to regular img if Next.js Image fails
                  const img = document.createElement('img');
                  img.src = sitePlanData.sitePlanImage || '';
                  img.alt = 'Site Plan - Detailed View';
                  img.className = 'w-full h-full object-contain';
                  e.currentTarget.parentNode?.replaceChild(img, e.currentTarget);
                }}
              />
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">
                {sitePlanData.sitePlanTitle || 'Master Site Plan'}
              </h3>
              <p className="text-sm text-gray-200">
                {sitePlanData.sitePlanDescription || 'Detailed view of the complete site development layout'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Site Plan Legend */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Plan Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Landscaped Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Water Bodies</span>
          </div>
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span>Building Structures</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Recreation Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Swimming Pool</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Sports Facilities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-500 bg-white rounded"></div>
            <span>Parking Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Entry/Exit Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}
