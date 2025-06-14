
import React from 'react';
import { Character } from '../../../types/game';
import { Home, Users, Globe, Zap, Plus } from 'lucide-react';

interface FluidNavigationBarProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const FluidNavigationBar: React.FC<FluidNavigationBarProps> = ({
  activeTab,
  onTabChange,
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills
}) => {
  const tabs = [
    {
      id: 'life',
      label: 'Life',
      icon: Home,
      onClick: () => onTabChange('life')
    },
    {
      id: 'people',
      label: 'People',
      icon: Users,
      onClick: onShowRelationshipsMenu
    },
    {
      id: 'world',
      label: 'World',
      icon: Globe,
      onClick: onShowAssetsMenu
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: Zap,
      onClick: onShowActivityMenu
    }
  ];

  return (
    <>
      {/* Age up floating button */}
      <button
        onClick={onAgeUp}
        className="fixed bottom-32 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
      >
        <Plus size={24} className="text-white" strokeWidth={2.5} />
        <div className="absolute -top-2 -left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-xl border border-white/20">
          {character.age}
        </div>
      </button>

      {/* Main navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-black/40 backdrop-blur-2xl border-t border-white/10">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex items-center justify-center px-6 py-4 pb-8">
            <div className="flex items-center justify-between w-full max-w-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = (activeTab === 'life' && tab.id === 'life') || 
                                (activeTab === 'relationships' && tab.id === 'people') ||
                                (activeTab === 'assets' && tab.id === 'world') ||
                                (activeTab === 'activities' && tab.id === 'actions');

                return (
                  <button
                    key={tab.id}
                    onClick={tab.onClick}
                    className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white/15 backdrop-blur-sm border border-white/20 shadow-xl'
                        : 'hover:bg-white/5 active:scale-95'
                    }`}
                  >
                    <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                        : 'bg-transparent'
                    }`}>
                      <Icon 
                        size={20} 
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                      isActive ? 'text-white/90' : 'text-white/50'
                    }`}>
                      {tab.label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-1 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* iOS home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};
