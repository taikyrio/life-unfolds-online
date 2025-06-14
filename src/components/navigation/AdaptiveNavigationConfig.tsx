
import { Home, Users, Globe, Zap, Baby, UserCheck, Gamepad2, Briefcase, GraduationCap, Building2, Heart, Trophy } from 'lucide-react';
import { Character } from '../../types/game';
import { getLifeStage } from '../../utils/gameUtils';

interface NavigationTab {
  id: string;
  label: string;
  icon: any;
  gradient: string;
  available: boolean;
  badge?: {
    count?: number;
    type: 'urgent' | 'opportunity' | 'achievement' | 'social';
  };
  onClick: () => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
  onClick: () => void;
}

interface UseAdaptiveNavigationProps {
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
  onTabChange: (tab: string) => void;
}

export const useAdaptiveNavigation = ({
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills,
  onTabChange
}: UseAdaptiveNavigationProps) => {
  const lifeStage = getLifeStage(character.age);

  // Dynamic tab configuration based on character state
  const getLifeHubConfig = () => {
    const baseConfig = {
      id: 'life',
      label: lifeStage === 'Child' ? 'Play' : lifeStage === 'Teen' ? 'School' : 'Life',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      available: true,
      onClick: () => onTabChange('life')
    };

    // Dynamic icon based on current activity
    if (character.currentEducation) {
      return { ...baseConfig, icon: GraduationCap };
    } else if (character.job) {
      return { ...baseConfig, icon: Briefcase };
    } else if (character.age < 13) {
      return { ...baseConfig, icon: Gamepad2 };
    }
    return { ...baseConfig, icon: Home };
  };

  const getPeopleConfig = () => ({
    id: 'people',
    label: character.age < 13 ? 'Family' : 'People',
    icon: character.age < 13 ? Heart : Users,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    available: true,
    badge: character.familyMembers?.length > 0 ? {
      count: character.familyMembers.length,
      type: 'social' as const
    } : undefined,
    onClick: onShowRelationshipsMenu
  });

  const getWorldConfig = () => ({
    id: 'world',
    label: character.age < 16 ? 'Goals' : character.age < 25 ? 'Career' : 'Empire',
    icon: character.age < 16 ? Trophy : character.wealth > 100000 ? Building2 : Globe,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    available: character.age >= 12,
    badge: character.wealth > 10000 ? {
      type: 'achievement' as const
    } : undefined,
    onClick: onShowAssetsMenu
  });

  const getActionsConfig = () => ({
    id: 'actions',
    label: 'Do',
    icon: Zap,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    available: true,
    onClick: onShowActivityMenu
  });

  // Quick actions based on character state and priorities
  const getQuickActions = (): QuickAction[] => {
    const actions: QuickAction[] = [];

    // Age-appropriate quick actions
    if (character.age < 18 && character.currentEducation) {
      actions.push({
        id: 'study',
        label: 'Study',
        icon: GraduationCap,
        priority: 'high',
        onClick: () => onShowActivityMenu()
      });
    }

    if (character.age >= 16 && !character.job) {
      actions.push({
        id: 'job_search',
        label: 'Find Job',
        icon: Briefcase,
        priority: 'high',
        onClick: () => onShowActivityMenu()
      });
    }

    if (character.relationships < 50) {
      actions.push({
        id: 'socialize',
        label: 'Socialize',
        icon: Users,
        priority: 'medium',
        onClick: onShowRelationshipsMenu
      });
    }

    return actions.slice(0, 3); // Limit to 3 quick actions
  };

  const tabs: NavigationTab[] = [
    getLifeHubConfig(),
    getPeopleConfig(),
    getWorldConfig(),
    getActionsConfig()
  ].filter(tab => tab.available);

  const quickActions = getQuickActions();

  return { tabs, quickActions };
};
