
import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap, DollarSign, Baby, UserCheck, Gamepad2, Lock, Plus } from 'lucide-react';
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
  onShowPersonalitySkills: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills
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
    if (character.currentEducation) {
      return character.currentEducation.stage || character.currentEducation.level || stage;
    } else if (character.job) {
      return 'Career';
    }
    return stage;
  };

  const isTabAvailable = (tabId: string): boolean => {
    const age = character.age;
    
    switch (tabId) {
      case 'relationships':
        return age >= 12;
      case 'assets':
        return age >= 16;
      case 'career':
        return age >= 16 && !character.currentEducation;
      case 'education':
        return age >= 5 && age <= 30;
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

  const baseTabs = [
    { 
      id: 'lifestage', 
      label: getLifeStageLabel(), 
      icon: LifeStageIcon, 
      onClick: () => {},
      gradient: 'from-orange-400 to-red-500',
      available: true
    },
    { 
      id: 'personality', 
      label: 'You', 
      icon: User, 
      onClick: onShowPersonalitySkills,
      gradient: 'from-indigo-400 to-purple-500',
      available: true
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Home, 
      onClick: isTabAvailable('assets') ? onShowAssetsMenu : () => {},
      gradient: 'from-teal-400 to-cyan-500',
      available: isTabAvailable('assets')
    }
  ];

  const rightTabs = [
    { 
      id: 'relationships', 
      label: 'Love', 
      icon: Heart, 
      onClick: isTabAvailable('relationships') ? onShowRelationshipsMenu : () => {},
      gradient: 'from-pink-400 to-rose-500',
      available: isTabAvailable('relationships')
    },
    { 
      id: 'activities', 
      label: 'Do', 
      icon: Car, 
      onClick: onShowActivityMenu,
      gradient: 'from-emerald-400 to-green-500',
      available: true
    }
  ];

  const tabs = [...baseTabs, ...rightTabs];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      {/* iOS-style blur backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
      
      {/* Windows 11 dark container */}
      <div className="relative bg-gray-900/80 border-t border-white/10">
        {/* Subtle top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center justify-between w-full max-w-sm">
            {/* Left tabs */}
            {tabs.slice(0, 2).map((tab) => {
              const Icon = tab.icon;
              const isDisabled = !tab.available;
              const tooltip = getTabTooltip(tab.id);
              
              return (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={tab.onClick}
                    disabled={isDisabled}
                    className={`flex flex-col items-center transition-all duration-300 ease-out p-3 rounded-2xl min-h-[64px] min-w-[64px] ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:scale-105 active:scale-95 hover:bg-white/10'
                    }`}
                    title={tooltip}
                  >
                    <div className={`relative p-2.5 rounded-xl mb-1 bg-gradient-to-br ${tab.gradient} ${
                      isDisabled ? 'opacity-50' : 'shadow-lg shadow-black/30'
                    }`}>
                      <Icon size={18} className="text-white drop-shadow-sm" />
                      {isDisabled && (
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 shadow-lg">
                          <Lock size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-white/90 text-center leading-tight tracking-wide">
                      {tab.label}
                    </span>
                  </button>
                  
                  {/* Tooltip */}
                  {tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                      {tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800/95" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Center Age Button - Windows 11 Fluent Design */}
            <button
              onClick={onAgeUp}
              className="flex flex-col items-center text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 p-3 rounded-2xl group"
            >
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-2xl shadow-2xl shadow-green-500/40 group-hover:shadow-green-500/60 transition-all duration-300 border border-white/20 group-hover:border-white/30">
                {/* Windows 11 highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <Plus size={22} className="text-white drop-shadow-lg relative z-10" strokeWidth={2.5} />
                
                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-2xl bg-green-400/20 scale-100 group-active:scale-110 transition-transform duration-150" />
              </div>
              <span className="text-xs font-semibold mt-1 tracking-wide">Age</span>
            </button>

            {/* Right tabs */}
            {tabs.slice(2).map((tab) => {
              const Icon = tab.icon;
              const isDisabled = !tab.available;
              const tooltip = getTabTooltip(tab.id);
              
              return (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={tab.onClick}
                    disabled={isDisabled}
                    className={`flex flex-col items-center transition-all duration-300 ease-out p-3 rounded-2xl min-h-[64px] min-w-[64px] ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:scale-105 active:scale-95 hover:bg-white/10'
                    }`}
                    title={tooltip}
                  >
                    <div className={`relative p-2.5 rounded-xl mb-1 bg-gradient-to-br ${tab.gradient} ${
                      isDisabled ? 'opacity-50' : 'shadow-lg shadow-black/30'
                    }`}>
                      <Icon size={18} className="text-white drop-shadow-sm" />
                      {isDisabled && (
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 shadow-lg">
                          <Lock size={8} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-white/90 text-center leading-tight tracking-wide">
                      {tab.label}
                    </span>
                  </button>
                  
                  {/* Tooltip */}
                  {tooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800/95 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                      {tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800/95" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Home indicator (iOS style) */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
