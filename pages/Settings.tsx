import React from 'react';
import { Card } from '../components/UI/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Palette, Moon, Sun, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  const { darkMode, setDarkMode, primaryColor, setPrimaryColor, accentColor, setAccentColor } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const presetColors = [
    { primary: '#3b82f6', accent: '#10b981' }, // Blue & Emerald
    { primary: '#8b5cf6', accent: '#f472b6' }, // Violet & Pink
    { primary: '#f59e0b', accent: '#ef4444' }, // Amber & Red
    { primary: '#06b6d4', accent: '#f97316' }, // Cyan & Orange
    { primary: '#ec4899', accent: '#8b5cf6' }, // Pink & Violet
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('themeControl')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Appearance" className="h-full">
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="text-[var(--color-primary)]" /> : <Sun className="text-yellow-500" />}
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{darkMode ? t('darkMode') : t('lightMode')}</p>
                            <p className="text-sm text-gray-500">Adjust the brightness of the interface</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--color-primary)]/20 dark:peer-focus:ring-[var(--color-primary)]/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <Globe className="text-[var(--color-primary)]" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{t('language')}</p>
                            <p className="text-sm text-gray-500">{t('selectLanguage')}</p>
                        </div>
                    </div>
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block p-2.5"
                    >
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                    </select>
                </div>
            </div>
        </Card>

        <Card title="Brand Colors" className="h-full">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('primaryColor')}</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                value={primaryColor} 
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="h-10 w-20 rounded cursor-pointer border-0 bg-transparent p-0"
                            />
                            <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{primaryColor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('accentColor')}</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                value={accentColor} 
                                onChange={(e) => setAccentColor(e.target.value)}
                                className="h-10 w-20 rounded cursor-pointer border-0 bg-transparent p-0"
                            />
                            <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{accentColor}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</p>
                    <div className="flex flex-wrap gap-3">
                        {presetColors.map((preset, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setPrimaryColor(preset.primary); setAccentColor(preset.accent); }}
                                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-md transform hover:scale-110 transition-transform relative overflow-hidden"
                            >
                                <div className="absolute inset-0 w-1/2 h-full" style={{ backgroundColor: preset.primary }}></div>
                                <div className="absolute inset-0 w-1/2 h-full left-1/2" style={{ backgroundColor: preset.accent }}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};