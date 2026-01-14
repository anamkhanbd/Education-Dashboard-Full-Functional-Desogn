import React from 'react';
import { Menu, Moon, Sun, Bell, Globe, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { darkMode, setDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden sm:block">
          {t('dashboard')}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Globe size={16} className="text-[var(--color-primary)]" />
          <span>{language === 'en' ? 'EN' : 'BN'}</span>
        </button>

        {/* Theme Toggler */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-[var(--color-primary)]" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>

        {/* System Admin Profile */}
        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">System Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@edu.com</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center border border-[var(--color-primary)]/20">
                <User size={20} />
            </div>
        </div>
      </div>
    </header>
  );
};