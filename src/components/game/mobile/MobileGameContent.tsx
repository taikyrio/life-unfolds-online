
import React from 'react';
import { Character } from '../../../types/game';
import { LifeTab } from '../../LifeTab';
import { ActivitiesTab } from '../../ActivitiesTab';

interface MobileGameContentProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  character: Character;
  eventHistory: string[];
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  handleActivity: (activityType: string, activityId: string) => void;
}

export const MobileGameContent: React.FC<MobileGameContentProps> = ({
  activeTab,
  character,
  eventHistory,
  ageHistory,
  onAgeUp,
  handleActivity
}) => {
  return (
    <div className="flex-1 overflow-y-auto mobile-scroll">
      {activeTab === 'life' && (
        <LifeTab
          character={character}
          eventHistory={eventHistory}
          ageHistory={ageHistory}
          onAgeUp={onAgeUp}
        />
      )}
      {activeTab === 'activities' && (
        <ActivitiesTab
          character={character}
          onActivity={handleActivity}
        />
      )}
    </div>
  );
};
