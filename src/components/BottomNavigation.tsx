
import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User } from 'lucide-react';

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
    { id: 'life' as const, label: 'Life', icon: User },
    { id: 'activities' as const, label: 'Activities', icon: Home },
    { id: 'relationships' as const, label: 'Relations', icon: Heart },
    { id: 'careers' as const, label: 'Careers', icon: Briefcase },
    { id: 'assets' as const, label: 'Assets', icon: Car },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb shadow-lg">
      <div className="flex items-center justify-around py-1">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 transition-all duration-200 ${
                isActive 
                  ? 'text-red-500 transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${
                isActive ? 'bg-red-50' : ''
              }`}>
                <Icon size={18} className="mb-1" />
              </div>
              <span className={`text-xs truncate font-medium ${
                isActive ? 'text-red-600' : ''
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1 transition-all duration-200"></div>
              )}
            </button>
          );
        })}
        
        {/* Age Button - Enhanced for mobile */}
        <button
          onClick={onAgeUp}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 mx-1"
        >
          <div className="text-center">
            <div className="text-xs leading-tight">Age</div>
            <div className="text-xs opacity-90">Up</div>
          </div>
        </button>
        
        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 min-w-0 flex-1 transition-all duration-200 ${
                isActive 
                  ? 'text-red-500 transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${
                isActive ? 'bg-red-50' : ''
              }`}>
                <Icon size={18} className="mb-1" />
              </div>
              <span className={`text-xs truncate font-medium ${
                isActive ? 'text-red-600' : ''
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 bg-red-500 rounded-full mt-1 transition-all duration-200"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
