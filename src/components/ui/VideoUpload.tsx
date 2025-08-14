"use client";

import { useState } from "react";
import { VideoCameraIcon, XMarkIcon, PlayIcon } from "@heroicons/react/24/outline";
import { storageService } from '@/lib/supabase-storage';

interface VideoUploadProps {
  value: string[];
  onChange: (videos: string[]) => void;
  mainVideo?: string;
  onMainVideoChange?: (video: string) => void;
  label?: string;
  className?: string;
}

export default function VideoUpload({
  value,
  onChange,
  mainVideo,
  onMainVideoChange,
  label = "Upload Videos",
  className = "",
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }

    setUploading(true);
    try {
      // Upload video to Supabase storage
      const videoUrl = await storageService.uploadVideo(file, 'projects/videos');
      
      if (!mainVideo && onMainVideoChange) {
        onMainVideoChange(videoUrl);
      } else {
        onChange([...value, videoUrl]);
      }
      
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    
    // Simple URL validation
    try {
      new URL(urlInput);
      console.log('Adding video URL:', urlInput);
      console.log('Current mainVideo:', mainVideo);
      console.log('Current value array:', value);
      
      if (!mainVideo && onMainVideoChange) {
        console.log('Setting as main video');
        onMainVideoChange(urlInput);
      } else {
        console.log('Adding to video list');
        const newVideos = [...value, urlInput];
        console.log('New videos array:', newVideos);
        onChange(newVideos);
      }
      setUrlInput("");
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const removeVideo = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const removeMainVideo = () => {
    if (onMainVideoChange) {
      onMainVideoChange("");
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Main Video Section */}
      {onMainVideoChange && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Main Project Video
          </h4>
          {mainVideo ? (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black border-2 border-blue-200">
              <video controls className="w-full h-full">
                <source src={mainVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={removeMainVideo}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Main Video
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                No main video added yet
              </p>
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
        <div className="text-center">
          <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                Upload video files
              </span>
              <input
                type="file"
                className="sr-only"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                disabled={uploading}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="flex space-x-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Or paste video URL (YouTube, Vimeo, etc.)"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleUrlAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!urlInput.trim()}
        >
          Add
        </button>
      </div>

      {/* Video List */}
      {value.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Additional Videos ({value.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {value.map((video, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-black border">
                <video controls className="w-full h-full">
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={() => removeVideo(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Video {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Uploading video...
          </div>
        </div>
      )}
    </div>
  );
}
