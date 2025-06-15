
import React, { useState } from 'react';
import { Character, GameState } from '../../../types/game';
import { LifePage } from './pages/LifePage';
import { PeoplePage } from './pages/PeoplePage';
import { WorldPage } from './pages/WorldPage';
import { ActionsPage } from './pages/ActionsPage';
import { MobileNavigation } from './MobileNavigation';

interface MobileGameRouterProps {
  character: Character;
  gameState: GameState;
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  onActivity: (activityType: string, activityId: string | object) => void;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onActivityComplete?: () => void;
}

export const MobileGameRouter: React.FC<MobileGameRouterProps> = ({
  character,
  gameState,
  ageHistory,
  onAgeUp,
  onActivity,
  onCharacterUpdate,
  onEvent,
  onActivityComplete
}) => {
  const [currentPage, setCurrentPage] = useState<'life' | 'people' | 'world' | 'actions'>('life');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'life':
        return (
          <LifePage
            character={character}
            ageHistory={ageHistory}
            onAgeUp={onAgeUp}
          />
        );
      case 'people':
        return (
          <PeoplePage
            character={character}
            gameState={gameState}
            onCharacterUpdate={onCharacterUpdate}
            onEvent={onEvent}
            onClose={() => setCurrentPage('life')}
          />
        );
      case 'world':
        return (
          <WorldPage
            character={character}
            onClose={() => setCurrentPage('life')}
          />
        );
      case 'actions':
        return (
          <ActionsPage
            character={character}
            onActivity={onActivity}
            onClose={() => setCurrentPage('life')}
            onActivityComplete={onActivityComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Current Page Content */}
      <div className="flex-1 overflow-hidden">
        {renderCurrentPage()}
      </div>

      {/* Bottom Navigation */}
      <MobileNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        character={character}
      />
    </div>
  );
};
