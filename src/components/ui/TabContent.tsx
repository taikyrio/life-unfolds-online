import React from 'react';
import { Character, GameState } from '../../types/game';
import { LifeTab } from '../LifeTab';
import { ActivitiesTab } from '../ActivitiesTab';
import { RelationshipsTab } from '../RelationshipsTab';
import { CareersTab } from '../tabs/CareersTab';
import { EducationTab } from '../tabs/EducationTab';
import { HealthTab } from '../tabs/HealthTab';
import { LifestyleTab } from '../tabs/LifestyleTab';
import { MoneyTab } from '../tabs/MoneyTab';
import { AssetsTab } from '../AssetsTab';

interface TabContentProps {
  activeTab: string;
  character: Character;
  gameState: GameState;
  eventHistory: string[];
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  onChoice: (choiceId: string) => void;
  onActivity: (activityId: string, activityData?: any) => void;
  onGameStateChange: (newState: GameState) => void;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onCareerAction: (action: string, data?: any) => void;
  onEducationAction: (action: string, data?: any) => void;
  onHealthAction: (action: string, data?: any) => void;
  onLifestyleAction: (action: string, data?: any) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  character,
  gameState,
  eventHistory,
  ageHistory,
  onAgeUp,
  onChoice,
  onActivity,
  onGameStateChange,
  onCharacterUpdate,
  onEvent,
  onCareerAction,
  onEducationAction,
  onHealthAction,
  onLifestyleAction
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'life':
        return (
          <LifeTab 
            character={character}
            eventHistory={eventHistory}
            onAgeUp={onAgeUp}
            onChoice={onChoice}
            ageHistory={ageHistory}
          />
        );
      case 'activities':
        return (
          <ActivitiesTab 
            character={character} 
            onActivity={onActivity}
          />
        );
      case 'relationships':
        return (
          <RelationshipsTab 
            character={character} 
            onCharacterUpdate={(updatedCharacter) => {
              onGameStateChange({
                ...gameState,
                character: updatedCharacter
              });
            }}
            onEvent={onEvent}
          />
        );
      case 'careers':
        return (
          <CareersTab 
            character={character}
            onCareerAction={onCareerAction}
          />
        );
      case 'education':
        return (
          <EducationTab 
            character={character}
            onEducationAction={onEducationAction}
          />
        );
      case 'health':
        return (
          <HealthTab 
            character={character}
            onHealthAction={onHealthAction}
          />
        );
      case 'lifestyle':
        return (
          <LifestyleTab 
            character={character}
            onLifestyleAction={onLifestyleAction}
          />
        );
      case 'money':
        return (
          <MoneyTab 
            character={character}
            onCharacterUpdate={onCharacterUpdate}
            onEvent={onEvent}
          />
        );
      case 'assets':
        return (
          <AssetsTab 
            character={character}
            onCharacterUpdate={onCharacterUpdate}
            onEvent={onEvent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto pb-16">
        {renderTabContent()}
      </div>
    </div>
  );
};
