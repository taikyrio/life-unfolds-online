import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap, DollarSign, Baby, UserCheck, Gamepad2, Lock } from 'lucide-react';
import { Character } from '../types/game';
import { getLifeStage } from '../utils/gameUtils';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu
}) => {
  const getLifeStageIcon = () => {
    const lifeStage = getLifeStage(character.age);
    switch (lifeStage) {
      case 'Baby':
      case 'Toddler':
        return Baby;
      case 'Child':
        return Gamepad2;
      case 'Teen':
        return UserCheck;
      case 'Young Adult':
      case 'Adult':
      case 'Middle-aged':
        return User;
      case 'Senior':
        return User;
      default:
        return User;
    }
  };

  const getLifeStageLabel = () => {
    const stage = getLifeStage(character.age);
    // Show current education or job status
    if (character.currentEducation) {
      return character.currentEducation.level;
    } else if (character.job) {
      return 'Career';
    }
    return stage;
  };

  const isTabAvailable = (tabId: string): boolean => {
    const age = character.age;
    
    switch (tabId) {
      case 'relationships':
        return age >= 12; // Relationships become relevant in teenage years
      case 'assets':
        return age >= 16; // Assets/money management becomes relevant
      case 'career':
        return age >= 16 && !character.currentEducation; // Career tab after education
      case 'education':
        return age >= 5 && age <= 30; // School age to potential graduate school
      default:
        return true;
    }
  };

  const getTabTooltip = (tabId: string): string => {
    if (isTabAvailable(tabId)) return '';
    
    switch (tabId) {
      case 'relationships':
        return 'Available at age 12+';
      case 'assets':
        return 'Available at age 16+';
      case 'career':
        return 'Available after completing education';
      case 'education':
        return 'Available ages 5-30';
      default:
        return '';
    }
  };

  const LifeStageIcon = getLifeStageIcon();

  // Dynamic tabs based on life stage and character status
  const baseTabs = [
    { 
      id: 'lifestage', 
      label: getLifeStageLabel(), 
      icon: LifeStageIcon, 
      onClick: () => {},
      color: 'bg-orange-500',
      available: true
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Home, 
      onClick: isTabAvailable('assets') ? onShowAssetsMenu : () => {},
      color: 'bg-teal-500',
      available: isTabAvailable('assets')
    }
  ];

  const rightTabs = [
    { 
      id: 'relationships', 
      label: 'Relationships', 
      icon: Heart, 
      onClick: isTabAvailable('relationships') ? onShowRelationshipsMenu : () => {},
      color: 'bg-blue-500',
      available: isTabAvailable('relationships')
    },
    { 
      id: 'activities', 
      label: 'Activities', 
      icon: Car, 
      onClick: onShowActivityMenu,
      color: 'bg-purple-500',
      available: true
    }
  ];

  const tabs = [...baseTabs, ...rightTabs];

  return (
    <div className="bg-slate-700 px-4 py-2 relative z-20 border-t-2 border-slate-600">
      <div className="flex items-center justify-around">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isDisabled = !tab.available;
          const tooltip = getTabTooltip(tab.id);
          
          return (
            <div key={tab.id} className="relative group">
              <button
                onClick={tab.onClick}
                disabled={isDisabled}
                className={`flex flex-col items-center transition-colors ${
                  isDisabled 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-white hover:text-gray-300'
                }`}
                title={tooltip}
              >
                <div className={`${tab.color} p-3 rounded-full mb-1 relative ${
                  isDisabled ? 'opacity-50' : ''
                }`}>
                  <Icon size={20} className="text-white" />
                  {isDisabled && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                      <Lock size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
              {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {tooltip}
                </div>
              )}
            </div>
          );
        })}

        {/* Age Button - Green centered */}
        <button
          onClick={onAgeUp}
          className="flex flex-col items-center text-white hover:scale-105 transition-transform"
        >
          <div className="bg-green-500 p-4 rounded-full mb-1 border-4 border-white shadow-lg">
            <span className="text-white font-bold text-xl">+</span>
          </div>
          <span className="text-xs font-medium">Age</span>
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const isDisabled = !tab.available;
          const tooltip = getTabTooltip(tab.id);
          
          return (
            <div key={tab.id} className="relative group">
              <button
                onClick={tab.onClick}
                disabled={isDisabled}
                className={`flex flex-col items-center transition-colors ${
                  isDisabled 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-white hover:text-gray-300'
                }`}
                title={tooltip}
              >
                <div className={`${tab.color} p-3 rounded-full mb-1 relative ${
                  isDisabled ? 'opacity-50' : ''
                }`}>
                  <Icon size={20} className="text-white" />
                  {isDisabled && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                      <Lock size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
              {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {tooltip}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};