'use client';

import { useState, useEffect } from 'react';
import { CloudArrowUpIcon, LinkIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { storageService } from '@/lib/supabase-storage';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  placeholder?: string;
  folder?: string;
  multiple?: boolean;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  className = '',
  placeholder = 'Upload or enter image URL',
  folder = 'projects',
  multiple = false,
  accept = 'image/*'
}: ImageUploadProps) {
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');

  // Sync urlInput with value prop changes
  useEffect(() => {
    setUrlInput(value || '');
  }, [value]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (multiple) {
        const fileArray = Array.from(files);
        const urls = await storageService.uploadMultipleImages(fileArray, folder);
        onChange(urls.join(','));
      } else {
        const url = await storageService.uploadImage(files[0], folder);
        onChange(url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      if (error instanceof Error && error.message.includes('Storage bucket not configured')) {
        alert('File upload temporarily unavailable. Please use image URLs instead. Check Supabase bucket configuration.');
      } else {
        alert(`Upload failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      // Keep the URL in the input for editing
      setUrlInput(urlInput.trim());
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
      setUrlInput('');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mode Toggle */}
      <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-700">
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            uploadMode === 'url'
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('upload')}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            uploadMode === 'upload'
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <CloudArrowUpIcon className="w-4 h-4 mr-2" />
          Upload
        </button>
      </div>

      {/* URL Input Mode */}
      {uploadMode === 'url' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Enter image URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Upload Mode */}
      {uploadMode === 'upload' && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
            </div>
          ) : (
            <div>
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {placeholder}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your {multiple ? 'images' : 'image'} here, or click to browse
              </p>
              <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                Choose {multiple ? 'Images' : 'Image'}
              </label>
            </div>
          )}
        </div>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => {
                // Handle broken images
                onChange('');
                setUrlInput('');
              }}
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
