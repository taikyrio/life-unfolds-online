
import { Heart, Home, Car, User, Baby, UserCheck, Gamepad2 } from 'lucide-react';
import { Character } from '../../types/game';
import { getLifeStage } from '../../utils/gameUtils';

interface UseNavigationConfigProps {
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const useNavigationConfig = ({
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills
}: UseNavigationConfigProps) => {
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
      available: isTabAvailable('assets'),
      tooltip: getTabTooltip('assets')
    }
  ];

  const rightTabs = [
    { 
      id: 'relationships', 
      label: 'Love', 
      icon: Heart, 
      onClick: isTabAvailable('relationships') ? onShowRelationshipsMenu : () => {},
      gradient: 'from-pink-400 to-rose-500',
      available: isTabAvailable('relationships'),
      tooltip: getTabTooltip('relationships')
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

  return [...baseTabs, ...rightTabs];
};
