
import React from 'react';
import { Character } from '../types/game';
import { ActivitiesTabContainer } from './activities/ActivitiesTabContainer';
import { EnhancedActivitiesGrid } from './activities/EnhancedActivitiesGrid';
import { useIsMobile } from '../hooks/use-mobile';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
        {/* Enhanced iOS 16 + Windows 11 Header */}
        <div className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10 p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Life Activities</h1>
            <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">Choose your path to growth and happiness</p>
            
            {/* Character Stats */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-2xl border border-slate-700/50">
                <span className="text-lg">👤</span>
                <span className="text-white font-medium text-sm">Age {character.age}</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-2xl border border-slate-700/50">
                <span className="text-lg">💰</span>
                <span className="text-white font-medium text-sm">${character.wealth.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Activities Grid */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto mobile-scroll">
          <EnhancedActivitiesGrid character={character} onActivity={onActivity} />
        </div>
      </div>
    );
  }

  return (
    <ActivitiesTabContainer 
      character={character}
      onActivity={onActivity}
    />
  );
};
