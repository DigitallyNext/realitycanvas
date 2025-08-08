'use client';

import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as MdOutlineIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';

interface IconRendererProps {
  iconString: string;
  size?: number;
  className?: string;
}

/**
 * A component that renders an icon based on a string identifier
 * Format: 'library:iconName' (e.g., 'md:house' or 'fa:home')
 */
export default function IconRenderer({ iconString, size = 24, className = '' }: IconRendererProps) {
  // Default icon if none provided or invalid
  if (!iconString || !iconString.includes(':')) {
    const DefaultIcon = MdOutlineIcons.MdOutlineHouse;
    return <DefaultIcon size={size} className={className} />;
  }

  // Parse the icon string
  const [library, iconName] = iconString.split(':');
  
  try {
    if (library === 'md') {
      // Material Design icons
      // First try with MdOutline prefix
      const outlineIconName = 'MdOutline' + iconName.charAt(0).toUpperCase() + iconName.slice(1);
      const OutlineIconComponent = (MdOutlineIcons as any)[outlineIconName];
      
      if (OutlineIconComponent) {
        return <OutlineIconComponent size={size} className={className} />;
      }
      
      // If not found, try with Md prefix
      const regularIconName = 'Md' + iconName.charAt(0).toUpperCase() + iconName.slice(1);
      const RegularIconComponent = (MdIcons as any)[regularIconName];
      
      if (RegularIconComponent) {
        return <RegularIconComponent size={size} className={className} />;
      }
    } else if (library === 'fa') {
      // Font Awesome icons - convert kebab-case to CamelCase
      const camelCaseName = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const faIconName = 'Fa' + camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
      const FaIconComponent = (FaIcons as any)[faIconName];
      
      if (FaIconComponent) {
        return <FaIconComponent size={size} className={className} />;
      }
    }
  } catch (error) {
    console.error(`Error rendering icon: ${iconString}`, error);
  }
  
  // Fallback to a default icon
  return <MdOutlineIcons.MdOutlineHouse size={size} className={className} />;
}