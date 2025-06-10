
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
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-2 py-2 shadow-sm">
      <div className="flex justify-between items-center overflow-x-auto gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative p-3 rounded-xl transition-all duration-300 flex flex-col items-center min-w-[60px] group ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className={`${isMobile ? 'text-lg' : 'text-xl'} transition-transform duration-200 ${
              activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
            }`}>
              {tab.icon}
            </span>
            {!isMobile && (
              <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
                activeTab === tab.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
              }`}>
                {tab.label}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
