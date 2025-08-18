'use client';

import { useState } from 'react';
import { 
  DocumentArrowUpIcon, 
  DocumentArrowDownIcon, 
  ClipboardDocumentIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface JsonImportExportProps {
  onImport: (data: any) => void;
  exportData?: any;
  className?: string;
  title?: string;
}

// Test property JSON with all fields
const testPropertyJson = {
  "title": "MGM Jewel - Premium Commercial Complex",
  "subtitle": "Ultra-modern commercial spaces in prime location",
  "description": "MGM Jewel is a prestigious commercial development offering premium retail and office spaces in the heart of Gurgaon. With world-class amenities and excellent connectivity, it's the perfect investment opportunity for discerning buyers.",
  "category": "COMMERCIAL",
  "basePrice": 5000000,
  "priceRange": "₹50L - ₹5Cr",
  "address": "Sector 28, MG Road, Gurgaon, Haryana",
  "locality": "Sector 28",
  "city": "Gurgaon",
  "state": "Haryana",
  "reraId": "GGM/650/382/2024/15",
  "developerName": "MGM Group",
  "possessionDate": "2025-12-31",
  "featuredImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  "galleryImages": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
  ],
  "bannerTitle": "Premium Commercial Spaces",
  "bannerSubtitle": "Your Gateway to Success",
  "bannerDescription": "Strategically located commercial complex with modern amenities",
  "aboutTitle": "About MGM Jewel",
  "aboutDescription": "A landmark development designed for modern businesses with premium infrastructure and facilities.",
  "highlights": [
    { "label": "Prime Location", "icon": "📍" },
    { "label": "Metro Connectivity", "icon": "🚇" },
    { "label": "Premium Amenities", "icon": "⭐" },
    { "label": "High ROI", "icon": "💹" },
    { "label": "Modern Design", "icon": "🏢" },
    { "label": "24x7 Security", "icon": "🔒" }
  ],
  "amenities": [
    { "category": "Recreation", "name": "Swimming Pool", "details": "Olympic-size pool with deck area" },
    { "category": "Fitness", "name": "Gymnasium", "details": "Fully equipped modern gym" },
    { "category": "Business", "name": "Conference Halls", "details": "Multiple meeting and conference rooms" },
    { "category": "Security", "name": "24x7 Security", "details": "Round-the-clock security with CCTV" },
    { "category": "Parking", "name": "Multi-level Parking", "details": "Ample parking for all units" },
    { "category": "Technology", "name": "High-speed Internet", "details": "Fiber optic connectivity" },
    { "category": "Convenience", "name": "Power Backup", "details": "100% power backup facility" },
    { "category": "Lifestyle", "name": "Food Court", "details": "Variety of dining options" }
  ],
  "units": [
    { "unitNumber": "B-001", "type": "RETAIL", "floor": "Basement", "areaSqFt": 600, "ratePsf": 5208, "priceTotal": 3125000 },
    { "unitNumber": "B-002", "type": "RETAIL", "floor": "Basement", "areaSqFt": 650, "ratePsf": 5208, "priceTotal": 3385000 },
    { "unitNumber": "GF-001", "type": "RETAIL", "floor": "Ground Floor", "areaSqFt": 800, "ratePsf": 15000, "priceTotal": 12000000 },
    { "unitNumber": "GF-002", "type": "RETAIL", "floor": "Ground Floor", "areaSqFt": 900, "ratePsf": 15000, "priceTotal": 13500000 },
    { "unitNumber": "1F-001", "type": "RETAIL", "floor": "First Floor", "areaSqFt": 700, "ratePsf": 6428, "priceTotal": 4500000 },
    { "unitNumber": "1F-002", "type": "RETAIL", "floor": "First Floor", "areaSqFt": 800, "ratePsf": 6428, "priceTotal": 5142000 },
    { "unitNumber": "2F-001", "type": "RETAIL", "floor": "Second Floor", "areaSqFt": 700, "ratePsf": 5000, "priceTotal": 3500000 },
    { "unitNumber": "2F-002", "type": "RETAIL", "floor": "Second Floor", "areaSqFt": 800, "ratePsf": 5000, "priceTotal": 4000000 },
    { "unitNumber": "M1-001", "type": "RETAIL", "floor": "Mezzanine Floor", "areaSqFt": 600, "ratePsf": 4000, "priceTotal": 2400000 },
    { "unitNumber": "M1-002", "type": "RETAIL", "floor": "Mezzanine Floor", "areaSqFt": 650, "ratePsf": 4000, "priceTotal": 2600000 },
    { "unitNumber": "4F-001", "type": "RETAIL", "floor": "Fourth Floor", "areaSqFt": 500, "ratePsf": 8000, "priceTotal": 4000000 },
    { "unitNumber": "4F-002", "type": "RETAIL", "floor": "Fourth Floor", "areaSqFt": 550, "ratePsf": 8000, "priceTotal": 4400000 }
  ],
  "floorPlans": [
    {
      "id": "1",
      "level": "Ground Floor",
      "title": "Retail Spaces",
      "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "description": "Premium retail spaces with high visibility",
      "totalUnits": 25,
      "availableUnits": 15,
      "areaRange": "500-1000 Sq.ft",
      "priceRange": "₹40L - ₹80L"
    },
    {
      "id": "2",
      "level": "First Floor",
      "title": "Food Court & Entertainment",
      "imageUrl": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "description": "Dining and entertainment spaces",
      "totalUnits": 20,
      "availableUnits": 12,
      "areaRange": "300-600 Sq.ft",
      "priceRange": "₹24L - ₹48L"
    }
  ],
  "pricingTable": [
    {
      "id": "1",
      "type": "Basement",
      "reraArea": "700 Sq.ft",
      "price": "₹3 Crore 50 Lakhs",
      "pricePerSqft": "₹5,000/sq.ft",
      "availableUnits": 8,
      "floorNumbers": "B"
    },
    {
      "id": "2",
      "type": "Second-Floor",
      "reraArea": "700 Sq.ft",
      "price": "₹3 Crore 50 Lakhs",
      "pricePerSqft": "₹5,000/sq.ft",
      "availableUnits": 12,
      "floorNumbers": "2F"
    },
    {
      "id": "3",
      "type": "Mezzanine-Floor",
      "reraArea": "600 Sq.ft",
      "price": "₹2 Crore 40 Lakhs",
      "pricePerSqft": "₹4,000/sq.ft",
      "availableUnits": 10,
      "floorNumbers": "MF"
    },
    {
      "id": "4",
      "type": "Forth-Floor",
      "reraArea": "500 Sq.ft",
      "price": "₹4 Crore 80 Lakhs",
      "pricePerSqft": "₹8,000/sq.ft",
      "availableUnits": 6,
      "floorNumbers": "4F"
    },
    {
      "id": "5",
      "type": "First-Floor",
      "reraArea": "800 Sq.ft",
      "price": "₹4 Crore 80 Lakhs",
      "pricePerSqft": "₹6,000/sq.ft",
      "availableUnits": 15,
      "floorNumbers": "1F"
    },
    {
      "id": "6",
      "type": "Ground-Floor",
      "reraArea": "1200 Sq.ft",
      "price": "₹12.00 Cr+",
      "pricePerSqft": "₹15,000/sq.ft",
      "availableUnits": 20,
      "floorNumbers": "GF"
    },
    {
      "id": "7",
      "type": "Lower Ground",
      "reraArea": "300 - 600 Sq.ft",
      "price": "₹1.25 Cr+",
      "pricePerSqft": "₹4,200/sq.ft",
      "availableUnits": 25,
      "floorNumbers": "LG"
    },
    {
      "id": "8",
      "type": "Ground Floor",
      "reraArea": "1200 - 2700 Sq.ft",
      "price": "₹12.00 Cr+",
      "pricePerSqft": "₹15,000/sq.ft",
      "availableUnits": 35,
      "floorNumbers": "G"
    },
    {
      "id": "9",
      "type": "1st Floor",
      "reraArea": "700 - 1500 Sq.ft",
      "price": "₹4.5 Cr+",
      "pricePerSqft": "₹6,500/sq.ft",
      "availableUnits": 28,
      "floorNumbers": "1"
    },
    {
      "id": "10",
      "type": "2nd Floor",
      "reraArea": "700 - 1500 Sq.ft",
      "price": "₹3.5 Cr+",
      "pricePerSqft": "₹5,000/sq.ft",
      "availableUnits": 30,
      "floorNumbers": "2"
    },
    {
      "id": "11",
      "type": "3rd & 4th Floor",
      "reraArea": "700 - 1500 Sq.ft",
      "price": "₹3.0 Cr+",
      "pricePerSqft": "₹4,300/sq.ft",
      "availableUnits": 45,
      "floorNumbers": "3, 4"
    },
    {
      "id": "12",
      "type": "3rd & 4th Floor",
      "reraArea": "9000 - 12500 Sq.ft",
      "price": "₹28.00 Cr+",
      "pricePerSqft": "₹3,200/sq.ft",
      "availableUnits": 2,
      "floorNumbers": "3, 4"
    }
  ],
  "locationData": {
    "mapImage": "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800",
    "nearbyPoints": [
      {
        "id": "1",
        "name": "MG Road Metro Station",
        "type": "metro",
        "distance": "0.5 km",
        "travelTime": "2 mins",
        "description": "Blue Line connectivity"
      },
      {
        "id": "2",
        "name": "Ambience Mall",
        "type": "mall",
        "distance": "1.2 km",
        "travelTime": "5 mins",
        "description": "Premium shopping destination"
      },
      {
        "id": "3",
        "name": "Cyber City",
        "type": "office",
        "distance": "2.8 km",
        "travelTime": "10 mins",
        "description": "Major IT hub"
      }
    ],
    "coordinates": { "latitude": 28.4595, "longitude": 77.0266 }
  },
  "anchors": [
    { "name": "Big Bazaar", "category": "Hypermarket", "floor": "GF", "areaSqFt": 5000 },
    { "name": "PVR Cinemas", "category": "Cinema", "floor": "2F", "areaSqFt": 3000 }
  ],
  "buyerInfo": [
    {
      "id": "1",
      "name": "Rahul Sharma",
      "email": "rahul@email.com",
      "phone": "+91 98765 43210",
      "interestedUnitType": "Retail Shop",
      "budget": "₹50L - ₹1Cr",
      "timeline": "3-6 months",
      "source": "Website",
      "status": "inquiry",
      "notes": "Interested in ground floor retail space",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "faqs": [
    {
      "question": "What are the payment plans available?",
      "answer": "We offer flexible payment plans including construction linked plans, down payment schemes, and easy EMI options. Our team can customize a plan based on your requirements."
    },
    {
      "question": "When is the expected possession?",
      "answer": "The project is expected to be ready for possession by December 2025. Regular construction updates are provided to all buyers."
    },
    {
      "question": "What are the rental yields?",
      "answer": "The project offers excellent rental yields of 8-10% annually due to its prime location and high demand for commercial spaces in the area."
    }
  ]
};

export default function JsonImportExport({ onImport, exportData, className = '', title = 'JSON Import/Export' }: JsonImportExportProps) {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'test'>('import');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTestJson, setShowTestJson] = useState(false);

  const handleImport = () => {
    try {
      setError('');
      const data = JSON.parse(jsonInput);
      onImport(data);
      setSuccess('JSON imported successfully!');
      setTimeout(() => {
        setSuccess('');
        setShowModal(false);
        setJsonInput('');
      }, 2000);
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const handleTestImport = () => {
    onImport(testPropertyJson);
    setSuccess('Test property imported successfully!');
    setTimeout(() => {
      setSuccess('');
      setShowModal(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadJson = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={className}>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-sm font-medium"
      >
        <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
        JSON Import/Export
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
                <button
                  onClick={() => setActiveTab('import')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'import'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Import JSON
                </button>
                <button
                  onClick={() => setActiveTab('test')}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'test'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Test Property
                </button>
                {exportData && (
                  <button
                    onClick={() => setActiveTab('export')}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'export'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Export JSON
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Import Tab */}
                {activeTab === 'import' && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Paste your JSON data here:
                      </label>
                      <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste your project JSON here..."
                        rows={15}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleImport}
                        disabled={!jsonInput.trim()}
                        className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Import Project
                      </button>
                    </div>
                  </div>
                )}

                {/* Test Property Tab */}
                {activeTab === 'test' && (
                  <div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Complete Test Property Example
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        This test property includes all possible fields to help you understand the JSON structure.
                        Use this as a reference for creating your own property data.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>✅ Basic Information</div>
                        <div>✅ Pricing Details</div>
                        <div>✅ Floor Plans</div>
                        <div>✅ Pricing Table</div>
                        <div>✅ Location Data</div>
                        <div>✅ Amenities</div>
                        <div>✅ Buyer Information</div>
                        <div>✅ FAQ Section</div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mb-4">
                      <button
                        onClick={handleTestImport}
                        className="flex items-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        Import Test Property
                      </button>
                      <button
                        onClick={() => setShowTestJson(!showTestJson)}
                        className="flex items-center px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <EyeIcon className="w-5 h-5 mr-2" />
                        {showTestJson ? 'Hide' : 'View'} JSON
                      </button>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(testPropertyJson, null, 2))}
                        className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
                        Copy JSON
                      </button>
                      <button
                        onClick={() => downloadJson(testPropertyJson, 'test-property.json')}
                        className="flex items-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                        Download
                      </button>
                    </div>

                    {showTestJson && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Test Property JSON:
                        </label>
                        <pre className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                          {JSON.stringify(testPropertyJson, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Export Tab */}
                {activeTab === 'export' && exportData && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current form data as JSON:
                      </label>
                      <pre className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                        {JSON.stringify(exportData, null, 2)}
                      </pre>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(exportData, null, 2))}
                        className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
                        Copy to Clipboard
                      </button>
                      <button
                        onClick={() => downloadJson(exportData, 'project-export.json')}
                        className="flex items-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                        Download JSON
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700 dark:text-green-300 text-sm">{success}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
