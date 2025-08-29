"use client";

import { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

// Loading skeleton component
const SectionSkeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse ${className || ''}`}>
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

export default function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay to simulate progressive loading
          setTimeout(() => setIsLoaded(true), 100);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <div className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          {children}
        </div>
      ) : (
        fallback || <SectionSkeleton />
      )}
    </div>
  );
}