
import React from 'react';
import { Heart, Briefcase, Users, Home, Car } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets') => void;
  onAgeUp: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  onAgeUp 
}) => {
  const tabs = [
    { id: 'activities' as const, label: 'Activities', icon: Home },
    { id: 'relationships' as const, label: 'Relationships', icon: Heart },
    { id: 'careers' as const, label: 'Careers', icon: Briefcase },
    { id: 'assets' as const, label: 'Assets', icon: Car },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 ${
                activeTab === tab.id ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs truncate">{tab.label}</span>
            </button>
          );
        })}
        
        {/* Age Button */}
        <button
          onClick={onAgeUp}
          className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg hover:bg-red-600 transition-colors"
        >
          Age
        </button>
        
        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 ${
                activeTab === tab.id ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
