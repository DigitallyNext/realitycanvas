'use client';

import Image from 'next/image';
import { BuildingOffice2Icon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface Builder {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  projects?: number;
  yearEstablished?: number;
}

interface PropertyBuilderProps {
  builder: Builder;
  title?: string;
  className?: string;
}

export default function PropertyBuilder({ 
  builder, 
  title = 'About the Builder', 
  className = '' 
}: PropertyBuilderProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Learn more about the developer behind this exceptional property.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Builder Logo/Image */}
          <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center">
            {builder.logo ? (
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image 
                  src={builder.logo} 
                  alt={builder.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
                <BuildingOffice2Icon className="w-24 h-24 text-blue-500" />
              </div>
            )}
          </div>

          {/* Builder Information */}
          <div className="md:w-2/3 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{builder.name}</h3>
            
            {builder.description && (
              <p className="text-gray-600 mb-6">{builder.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {builder.yearEstablished && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">YE</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Established</div>
                    <div className="font-medium">{builder.yearEstablished}</div>
                  </div>
                </div>
              )}

              {builder.projects !== undefined && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">P</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Projects Completed</div>
                    <div className="font-medium">{builder.projects}+</div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {builder.website && (
                  <a 
                    href={builder.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <GlobeAltIcon className="w-5 h-5 mr-2" />
                    <span>Visit Website</span>
                  </a>
                )}

                {builder.phone && (
                  <a 
                    href={`tel:${builder.phone}`} 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    <span>{builder.phone}</span>
                  </a>
                )}

                {builder.email && (
                  <a 
                    href={`mailto:${builder.email}`} 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{builder.email}</span>
                  </a>
                )}

                {builder.address && (
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{builder.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}