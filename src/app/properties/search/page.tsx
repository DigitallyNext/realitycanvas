'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MapIcon, 
  ViewColumnsIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  currency: string;
  featuredImage: string;
  beds: number;
  baths: number;
  area: number;
  location: string;
  description: string;
  createdAt: string;
  cashflow?: number;
  yield?: number;
  views?: number;
};

// Component that uses searchParams
function PropertySearchContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 40, max: 50 });
  const [selectedType, setSelectedType] = useState('All States');
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [landSize, setLandSize] = useState({ min: 300, max: 700 });
  const [amenities, setAmenities] = useState({
    petFriendly: false,
    furnished: false,
    swimmingPool: false,
    garage: false,
  });
  const [likedProperties, setLikedProperties] = useState<string[]>([]);
  const searchParams = useSearchParams();

  // Fetch properties from API
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Format data to include additional details
        const formattedData = (data || []).map((property: any) => ({
          ...property,
          currency: 'INR',
          cashflow: Math.floor(property.price * 0.048 / 12), // Monthly cashflow
          yield: 8.5 + Math.random() * 3,
          views: Math.floor(Math.random() * 200) + 50,
        }));

        setProperties(formattedData);
        setFilteredProperties(formattedData);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...properties];

    // Apply price filter (convert to lakhs)
    filtered = filtered.filter(property => {
      const priceLakhs = property.price / 100000;
      return priceLakhs >= priceRange.min && priceLakhs <= priceRange.max;
    });

    // Apply bedroom filter
    if (bedrooms !== 'Any') {
      const minBeds = parseInt(bedrooms.replace('+', ''));
      filtered = filtered.filter(property => property.beds >= minBeds);
    }

    // Apply bathroom filter
    if (bathrooms !== 'Any') {
      const minBaths = parseInt(bathrooms.replace('+', ''));
      filtered = filtered.filter(property => property.baths >= minBaths);
    }

    // Apply land size filter
    filtered = filtered.filter(property => 
      property.area >= landSize.min && property.area <= landSize.max
    );

    setFilteredProperties(filtered);
  }, [properties, priceRange, bedrooms, bathrooms, landSize, amenities]);

  const toggleLike = (propertyId: string) => {
    setLikedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const clearFilters = () => {
    setPriceRange({ min: 40, max: 50 });
    setBedrooms('Any');
    setBathrooms('Any');
    setLandSize({ min: 300, max: 700 });
    setAmenities({
      petFriendly: false,
      furnished: false,
      swimmingPool: false,
      garage: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Filters */}
        {sidebarOpen && (
          <div className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </button>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Budget range</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">40L - 50L</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{priceRange.min}L - ₹{priceRange.max}L
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="40"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Investment Objective */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Investment objective</h3>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Cash Flow</option>
                  <option>Capital Growth</option>
                  <option>All States</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Bedrooms, bathrooms & car parks</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</label>
                    <select 
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</label>
                    <select 
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Car Parks</label>
                    <select className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                      <option>2+</option>
                      <option>1+</option>
                      <option>3+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Land Size */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Land size</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min sqm</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Max sqm</span>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="number"
                      value={landSize.min}
                      onChange={(e) => setLandSize({...landSize, min: parseInt(e.target.value)})}
                      className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="300"
                    />
                    <input
                      type="number"
                      value={landSize.max}
                      onChange={(e) => setLandSize({...landSize, max: parseInt(e.target.value)})}
                      className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="700"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Additional filters</h3>
                <div className="space-y-3">
                  {Object.entries(amenities).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setAmenities({...amenities, [key]: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? '00' : filteredProperties.length.toString().padStart(2, '0')} Property search results
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {loading ? 'Loading properties...' : `Found ${filteredProperties.length} properties matching your criteria`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                </button>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="relevance">Sort by relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    showMap
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Map View
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Property Listings */}
            <div className={`${showMap ? 'w-1/2' : 'w-full'} p-6 overflow-y-auto`}>
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700">
                      <div className="flex">
                        <div className="w-1/3 h-48 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="w-2/3 p-6">
                          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
                          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                          <div className="flex space-x-4 mb-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                          </div>
                          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No properties found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to find more properties.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                      <div className="flex">
                        {/* Image Section */}
                        <div className="w-1/3 relative">
                          <img
                            src={property.featuredImage}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Price Badge */}
                          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-lg">
                            ₹{(property.price / 100000).toFixed(1)}L
                          </div>
                          {/* Like Button */}
                          <button
                            onClick={() => toggleLike(property.id)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                          >
                            {likedProperties.includes(property.id) ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-gray-700" />
                            )}
                          </button>
                        </div>
                        
                        {/* Content Section */}
                        <div className="w-2/3 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {property.title}
                            </h3>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ShareIcon className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            📍 {property.address}
                          </p>
                          
                          {/* Property Details */}
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-6">
                            <span>🛏️ {property.beds} beds</span>
                            <span>🛁 {property.baths} baths</span>
                            <span>📏 {property.area} m²</span>
                          </div>
                          
                          {/* Investment Details */}
                          <div className="flex space-x-6 mb-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Cashflow:</span>
                              <span className="font-semibold text-gray-900 dark:text-white ml-1">
                                ₹{property.cashflow?.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Yield:</span>
                              <span className="font-semibold text-green-600 ml-1">
                                {property.yield?.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          {/* View Details Button */}
                          <a
                            href={`/properties/${property.id}`}
                            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Map View */}
            {showMap && (
              <div className="w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
                      <MapIcon className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Interactive Map
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Map integration coming soon
                      </p>
                      <div className="text-xs text-gray-400">
                        {filteredProperties.length} properties in this area
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map Markers */}
                {filteredProperties.slice(0, 6).map((property, index) => {
                  const positions = [
                    { top: '15%', left: '20%' },
                    { top: '30%', right: '25%' },
                    { top: '45%', left: '15%' },
                    { bottom: '40%', left: '30%' },
                    { bottom: '25%', right: '20%' },
                    { top: '20%', left: '50%' }
                  ];
                  
                  return (
                    <div 
                      key={property.id}
                      className="absolute bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold cursor-pointer hover:bg-indigo-600 transition-colors z-10"
                      style={positions[index]}
                      title={property.title}
                    >
                      ₹{(property.price / 100000).toFixed(1)}L
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the PropertySearchContent component with Suspense
export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
        </div>
      </div>
    }>
      <PropertySearchContent />
    </Suspense>
  );
}