import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap, DollarSign, Baby, UserCheck, Gamepad2 } from 'lucide-react';
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
    return getLifeStage(character.age);
  };

  const LifeStageIcon = getLifeStageIcon();

  const tabs = [
    { 
      id: 'lifestage', 
      label: getLifeStageLabel(), 
      icon: LifeStageIcon, 
      onClick: () => {},
      color: 'bg-orange-500'
    },
    { 
      id: 'assets', 
      label: 'Assets', 
      icon: Home, 
      onClick: onShowAssetsMenu,
      color: 'bg-teal-500'
    },
    { 
      id: 'relationships', 
      label: 'Relationships', 
      icon: Heart, 
      onClick: onShowRelationshipsMenu,
      color: 'bg-blue-500'
    },
    { 
      id: 'activities', 
      label: 'Activities', 
      icon: Car, 
      onClick: onShowActivityMenu,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="bg-slate-700 px-4 py-2 relative z-20 border-t-2 border-slate-600">
      <div className="flex items-center justify-around">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
            >
              <div className={`${tab.color} p-3 rounded-full mb-1`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}

        {/* Age Button - Green centered */}
        <button
          onClick={onAgeUp}
          className="flex flex-col items-center text-white"
        >
          <div className="bg-green-500 p-4 rounded-full mb-1 border-4 border-white shadow-lg">
            <span className="text-white font-bold text-xl">+</span>
          </div>
          <span className="text-xs font-medium">Age</span>
        </button>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
            >
              <div className={`${tab.color} p-3 rounded-full mb-1`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};