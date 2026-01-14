import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from '../types';

interface ThemeContextType extends ThemeConfig {
  setDarkMode: (value: boolean) => void;
  setPrimaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or default
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved === 'dark';
  });
  
  const [primaryColor, setPrimaryColor] = useState<string>(() => 
    localStorage.getItem('theme_primary') || '#3b82f6'
  );
  
  const [accentColor, setAccentColor] = useState<string>(() => 
    localStorage.getItem('theme_accent') || '#10b981'
  );

  useEffect(() => {
    // Apply dark mode class to HTML element
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme_mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    // Apply CSS variables
    const root = window.document.documentElement;
    root.style.setProperty('--color-primary', primaryColor);
    root.style.setProperty('--color-accent', accentColor);
    localStorage.setItem('theme_primary', primaryColor);
    localStorage.setItem('theme_accent', accentColor);
  }, [primaryColor, accentColor]);

  return (
    <ThemeContext.Provider value={{ darkMode, primaryColor, accentColor, setDarkMode, setPrimaryColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};