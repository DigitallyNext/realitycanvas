'use client';

import Image from 'next/image';
import { MapIcon } from '@heroicons/react/24/outline';

interface PropertySitePlanProps {
  sitePlanImage?: string;
  sitePlanTitle?: string;
  sitePlanDescription?: string;
  className?: string;
}

export default function PropertySitePlan({ 
  sitePlanImage = '/placeholder-property.svg', 
  sitePlanTitle = 'Site Plan', 
  sitePlanDescription = 'Comprehensive development layout with premium amenities and green spaces',
  className = '' 
}: PropertySitePlanProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{sitePlanTitle}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {sitePlanDescription}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Site Plan Image */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
          {sitePlanImage ? (
            <Image 
              src={sitePlanImage} 
              alt={sitePlanTitle} 
              fill 
              className="object-contain" 
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Site plan image not available</p>
              </div>
            </div>
          )}
        </div>

        {/* Legend and Info */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm mr-3"></div>
                  <span className="text-gray-700">Residential Buildings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-3"></div>
                  <span className="text-gray-700">Green Spaces</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-3"></div>
                  <span className="text-gray-700">Amenities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded-sm mr-3"></div>
                  <span className="text-gray-700">Parking Areas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-sm mr-3"></div>
                  <span className="text-gray-700">Entry/Exit Points</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Area:</span>
                  <span className="font-medium text-gray-900">5.2 Acres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Green Area Ratio:</span>
                  <span className="font-medium text-gray-900">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Number of Buildings:</span>
                  <span className="font-medium text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Parking Capacity:</span>
                  <span className="font-medium text-gray-900">500+ vehicles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Orientation:</span>
                  <span className="font-medium text-gray-900">North-South</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>The site plan is indicative and subject to minor variations.</li>
              <li>All amenities shown are part of the common facilities.</li>
              <li>The landscape areas shown are conceptual and will be developed as per final design.</li>
              <li>For exact dimensions and specifications, please refer to the approved plans.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}