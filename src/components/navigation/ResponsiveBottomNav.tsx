import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap, DollarSign, Baby, UserCheck, Gamepad2, Lock, Plus } from 'lucide-react';
import { Character } from '../../types/game';
import { getLifeStage } from '../../utils/gameUtils';

interface ResponsiveBottomNavProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const ResponsiveBottomNav: React.FC<ResponsiveBottomNavProps> = ({ 
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

  const LifeStageIcon = getLifeStageIcon();

  const navigationItems = [
    { 
      id: 'lifestage', 
      label: getLifeStageLabel(), 
      icon: LifeStageIcon, 
      onClick: () => {},
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      available: true
    },
    { 
      id: 'personality', 
      label: 'You', 
      icon: User, 
      onClick: onShowPersonalitySkills,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      available: true
    },
    { 
      id: 'age', 
      label: 'Age', 
      icon: Plus, 
      onClick: onAgeUp,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      available: true,
      isCenter: true
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Home, 
      onClick: isTabAvailable('assets') ? onShowAssetsMenu : () => {},
      gradient: 'from-cyan-500 via-teal-500 to-blue-500',
      available: isTabAvailable('assets')
    },
    { 
      id: 'activities', 
      label: 'Do', 
      icon: Car, 
      onClick: onShowActivityMenu,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      available: true
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      {/* Enhanced iOS 16 + Windows 11 backdrop */}
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-700/50" />
      
      {/* Main navigation container */}
      <div className="relative">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        
        {/* Navigation grid */}
        <div className="px-4 py-4 sm:px-6">
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isDisabled = !item.available;
              const isCenter = item.isCenter;
              
              return (
                <div key={item.id} className="relative group flex justify-center">
                  <button
                    onClick={item.onClick}
                    disabled={isDisabled}
                    className={`flex flex-col items-center transition-all duration-300 ease-out rounded-3xl touch-manipulation relative overflow-hidden ${
                      isCenter 
                        ? 'p-3 hover:scale-110 active:scale-95' 
                        : 'p-3 hover:scale-105 active:scale-95'
                    } ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    {/* Glassmorphism icon container */}
                    <div className={`relative mb-2 transition-all duration-300 backdrop-blur-xl border border-white/10 ${
                      isCenter 
                        ? 'p-4 rounded-3xl shadow-2xl' 
                        : 'p-3 rounded-2xl shadow-lg'
                    } bg-gradient-to-br ${item.gradient} ${
                      isDisabled ? 'opacity-50' : 'shadow-black/25'
                    }`}>
                      {/* Windows 11 style highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-inherit" />
                      
                      <Icon 
                        size={isCenter ? 24 : 20} 
                        className="text-white drop-shadow-lg relative z-10" 
                        strokeWidth={isCenter ? 2.5 : 2}
                      />
                      
                      {isDisabled && (
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg border border-white/20">
                          <Lock size={10} className="text-white" />
                        </div>
                      )}
                      
                      {/* Subtle pulse animation for center button */}
                      {isCenter && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-transparent animate-pulse" />
                      )}
                    </div>
                    
                    <span className={`font-semibold text-white/90 text-center leading-tight tracking-wide ${
                      isCenter ? 'text-xs' : 'text-xs'
                    }`}>
                      {item.label}
                    </span>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* iOS home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  );
};
