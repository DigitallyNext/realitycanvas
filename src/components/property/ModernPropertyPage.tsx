'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPinIcon, 
  HomeIcon, 
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  HeartIcon,
  EyeIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import PropertyAbout from '@/components/property/PropertyAbout';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import PropertyBuilder from '@/components/property/PropertyBuilder';
import PropertyFAQ from '@/components/property/PropertyFAQ';
import PropertySitePlan from '@/components/property/PropertySitePlan';
import RelatedProperties from '@/components/RelatedProperties';
import PropertyFloorPlans from '@/components/PropertyFloorPlans';
import PropertyFloorPlansDisplay from './PropertyFloorPlansDisplay';
import PropertyPricingDisplay from './PropertyPricingDisplay';
import PropertyLocationDisplay from './PropertyLocationDisplay';
import PropertySitePlanDisplay from './PropertySitePlanDisplay';
import { BrandButton } from '@/components/ui/BrandButton';

interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  address: string;
  location: string;
  currency: string;
  featuredImage: string;
  galleryImages: string[];
  beds: number;
  baths: number;
  area: number;
  createdAt: Date;
  bannerTitle: string | null;
  bannerSubtitle: string | null;
  bannerDescription: string | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  highlights: any;
  floorPlans: any;
  facilities: any;
  sitePlanImage: string | null;
  sitePlanTitle: string | null;
  sitePlanDescription: string | null;
  builderName: string | null;
  builderLogo: string | null;
  builderDescription: string | null;
  faqs: any;
  relatedProperties: any;
}

interface ModernPropertyPageProps {
  property: Property;
}

export default function ModernPropertyPage({ property }: ModernPropertyPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Prepare all images for gallery
  const allImages = [property.featuredImage, ...property.galleryImages].filter(Boolean);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: HomeIcon },
    { id: 'floor-plans', label: 'Floor Plans', icon: BuildingOfficeIcon },
    { id: 'amenities', label: 'Amenities', icon: MapPinIcon },
    { id: 'gallery', label: 'Gallery', icon: CameraIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-brand-primary hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/properties" className="text-brand-primary hover:text-primary-600 font-medium transition-colors">
                Properties
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300 truncate font-medium">{property.title}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorited ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Share property">
                <ShareIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image Gallery */}
            <div className="relative mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative group">
                <Image
                  src={allImages[selectedImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                
                {/* Image Overlay Controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    >
                      {isFavorited ? (
                        <HeartIconSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                    <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {allImages.slice(0, 5).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              selectedImageIndex === index 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                        {allImages.length > 5 && (
                          <button
                            onClick={() => setShowImageModal(true)}
                            className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 hover:bg-white transition-colors"
                          >
                            +{allImages.length - 5} more
                          </button>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setShowImageModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 hover:bg-white transition-colors"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>View All Photos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Strip for Desktop */}
              {allImages.length > 1 && (
                <div className="hidden lg:flex mt-4 space-x-3 overflow-x-auto pb-2">
                  {allImages.slice(0, 6).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden ${
                        selectedImageIndex === index 
                          ? 'ring-3 ring-brand-primary' 
                          : 'ring-1 ring-gray-200 dark:ring-gray-600 hover:ring-brand-primary'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Listed {new Date(property.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.beds}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                </div>
                <div className="text-center border-x border-gray-200 dark:border-gray-600">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.baths}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{property.area}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-brand-primary text-brand-primary bg-primary-50 dark:bg-gray-700'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* About Section */}
                    <PropertyAbout 
                      title={property.aboutTitle || "About This Property"}
                      description={property.aboutDescription || property.description || "No description available."}
                      keyPoints={[
                        "Premium location in the heart of the city",
                        "Modern architecture with high-quality finishes",
                        "Energy-efficient design with smart home features",
                        "Spacious layouts with abundant natural light"
                      ]}
                    />
                    
                    {/* Features/Highlights */}
                    <PropertyFeatures 
                      highlights={(() => {
                        try {
                          return typeof property.highlights === 'string' ? 
                            JSON.parse(property.highlights) : 
                            property.highlights || [
                              { title: "Smart Home System", description: "Fully integrated smart home technology" },
                              { title: "Premium Finishes", description: "High-end materials and finishes throughout" },
                              { title: "Energy Efficient", description: "Energy-saving features and appliances" },
                              { title: "Security System", description: "24/7 security monitoring and access control" },
                              { title: "Panoramic Views", description: "Stunning views from multiple vantage points" },
                              { title: "Spacious Layout", description: "Open floor plan with generous room sizes" }
                            ];
                        } catch (error) {
                          console.error('Error parsing highlights:', error);
                          return [
                            { title: "Smart Home System", description: "Fully integrated smart home technology" },
                            { title: "Premium Finishes", description: "High-end materials and finishes throughout" },
                            { title: "Energy Efficient", description: "Energy-saving features and appliances" },
                            { title: "Security System", description: "24/7 security monitoring and access control" },
                            { title: "Panoramic Views", description: "Stunning views from multiple vantage points" },
                            { title: "Spacious Layout", description: "Open floor plan with generous room sizes" }
                          ];
                        }
                      })()}
                      title="Property Highlights"
                    />
                    
                    {/* Builder Info */}
                    <PropertyBuilder 
                      builder={{
                        name: property.builderName || "Premium Developers",
                        logo: property.builderLogo || "/placeholder-property.svg",
                        description: property.builderDescription || "A leading real estate developer with a reputation for quality and innovation.",
                        website: "https://example.com",
                        phone: "+91 98765 43210",
                        email: "info@premiumdevelopers.com",
                        address: "123 Developer Plaza, Business District",
                        projects: 25,
                        yearEstablished: 2005
                      }}
                    />
                    
                    {/* FAQ */}
                    <PropertyFAQ 
                      faqs={(() => {
                        try {
                          return typeof property.faqs === 'string' ? 
                            JSON.parse(property.faqs) : 
                            property.faqs || [
                              { question: "What are the payment options available?", answer: "We offer flexible payment plans including down payment with installments, full payment, and bank financing options." },
                              { question: "Is there a maintenance fee?", answer: "Yes, there is a quarterly maintenance fee that covers common area upkeep, security, and basic amenities." },
                              { question: "When is the expected completion date?", answer: "The project is scheduled for completion by the end of next year, with phased handovers beginning six months prior." },
                              { question: "Are there any nearby schools or hospitals?", answer: "Yes, there are several reputed schools and a multi-specialty hospital within a 3 km radius." },
                              { question: "What security features are included?", answer: "The property includes 24/7 security personnel, CCTV surveillance, access control systems, and intercom facilities." }
                            ];
                        } catch (error) {
                          console.error('Error parsing faqs:', error);
                          return [
                            { question: "What are the payment options available?", answer: "We offer flexible payment plans including down payment with installments, full payment, and bank financing options." },
                            { question: "Is there a maintenance fee?", answer: "Yes, there is a quarterly maintenance fee that covers common area upkeep, security, and basic amenities." },
                            { question: "When is the expected completion date?", answer: "The project is scheduled for completion by the end of next year, with phased handovers beginning six months prior." },
                            { question: "Are there any nearby schools or hospitals?", answer: "Yes, there are several reputed schools and a multi-specialty hospital within a 3 km radius." },
                            { question: "What security features are included?", answer: "The property includes 24/7 security personnel, CCTV surveillance, access control systems, and intercom facilities." }
                          ];
                        }
                      })()}
                      title="Frequently Asked Questions"
                    />
                  </div>
                )}

                {activeTab === 'floor-plans' && property.floorPlans && (
                  <PropertyFloorPlans 
                    floorPlans={(() => {
                      try {
                        return typeof property.floorPlans === 'string' ? 
                          JSON.parse(property.floorPlans) : 
                          property.floorPlans;
                      } catch (error) {
                        console.error('Error parsing floorPlans:', error);
                        return [];
                      }
                    })()}
                    title="Floor Plans & Pricing"
                  />
                )}

                {activeTab === 'amenities' && (
                  <div className="space-y-8">
                    <PropertyAmenities 
                      facilities={(() => {
                        try {
                          return typeof property.facilities === 'string' ? 
                            JSON.parse(property.facilities) : 
                            property.facilities || [
                              { name: "Swimming Pool", category: "Recreation", details: "Olympic-size pool with deck area" },
                              { name: "Landscaped Gardens", category: "Environment", details: "Green spaces throughout the development" },
                              { name: "Kids Play Area", category: "Recreation", details: "Safe and fun play zones for children" },
                              { name: "Multipurpose Hall", category: "Community", details: "Event and gathering space" },
                              { name: "Gymnasium", category: "Fitness", details: "Fully equipped fitness center" },
                              { name: "Security", category: "Safety", details: "24x7 security with CCTV surveillance" },
                              { name: "Clubhouse", category: "Recreation", details: "Exclusive clubhouse with multiple facilities" },
                              { name: "Jogging Track", category: "Fitness", details: "Dedicated track for jogging and walking" },
                              { name: "Yoga Deck", category: "Fitness", details: "Open space for yoga and meditation" },
                              { name: "EV Charging", category: "Utility", details: "Electric vehicle charging stations" },
                              { name: "Visitor Parking", category: "Utility", details: "Dedicated parking for visitors" },
                              { name: "High-Speed Internet", category: "Technology", details: "Fiber optic connectivity" }
                            ];
                        } catch (error) {
                          console.error('Error parsing facilities:', error);
                          return [
                            { name: "Swimming Pool", category: "Recreation", details: "Olympic-size pool with deck area" },
                            { name: "Landscaped Gardens", category: "Environment", details: "Green spaces throughout the development" },
                            { name: "Kids Play Area", category: "Recreation", details: "Safe and fun play zones for children" },
                            { name: "Multipurpose Hall", category: "Community", details: "Event and gathering space" },
                            { name: "Gymnasium", category: "Fitness", details: "Fully equipped fitness center" },
                            { name: "Security", category: "Safety", details: "24x7 security with CCTV surveillance" }
                          ];
                        }
                      })()}
                      title="Project Amenities"
                    />

                    {/* New Modern Sections */}
                    <div className="space-y-16 mt-16">
                      {/* Enhanced Floor Plans */}
                      <PropertyFloorPlansDisplay 
                        floorPlans={(() => {
                          try {
                            // Simulate floor plans data based on property data
                            return [
                              {
                                id: '1',
                                level: 'Basement',
                                title: 'Retail & Service Level',
                                imageUrl: property.featuredImage,
                                description: 'Ground level retail spaces with high visibility',
                                totalUnits: 25,
                                availableUnits: 8,
                                areaRange: '500-800 Sq.ft',
                                priceRange: '₹50L - ₹1.2Cr'
                              },
                              {
                                id: '2',
                                level: 'Ground Floor',
                                title: 'Main Retail Floor',
                                imageUrl: property.featuredImage,
                                description: 'Premium retail spaces with maximum footfall',
                                totalUnits: 30,
                                availableUnits: 12,
                                areaRange: '600-1000 Sq.ft',
                                priceRange: '₹80L - ₹2Cr'
                              },
                              {
                                id: '3',
                                level: 'First Floor',
                                title: 'Food Court & Entertainment',
                                imageUrl: property.featuredImage,
                                description: 'Dining and entertainment spaces',
                                totalUnits: 20,
                                availableUnits: 5,
                                areaRange: '400-600 Sq.ft',
                                priceRange: '₹40L - ₹80L'
                              }
                            ];
                          } catch (error) {
                            return [];
                          }
                        })()}
                      />

                      {/* Pricing Table */}
                      <PropertyPricingDisplay 
                        pricingData={(() => {
                          try {
                            // Simulate pricing data based on property data
                            return [
                              {
                                id: '1',
                                type: 'Basement',
                                reraArea: '',
                                price: '',
                                availableUnits: 8,
                                floorNumbers: 'B1'
                              },
                              {
                                id: '2',
                                type: 'Second-Floor',
                                reraArea: '700 Sq.ft.',
                                price: '₹ 3 Crore 50 Lakhs',
                                pricePerSqft: '₹5,000/sq.ft',
                                availableUnits: 12,
                                floorNumbers: '2F'
                              },
                              {
                                id: '3',
                                type: 'Mezzanine-Floor',
                                reraArea: '600 Sq.ft.',
                                price: '₹ 2 Crore 40 Lakhs',
                                pricePerSqft: '₹4,000/sq.ft',
                                availableUnits: 8,
                                floorNumbers: 'MF'
                              },
                              {
                                id: '4',
                                type: 'Forth-Floor',
                                reraArea: '500 Sq.ft.',
                                price: '₹',
                                availableUnits: 5,
                                floorNumbers: '4F'
                              },
                              {
                                id: '5',
                                type: 'First-Floor',
                                reraArea: '800 Sq.ft.',
                                price: '₹ 4 Crore 80 Lakhs',
                                pricePerSqft: '₹6,000/sq.ft',
                                availableUnits: 15,
                                floorNumbers: '1F'
                              },
                              {
                                id: '6',
                                type: 'Ground-Floor',
                                reraArea: '',
                                price: '',
                                availableUnits: 20,
                                floorNumbers: 'GF'
                              }
                            ];
                          } catch (error) {
                            return [];
                          }
                        })()}
                      />

                      {/* Location & Connectivity */}
                      <PropertyLocationDisplay 
                        locationData={{
                          mapImage: '/placeholder-property.svg', // Use a placeholder or actual map
                          address: property.address,
                          nearbyPoints: [
                            {
                              id: '1',
                              name: 'MG Metro Station',
                              type: 'metro',
                              distance: '2.5 km',
                              travelTime: '5 mins',
                              description: 'Blue Line metro connectivity'
                            },
                            {
                              id: '2',
                              name: 'Cybercity',
                              type: 'office',
                              distance: '3.2 km',
                              travelTime: '8 mins',
                              description: 'Major IT hub with multinational companies'
                            },
                            {
                              id: '3',
                              name: 'Ambience Mall',
                              type: 'mall',
                              distance: '1.8 km',
                              travelTime: '4 mins',
                              description: 'Premium shopping and entertainment destination'
                            },
                            {
                              id: '4',
                              name: 'IGI Airport',
                              type: 'airport',
                              distance: '25 km',
                              travelTime: '45 mins',
                              description: 'International airport connectivity'
                            },
                            {
                              id: '5',
                              name: 'NH-8 Highway',
                              type: 'road',
                              distance: '0.5 km',
                              travelTime: '2 mins',
                              description: 'Direct highway access'
                            },
                            {
                              id: '6',
                              name: 'Fortis Hospital',
                              type: 'hospital',
                              distance: '4.1 km',
                              travelTime: '10 mins',
                              description: 'Multi-specialty healthcare facility'
                            }
                          ],
                          coordinates: {
                            latitude: 28.4595,
                            longitude: 77.0266
                          }
                        }}
                      />

                      {/* Enhanced Site Plan */}
                      <PropertySitePlanDisplay 
                        sitePlanData={{
                          sitePlanImage: property.sitePlanImage || '/placeholder-property.svg',
                          sitePlanTitle: property.sitePlanTitle || 'Master Site Plan',
                          sitePlanDescription: property.sitePlanDescription || 'Comprehensive development layout with premium amenities and green spaces',
                          amenities: (() => {
                            try {
                              const facilities = typeof property.facilities === 'string' ? 
                                JSON.parse(property.facilities) : 
                                property.facilities || [];
                              return facilities;
                            } catch (error) {
                              return [
                                { name: 'Swimming Pool', category: 'Recreation', details: 'Olympic-size pool with deck area' },
                                { name: 'Landscaped Gardens', category: 'Environment', details: 'Green spaces throughout the development' },
                                { name: 'Kids Play Area', category: 'Recreation', details: 'Safe and fun play zones for children' },
                                { name: 'Multipurpose Hall', category: 'Community', details: 'Event and gathering space' },
                                { name: 'Gymnasium', category: 'Fitness', details: 'Fully equipped fitness center' },
                                { name: 'Security', category: 'Safety', details: '24x7 security with CCTV surveillance' }
                              ];
                            }
                          })()
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setShowImageModal(true);
                        }}
                        className="relative aspect-w-16 aspect-h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 group"
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <EyeIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related Properties */}
            <div className="mt-12">
              <RelatedProperties 
                currentPropertyId={property.id}
                currentPrice={property.price}
                currentLocation={property.location}
                limit={3}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-6">
              {/* Enhanced Contact Card */}
              <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Interested in this property?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get in touch for more details and viewing
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Link href={`/properties/${property.id}/contact`}>
                    <div className='flex items-center justify-center w-full rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      Contact Agent
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center justify-center w-full rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 transition-all duration-300 border border-blue-200 dark:border-blue-800"
                  >
                    <EnvelopeIcon className="w-5 h-5 mr-2" />
                    Request Info
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Schedule Tour
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <ShareIcon className="w-4 h-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Property ID:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{property.id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Updated:</span>
                      <span className="font-medium">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Views:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {Math.floor(Math.random() * 150) + 50} this week
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Facts */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Facts
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <HomeIcon className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">Type</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Residential</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">Area</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{property.area} sq ft</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">Location</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <CurrencyRupeeIcon className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-400">Price</span>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{formatPrice(property.price)}</span>
                  </div>
                </div>

                {/* Price per sq ft */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Price per sq ft</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Insights */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Market Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Avg. Area Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{Math.round(property.price / property.area * 1.1).toLocaleString('en-IN')}/sq ft</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Price Trend</span>
                    <span className="font-medium text-green-600 dark:text-green-400">↗ +5.2% this year</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Demand</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Request Information
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="I'm interested in this property..."
                    defaultValue={`I'm interested in learning more about ${property.title}. Please contact me with additional details.`}
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}