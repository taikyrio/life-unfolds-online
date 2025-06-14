
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
      <div className="h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-4xl mb-2">🎯</div>
            <h1 className="text-2xl font-bold mb-2">Life Activities</h1>
            <p className="text-blue-100 mb-4">Choose your path to growth and happiness</p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>👤</span>
                <span>Age {character.age}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span>💰</span>
                <span>${character.wealth}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Activities Grid - Scrollable */}
        <div className="flex-1 p-4 overflow-y-auto">
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
