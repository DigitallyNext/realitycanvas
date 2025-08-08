'use client';

import { useState, useMemo } from 'react';
import { PlusIcon, XMarkIcon, CodeBracketIcon, EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { findIconForTitle } from '@/utils/iconMappings';
import * as ReactIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

interface PropertyHighlightsEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  propertyData?: any; // For AI assistance
}

// Import custom icon components
import IconDisplay from './ui/IconDisplay';
import IconRenderer from './ui/IconRenderer';
import { getAllIcons } from '@/utils/iconMappings';

// Get all available icons from our mapping utility
const iconOptions = getAllIcons().map(icon => {
  // Parse the icon string (format: 'md:house' or 'fa:home')
  const [library, name] = icon.split(':');
  return {
    value: icon,
    label: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim(),
    library
  };
});

export default function PropertyHighlightsEditor({ value, onChange, label = "Property Highlights", placeholder = "Add key features and highlights of your property", propertyData }: PropertyHighlightsEditorProps) {
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [isAIAssisted, setIsAIAssisted] = useState(false);
  const [isGeneratingIcon, setIsGeneratingIcon] = useState<number | null>(null);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState<number | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    try {
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });

  const updateHighlights = (newHighlights: Highlight[]) => {
    setHighlights(newHighlights);
    onChange(JSON.stringify(newHighlights));
  };

  const addHighlight = () => {
    // Use a default icon from our icon mapping system
    const defaultIcon = 'md:home';
    const newHighlights = [...highlights, { icon: defaultIcon, title: '', description: '' }];
    updateHighlights(newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    updateHighlights(newHighlights);
  };

  const updateHighlight = (index: number, field: keyof Highlight, value: string) => {
    const newHighlights = highlights.map((highlight, i) => 
      i === index ? { ...highlight, [field]: value } : highlight
    );
    updateHighlights(newHighlights);
  };

  // State for error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Local function to suggest icon based on title using our icon mapping utility
  const suggestIcon = (index: number, title: string) => {
    if (!title.trim() || !isAIAssisted) return;
    
    setIsGeneratingIcon(index);
    
    try {
      // Use a small timeout to simulate processing and show the loading indicator
      setTimeout(() => {
        // Get the icon name based on the title
        const IconComponent = findIconForTitle(title);
        
        // Convert the React Icon component to a string representation for storage
        // We'll store the name of the icon in the format 'md:house' or 'fa:home'
        const iconName = IconComponent.displayName || '';
        let iconString = '';
        
        if (iconName.startsWith('Md')) {
          iconString = `md:${iconName.slice(2).toLowerCase()}`;
        } else if (iconName.startsWith('Fa')) {
          iconString = `fa:${iconName.slice(2).toLowerCase()}`;
        } else {
          // Fallback to a default icon
          iconString = 'md:house';
        }
        
        updateHighlight(index, 'icon', iconString);
        setIsGeneratingIcon(null);
      }, 300); // Small delay to show loading state
    } catch (error) {
      console.error('Error suggesting icon:', error);
      setErrorMessage('Error generating icon. Please try again.');
      setIsGeneratingIcon(null);
    }
  };

  // AI function to generate title with retry logic
  const generateTitle = async (index: number, retryCount = 0) => {
    if (!isAIAssisted || !propertyData) return;
    
    const maxRetries = 2;
    setIsGeneratingTitle(index);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/property-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_highlight_title',
          propertyData: propertyData,
          highlightIndex: index
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.title) {
          updateHighlight(index, 'title', data.title);
          // Auto-suggest icon after generating title
          setTimeout(() => suggestIcon(index, data.title), 500);
        }
      } else if (response.status === 429 && retryCount < maxRetries) {
        // Rate limit hit, retry after delay
        const data = await response.json();
        const retryAfter = parseInt(data.retryAfter || '5');
        
        // Show temporary message
        setErrorMessage(`Rate limit reached. Retrying in ${retryAfter} seconds...`);
        
        // Wait and retry
        setTimeout(() => {
          generateTitle(index, retryCount + 1);
        }, retryAfter * 1000);
        return; // Don't reset isGeneratingTitle yet
      } else {
        // Handle other errors
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to generate title. Please try again.');
      }
    } catch (error) {
      console.error('Error generating title:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      if (retryCount >= maxRetries) {
        setIsGeneratingTitle(null);
      }
    }
  };
  
  // AI function to generate icon only
  const generateIconOnly = async (index: number) => {
    if (!isAIAssisted || !highlights[index]?.title.trim()) return;
    
    // We don't need to set loading state or handle errors here
    // as suggestIcon already handles all of that including retries
    await suggestIcon(index, highlights[index].title);
  };

  // AI function to generate description with retry logic
  const generateDescription = async (index: number, retryCount = 0) => {
    if (!isAIAssisted || !propertyData) return;
    
    const maxRetries = 2;
    setIsGeneratingDescription(index);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/property-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_highlight_description',
          propertyData: propertyData,
          highlightIndex: index,
          highlightTitle: highlights[index]?.title || ''
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.description) {
          updateHighlight(index, 'description', data.description);
        }
      } else if (response.status === 429 && retryCount < maxRetries) {
        // Rate limit hit, retry after delay
        const data = await response.json();
        const retryAfter = parseInt(data.retryAfter || '5');
        
        // Show temporary message
        setErrorMessage(`Rate limit reached. Retrying in ${retryAfter} seconds...`);
        
        // Wait and retry
        setTimeout(() => {
          generateDescription(index, retryCount + 1);
        }, retryAfter * 1000);
        return; // Don't reset isGeneratingDescription yet
      } else {
        // Handle other errors
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to generate description. Please try again.');
      }
    } catch (error) {
      console.error('Error generating description:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      if (retryCount >= maxRetries) {
        setIsGeneratingDescription(null);
      }
    }
  };

  // State for generating highlights
  const [isGeneratingHighlights, setIsGeneratingHighlights] = useState(false);

  // AI function to generate highlights with retry logic
  const generateHighlights = async (retryCount = 0) => {
    if (!propertyData || !isAIAssisted) return;
    
    const maxRetries = 2;
    setIsGeneratingHighlights(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/property-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_highlights',
          propertyData: propertyData
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.highlights && Array.isArray(data.highlights)) {
          updateHighlights(data.highlights);
        }
      } else if (response.status === 429 && retryCount < maxRetries) {
        // Rate limit hit, retry after delay
        const data = await response.json();
        const retryAfter = parseInt(data.retryAfter || '5');
        
        // Show temporary message
        setErrorMessage(`Rate limit reached. Retrying in ${retryAfter} seconds...`);
        
        // Wait and retry
        setTimeout(() => {
          generateHighlights(retryCount + 1);
        }, retryAfter * 1000);
        return; // Don't reset isGeneratingHighlights yet
      } else {
        // Handle other errors
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to generate highlights. Please try again.');
      }
    } catch (error) {
      console.error('Error generating highlights:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      if (retryCount >= maxRetries) {
        setIsGeneratingHighlights(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {placeholder}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* AI Assistance Toggle */}
          <button
            type="button"
            onClick={() => setIsAIAssisted(!isAIAssisted)}
            className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isAIAssisted
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <SparklesIcon className="w-4 h-4 mr-1" />
            {isAIAssisted ? 'AI Enabled' : 'Enable AI'}
          </button>
          
          <button
            type="button"
            onClick={() => setIsJsonMode(!isJsonMode)}
            className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isJsonMode
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-primary-100 dark:bg-secondary-900 text-brand-primary dark:text-brand-primary'
            }`}
          >
            {isJsonMode ? (
              <>
                <EyeIcon className="w-4 h-4 mr-1" />
                Visual Editor
              </>
            ) : (
              <>
                <CodeBracketIcon className="w-4 h-4 mr-1" />
                JSON Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 focus:outline-none"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Generate Highlights Button */}
      {isAIAssisted && propertyData && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                AI-Powered Highlights
              </h4>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Let AI generate compelling highlights based on your property details
              </p>
            </div>
            <button
              type="button"
              onClick={() => generateHighlights()}
              disabled={isGeneratingHighlights}
              className={`flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg ${isGeneratingHighlights ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'}`}
            >
              {isGeneratingHighlights ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Generate Highlights
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isJsonMode ? (
        <div className="space-y-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white font-mono text-sm"
            placeholder={`[
  {
    "icon": "md:location",
    "title": "Prime Location",
    "description": "Strategically located in the heart of the city"
  },
  {
    "icon": "md:star",
    "title": "Modern Design",
    "description": "Contemporary architecture with premium finishes"
  }
]`}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter highlights in JSON format. Each highlight should have an icon, title, and description.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Highlight {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Icon Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Icon
                    </label>
                    {isAIAssisted && highlight.title.trim() && (
                      <button
                        type="button"
                        onClick={() => generateIconOnly(index)}
                        disabled={isGeneratingIcon === index}
                        className="flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                      >
                        <SparklesIcon className="w-3 h-3 mr-1" />
                        Generate
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {/* Icon Preview */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center">
                      <IconRenderer iconString={highlight.icon} size={24} className="text-gray-700 dark:text-gray-200" />
                    </div>
                    {/* Icon Selector */}
                    <div className="relative flex-grow">
                      <select
                        value={highlight.icon}
                        onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                      >
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {isGeneratingIcon === index && (
                        <div className="absolute right-2 top-2">
                          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Auto-suggestion status message */}
                  {isAIAssisted && highlight.title.trim() && isGeneratingIcon === index && (
                    <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 flex items-center">
                      <div className="w-3 h-3 border border-purple-500 border-t-transparent rounded-full animate-spin mr-1"></div>
                      Auto-suggesting icon...
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    {isAIAssisted && (
                      <button
                        type="button"
                        onClick={() => generateTitle(index)}
                        disabled={isGeneratingTitle === index}
                        className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <SparklesIcon className="w-3 h-3 mr-1" />
                        Generate
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={highlight.title}
                      onChange={(e) => {
                        updateHighlight(index, 'title', e.target.value);
                        // Auto-suggest icon when title changes (with debounce)
                        if (isAIAssisted && e.target.value.trim()) {
                          // Reduced timeout for more responsive icon suggestion
                          setTimeout(() => suggestIcon(index, e.target.value), 500);
                        }
                      }}
                      placeholder="e.g., Prime Location"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                    {isGeneratingTitle === index && (
                      <div className="absolute right-2 top-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    {isAIAssisted && (
                      <button
                        type="button"
                        onClick={() => generateDescription(index)}
                        disabled={isGeneratingDescription === index}
                        className="flex items-center text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        <SparklesIcon className="w-3 h-3 mr-1" />
                        Generate
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      value={highlight.description}
                      onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                      placeholder="Brief description..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
                    />
                    {isGeneratingDescription === index && (
                      <div className="absolute right-2 top-2">
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addHighlight}
            className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary dark:hover:border-brand-primary dark:hover:text-brand-primary transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Highlight
          </button>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="mt-6 p-4 bg-primary-50 dark:bg-secondary-900/20 rounded-lg border border-primary-200 dark:border-secondary-800">
          <h4 className="text-sm font-medium text-brand-secondary dark:text-white mb-2">
            Preview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-lg">{highlight.icon}</div>
                <div>
                  <div className="text-sm font-medium text-brand-secondary dark:text-white">
                    {highlight.title || 'Untitled'}
                  </div>
                  <div className="text-xs text-brand-secondary dark:text-gray-300">
                    {highlight.description || 'No description'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}