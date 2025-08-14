'use client';

import { CurrencyRupeeIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface PricingOption {
  type: string;
  size: string;
  price: string;
  pricePerSqFt: string;
  availability: string;
  trend?: 'up' | 'down' | 'stable';
}

interface PropertyPricingProps {
  title?: string;
  description?: string;
  pricingOptions?: PricingOption[];
  paymentPlans?: {
    name: string;
    description: string;
    details: string[];
  }[];
  className?: string;
}

export default function PropertyPricing({
  title = 'Pricing & Payment Plans',
  description = 'Transparent pricing with flexible payment options to suit your financial needs',
  pricingOptions = [
    {
      type: '1 BHK',
      size: '650 sq ft',
      price: '₹65L',
      pricePerSqFt: '₹10,000/sq ft',
      availability: 'Limited Units',
      trend: 'up'
    },
    {
      type: '2 BHK',
      size: '950 sq ft',
      price: '₹95L',
      pricePerSqFt: '₹10,000/sq ft',
      availability: 'Available',
      trend: 'stable'
    },
    {
      type: '3 BHK',
      size: '1350 sq ft',
      price: '₹1.35Cr',
      pricePerSqFt: '₹10,000/sq ft',
      availability: 'Available',
      trend: 'up'
    },
    {
      type: '4 BHK',
      size: '1800 sq ft',
      price: '₹1.8Cr',
      pricePerSqFt: '₹10,000/sq ft',
      availability: 'Sold Out',
      trend: 'down'
    },
  ],
  paymentPlans = [
    {
      name: 'Standard Payment Plan',
      description: 'Structured payment schedule aligned with construction milestones',
      details: [
        '10% at Booking',
        '10% within 30 days of Booking',
        '70% linked to Construction Stages',
        '10% at Possession'
      ]
    },
    {
      name: 'Flexi Payment Plan',
      description: 'Customized payment schedule with extended timelines',
      details: [
        '5% at Booking',
        '5% within 60 days of Booking',
        '80% linked to Construction Stages',
        '10% at Possession'
      ]
    },
    {
      name: 'Down Payment Plan',
      description: 'Substantial upfront payment with attractive discounts',
      details: [
        '90% at Booking',
        '10% at Possession',
        '5% Direct Discount on Base Price'
      ]
    },
  ],
  className = '',
}: PropertyPricingProps) {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CurrencyRupeeIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Unit Pricing</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/sq ft
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricingOptions.map((option, index) => (
                <tr key={index} className={option.availability === 'Sold Out' ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {option.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {option.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {option.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {option.pricePerSqFt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${option.availability === 'Limited Units' ? 'bg-yellow-100 text-yellow-800' : 
                        option.availability === 'Available' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {option.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {option.trend === 'up' ? (
                      <div className="flex items-center text-green-600">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        <span>Rising</span>
                      </div>
                    ) : option.trend === 'down' ? (
                      <div className="flex items-center text-red-600">
                        <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                        <span>Falling</span>
                      </div>
                    ) : (
                      <span>Stable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
          <p>* Prices are subject to change without prior notice. Please confirm current rates before making decisions.</p>
          <p>* Additional charges for parking, club membership, and maintenance may apply.</p>
        </div>
      </div>

      {/* Payment Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentPlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {plan.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    </span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-10 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Included in Base Price</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Basic fixtures and fittings</li>
              <li>Standard flooring and wall finishes</li>
              <li>Kitchen cabinets and countertops</li>
              <li>Bathroom fixtures</li>
              <li>Electrical outlets and switches</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Additional Costs</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Car parking (₹3L - ₹5L per slot)</li>
              <li>Club membership (₹2L - ₹3L)</li>
              <li>Maintenance deposit (₹50/sq ft)</li>
              <li>Legal and registration charges (as per government norms)</li>
              <li>GST (as applicable)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}