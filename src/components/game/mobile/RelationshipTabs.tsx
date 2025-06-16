
import React from 'react';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '../../../types/game';
import { Users, Heart, Briefcase, Home, UserPlus } from 'lucide-react';

interface RelationshipTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  relationships: FamilyMember[];
}

export const RelationshipTabs: React.FC<RelationshipTabsProps> = ({
  activeTab,
  onTabChange,
  relationships
}) => {
  const tabs = [
    {
      id: 'all',
      label: 'All',
      icon: Users,
      count: relationships.length,
      filter: () => true
    },
    {
      id: 'family',
      label: 'Family',
      icon: Home,
      count: relationships.filter(r => ['father', 'mother', 'sibling', 'child', 'spouse', 'grandparent', 'cousin'].includes(r.relationship)).length,
      filter: (r: FamilyMember) => ['father', 'mother', 'sibling', 'child', 'spouse', 'grandparent', 'cousin'].includes(r.relationship)
    },
    {
      id: 'romance',
      label: 'Romance',
      icon: Heart,
      count: relationships.filter(r => ['spouse', 'lover', 'ex'].includes(r.relationship)).length,
      filter: (r: FamilyMember) => ['spouse', 'lover', 'ex'].includes(r.relationship)
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: UserPlus,
      count: relationships.filter(r => ['friend', 'bestfriend', 'acquaintance'].includes(r.relationship)).length,
      filter: (r: FamilyMember) => ['friend', 'bestfriend', 'acquaintance'].includes(r.relationship)
    },
    {
      id: 'work',
      label: 'Work',
      icon: Briefcase,
      count: relationships.filter(r => ['coworker', 'boss', 'employee'].includes(r.relationship)).length,
      filter: (r: FamilyMember) => ['coworker', 'boss', 'employee'].includes(r.relationship)
    }
  ];

  return (
    <div className="flex space-x-1 mb-4 bg-black/20 backdrop-blur-xl rounded-xl p-1 border border-white/10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant="ghost"
            className={`flex-1 text-xs py-2 px-3 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-white/20' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                isActive ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};
