'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Highlight {
  title: string;
  description?: string;
  icon?: string;
}

interface PropertyFeaturesProps {
  highlights: Highlight[];
  title?: string;
  className?: string;
}

export default function PropertyFeatures({ 
  highlights, 
  title = 'Property Features', 
  className = '' 
}: PropertyFeaturesProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Key features and highlights that make this property stand out.
        </p>
      </div>

      {highlights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {highlight.icon ? (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <span className="text-xl">{highlight.icon}</span>
                    </div>
                  ) : (
                    <CheckCircleIcon className="w-8 h-8 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  {highlight.description && (
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No feature highlights available.</p>
        </div>
      )}

      {/* Feature Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Premium Features</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              This property includes {highlights.length} premium features designed for modern living.
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">Quality</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Premium</div>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">Condition</div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">Excellent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}