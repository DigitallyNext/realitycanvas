'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Function to get the effective theme
  const getEffectiveTheme = (selectedTheme: Theme): 'light' | 'dark' => {
    if (selectedTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return selectedTheme;
  };

  // Force light theme only - no localStorage loading
  useEffect(() => {
    setTheme('light');
    setActualTheme('light');
  }, []);

  // Force light theme only
  useEffect(() => {
    setActualTheme('light');

    // Remove any existing theme classes
    document.documentElement.classList.remove('dark', 'light');
    
    // Add light theme class only
    document.documentElement.classList.add('light');

    // Store light theme preference
    localStorage.setItem('theme', 'light');
  }, []);

  // System theme listener removed - using light mode only

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}