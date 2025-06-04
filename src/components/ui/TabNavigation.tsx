import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Tab {
  id: string;
  icon: string;
  label: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();

  const tabs: Tab[] = [
    { id: 'life', icon: '🏠', label: 'Life' },
    { id: 'activities', icon: '🎯', label: 'Activities' },
    { id: 'careers', icon: '💼', label: 'Careers' },
    { id: 'education', icon: '📚', label: 'Education' },
    { id: 'health', icon: '❤️', label: 'Health' },
    { id: 'money', icon: '💰', label: 'Money' },
    { id: 'relationships', icon: '💕', label: 'Relationships' },
    { id: 'assets', icon: '🏆', label: 'Assets' }
  ];

  return (
    <div className="flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/10 px-1 py-1">
      <div className="flex justify-between items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center min-w-[44px] ${
              activeTab === tab.id
                ? 'bg-white/90 dark:bg-slate-800/90 shadow-md scale-105'
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{tab.icon}</span>
            {!isMobile && (
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {tab.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};