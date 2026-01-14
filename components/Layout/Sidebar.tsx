import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { MENU_ITEMS } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { MenuItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
      // On mobile, close sidebar after navigation
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = item.path && location.pathname === item.path;
    const hasChildren = item.subItems && item.subItems.length > 0;
    const paddingLeft = depth * 1.5 + 1; // rem

    return (
      <div key={item.id} className="mb-1">
        <div
          onClick={(e) => hasChildren ? toggleExpand(item.id, e) : handleNavigation(item.path)}
          className={`
            group flex items-center justify-between py-3 px-4 mx-2 rounded-lg cursor-pointer transition-all duration-200
            ${isActive 
              ? 'bg-[var(--color-primary)] text-white shadow-md' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
          `}
          style={{ paddingLeft: `${paddingLeft}rem` }}
        >
          <div className="flex items-center gap-3">
            {item.icon && <item.icon size={20} className={isActive ? 'text-white' : `text-[var(--color-primary)]`} />}
            <span className="font-medium">{language === 'en' ? item.label : item.labelBn}</span>
          </div>
          {hasChildren && (
            <div onClick={(e) => toggleExpand(item.id, e)}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 transition-all duration-300 ease-in-out">
            {item.subItems!.map(sub => renderMenuItem(sub, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          transform transition-transform duration-300 ease-in-out overflow-y-auto custom-scrollbar
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
              EduAdmin
            </h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-md">
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 mt-2 pb-4">
          {MENU_ITEMS.map(item => renderMenuItem(item))}
        </nav>
      </aside>
    </>
  );
};