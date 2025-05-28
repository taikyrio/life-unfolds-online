
import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap } from 'lucide-react';
import { Character } from '../types/game';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange,
  onAgeUp,
  character 
}) => {
  // Dynamic tabs based on character status
  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'life' as const, label: 'Life', icon: User },
      { id: 'activities' as const, label: 'Activities', icon: Home },
      { id: 'relationships' as const, label: 'Relations', icon: Heart }
    ];

    // Add Education tab if character is in school
    if (character.currentEducation) {
      baseTabs.push({ id: 'education' as const, label: 'School', icon: GraduationCap });
    }

    // Add Careers tab if character has a job or is old enough to work (14+)
    if (character.job || character.age >= 14) {
      baseTabs.push({ id: 'careers' as const, label: character.job ? 'Work' : 'Careers', icon: Briefcase });
    }

    // Always show assets for older characters or those with assets
    if (character.age >= 18 || character.assets.length > 0) {
      baseTabs.push({ id: 'assets' as const, label: 'Assets', icon: Car });
    }

    return baseTabs;
  };

  const tabs = getAvailableTabs();

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
