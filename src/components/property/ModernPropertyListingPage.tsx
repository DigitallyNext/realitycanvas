'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  CloudArrowUpIcon,
  PhotoIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  HomeIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  EyeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import MultiStepProcess from '@/components/ui/MultiStepProcess';
import Image from 'next/image';
import PropertyBasicInfoEditor from '@/components/PropertyBasicInfoEditor';
import PropertyHighlightsEditor from '@/components/PropertyHighlightsEditor';
import PropertyFacilitiesEditor from '@/components/PropertyFacilitiesEditor';
import PropertyFloorPlansEditor from '@/components/PropertyFloorPlansEditor';
import PropertyBuilderEditor from '@/components/PropertyBuilderEditor';
import PropertySitePlanEditor from '@/components/PropertySitePlanEditor';
import PropertyFAQEditor from '@/components/PropertyFAQEditor';

// Dynamically import LexicalEditor component
const LexicalEditor = dynamic(
  () => import('@/components/LexicalEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl flex items-center justify-center">
        <span className="text-gray-500">Loading editor...</span>
      </div>
    ),
  }
);

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  address: string;
  location: string;
  currency: string;
  beds: number;
  baths: number;
  area: number;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  builderName: string;
  builderLogo: string;
  builderDescription: string;
  sitePlanTitle: string;
  sitePlanDescription: string;
  sitePlanImage: string;
  highlights: string;
  floorPlans: string;
  facilities: string;
  faqs: string;
  relatedProperties: string[];
}

// Modern step configuration
const steps = [
  { 
    id: 'basic', 
    name: 'Basic Info', 
    description: 'Property details and location',
    icon: HomeIcon
  },
  { 
    id: 'images', 
    name: 'Photos', 
    description: 'Upload stunning property images',
    icon: PhotoIcon
  },
  { 
    id: 'features', 
    name: 'Features', 
    description: 'Highlights and amenities',
    icon: BuildingOfficeIcon
  },
  { 
    id: 'floorplans', 
    name: 'Floor Plans', 
    description: 'Layout and pricing details',
    icon: DocumentTextIcon
  },
  { 
    id: 'builder', 
    name: 'Builder', 
    description: 'Developer information',
    icon: MapPinIcon
  },
  { 
    id: 'faqs', 
    name: 'FAQs', 
    description: 'Common questions',
    icon: QuestionMarkCircleIcon
  },
  { 
    id: 'review', 
    name: 'Review', 
    description: 'Final review and publish',
    icon: EyeIcon
  },
];

export default function ModernPropertyListingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
  const [sitePlanImage, setSitePlanImage] = useState<File | null>(null);
  const [sitePlanImagePreview, setSitePlanImagePreview] = useState<string | null>(null);
  const [isAIAssisted, setIsAIAssisted] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    address: '',
    location: '',
    currency: 'INR',
    beds: 0,
    baths: 0,
    area: 0,
    bannerTitle: '',
    bannerSubtitle: '',
    bannerDescription: '',
    aboutTitle: '',
    aboutDescription: '',
    builderName: '',
    builderLogo: '',
    builderDescription: '',
    sitePlanTitle: '',
    sitePlanDescription: '',
    sitePlanImage: '',
    highlights: JSON.stringify([]),
    floorPlans: JSON.stringify([]),
    facilities: JSON.stringify([]),
    faqs: JSON.stringify([]),
    relatedProperties: [],
  });

  // Generate image previews when files are selected
  useEffect(() => {
    if (featuredImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(featuredImage);
    } else {
      setFeaturedImagePreview(null);
    }

    if (sitePlanImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSitePlanImagePreview(reader.result as string);
      };
      reader.readAsDataURL(sitePlanImage);
    } else {
      setSitePlanImagePreview(null);
    }

    const previews: string[] = [];
    const readers: FileReader[] = [];

    galleryImages.forEach((file, index) => {
      readers[index] = new FileReader();
      readers[index].onloadend = () => {
        previews[index] = readers[index].result as string;
        if (previews.filter(Boolean).length === galleryImages.length) {
          setGalleryImagePreviews(previews);
        }
      };
      readers[index].readAsDataURL(file);
    });

    if (galleryImages.length === 0) {
      setGalleryImagePreviews([]);
    }
  }, [featuredImage, galleryImages, sitePlanImage]);

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Basic Info
        return !!(formData.title && formData.address && formData.price > 0);
      case 1: // Images
        return featuredImage !== null;
      case 2: // Features
        return true; // Optional step
      case 3: // Floor Plans
        return true; // Optional step
      case 4: // Builder
        return true; // Optional step
      case 5: // FAQs
        return true; // Optional step
      case 6: // Review
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // AI function to generate property description
  const generateDescription = async () => {
    if (!formData.title || !formData.address || !isAIAssisted) return;
    
    setIsGeneratingDescription(true);
    try {
      const response = await fetch('/api/property-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_description',
          propertyData: {
            title: formData.title,
            price: formData.price,
            address: formData.address,
            location: formData.location,
            beds: formData.beds,
            baths: formData.baths,
            area: formData.area
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          setFormData({
            ...formData,
            description: data.content
          });
        }
      }
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file uploads
      const submitData = new FormData();
      
      // Add basic form data
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof PropertyFormData];
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value.toString());
        }
      });

      // Add files
      if (featuredImage) {
        submitData.append('featuredImage', featuredImage);
      }
      
      galleryImages.forEach((file, index) => {
        submitData.append(`galleryImage${index}`, file);
      });

      if (sitePlanImage) {
        submitData.append('sitePlanImage', sitePlanImage);
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/properties/${result.id}`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('An error occurred while submitting the property');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderImageUpload();
      case 2:
        return (
          <PropertyHighlightsEditor
            value={formData.highlights}
            onChange={(highlights) => setFormData({ ...formData, highlights })}
            propertyData={{
              title: formData.title,
              price: formData.price,
              address: formData.address,
              location: formData.location,
              beds: formData.beds,
              baths: formData.baths,
              area: formData.area
            }}
          />
        );
      case 3:
        return (
          <PropertyFloorPlansEditor
            value={formData.floorPlans}
            onChange={(floorPlans) => setFormData({ ...formData, floorPlans })}
          />
        );
      case 4:
        return (
          <div className="space-y-8">
            <PropertyBuilderEditor
              builderName={formData.builderName}
              builderLogo={formData.builderLogo}
              builderDescription={formData.builderDescription}
              onBuilderNameChange={(builderName) => setFormData({ ...formData, builderName })}
              onBuilderLogoChange={(builderLogo) => setFormData({ ...formData, builderLogo })}
              onBuilderDescriptionChange={(builderDescription) => setFormData({ ...formData, builderDescription })}
            />
            <PropertySitePlanEditor
              sitePlanTitle={formData.sitePlanTitle}
              sitePlanDescription={formData.sitePlanDescription}
              sitePlanImage={formData.sitePlanImage}
              onTitleChange={(sitePlanTitle) => setFormData({ ...formData, sitePlanTitle })}
              onDescriptionChange={(sitePlanDescription) => setFormData({ ...formData, sitePlanDescription })}
              onImageChange={(sitePlanImage) => setFormData({ ...formData, sitePlanImage })}
            />
          </div>
        );
      case 5:
        return (
          <PropertyFAQEditor
            value={formData.faqs}
            onChange={(faqs) => setFormData({ ...formData, faqs })}
          />
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Review Your Listing</h3>
              <p className="text-gray-600 dark:text-gray-300">Please review all information before publishing your property.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Property Title</h4>
                <p className="text-gray-600 dark:text-gray-300">{formData.title || 'Not provided'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Price</h4>
                <p className="text-2xl font-bold text-blue-600">₹{formData.price.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                <p className="text-gray-600 dark:text-gray-300">{formData.address || 'Not provided'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Property Details</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {formData.beds} beds • {formData.baths} baths • {formData.area} sq ft
                </p>
              </div>
            </div>
            
            {featuredImagePreview && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Featured Image</h4>
                <Image
                  src={featuredImagePreview}
                  alt="Featured preview"
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };



  const renderImageUpload = () => (
    <div className="space-y-8">
      {/* Featured Image */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Featured Image
        </h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
          {featuredImagePreview ? (
            <div className="relative">
              <Image
                src={featuredImagePreview}
                alt="Featured preview"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-lg"
              />
              <button
                onClick={() => {
                  setFeaturedImage(null);
                  setFeaturedImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Upload Featured Image
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop your main property image here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFeaturedImage(file);
                }}
                className="hidden"
                id="featured-upload"
              />
              <label
                htmlFor="featured-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                Choose Image
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Gallery Images
        </h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {galleryImagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <Image
                  src={preview}
                  alt={`Gallery ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => {
                    const newGallery = galleryImages.filter((_, i) => i !== index);
                    setGalleryImages(newGallery);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setGalleryImages([...galleryImages, ...files]);
              }}
              className="hidden"
              id="gallery-upload"
            />
            <label
              htmlFor="gallery-upload"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer"
            >
              <PhotoIcon className="w-5 h-5 mr-2" />
              Add Gallery Images
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* AI Assistance Toggle */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
              AI-Powered Listing Assistant
            </h4>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              Enable AI to help generate compelling descriptions and content
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAIAssisted(!isAIAssisted)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isAIAssisted
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            {isAIAssisted ? 'AI Enabled' : 'Enable AI'}
          </button>
        </div>
      </div>

      <PropertyBasicInfoEditor
        formData={formData}
        onFormDataChange={(newData) => setFormData({
          ...formData,
          ...newData
        })}
      />

      {/* AI Description Generator */}
      {isAIAssisted && formData.title && formData.address && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                AI Description Generator
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Generate a compelling property description using AI
              </p>
            </div>
            <button
              type="button"
              onClick={generateDescription}
              disabled={isGeneratingDescription}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isGeneratingDescription ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate Description
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );



  return (
    <MultiStepProcess
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onNext={nextStep}
      onPrevious={prevStep}
      onSubmit={handleSubmit}
      isStepComplete={isStepComplete}
      isSubmitting={isSubmitting}
      finalButtonText="Publish Property"
      className="pt-16"
    >
      {renderStepContent()}
    </MultiStepProcess>
  );
}