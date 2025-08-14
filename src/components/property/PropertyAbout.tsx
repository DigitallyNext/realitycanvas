'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

interface PropertyAboutProps {
  description: string;
  keyPoints?: string[];
  title?: string;
  className?: string;
}

export default function PropertyAbout({ 
  description, 
  keyPoints = [], 
  title = 'About This Property', 
  className = '' 
}: PropertyAboutProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Key Points */}
          {keyPoints.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-600 font-semibold mb-1">Premium Location</div>
              <p className="text-sm text-gray-600">Situated in a prime area with excellent connectivity and amenities.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-green-600 font-semibold mb-1">Modern Design</div>
              <p className="text-sm text-gray-600">Contemporary architecture with premium finishes and attention to detail.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-purple-600 font-semibold mb-1">Smart Features</div>
              <p className="text-sm text-gray-600">Equipped with the latest technology for comfort and convenience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}