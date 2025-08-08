'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { findIconForTitle } from '@/utils/iconMappings';

interface IconDisplayProps {
  title: string;
  size?: number;
  className?: string;
}

/**
 * A component that displays an appropriate icon based on the title
 */
export default function IconDisplay({ title, size = 24, className = '' }: IconDisplayProps) {
  // Get the appropriate icon component based on the title
  const IconComponent = findIconForTitle(title);
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <IconComponent size={size} />
    </div>
  );
}