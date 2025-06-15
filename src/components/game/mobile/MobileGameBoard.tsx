
import React from 'react';
import { Character, GameState } from '../../../types/game';
import { EventOverlay } from '../../EventOverlay';
import { MobileGameRouter } from './MobileGameRouter';

interface MobileGameBoardProps {
  gameState: GameState;
  character: Character;
  ageHistory: Record<number, string[]>;
  showActivitiesMenu: boolean;
  showRelationshipsMenu: boolean;
  showAssetsMenu: boolean;
  showEventOverlay: boolean;
  onAgeUp: () => void;
  onActivity: (activityId: string, activityData?: any) => void;
  onChoice: (choiceId: string) => void;
  onCloseActivitiesMenu: () => void;
  onCloseRelationshipsMenu: () => void;
  onCloseAssetsMenu: () => void;
  onCloseEventOverlay: () => void;
  onActivityComplete: () => void;
  onGameStateChange: (newState: GameState) => void;
}

export const MobileGameBoard: React.FC<MobileGameBoardProps> = ({
  gameState,
  character,
  ageHistory,
  showEventOverlay,
  onAgeUp,
  onActivity,
  onChoice,
  onCloseEventOverlay,
  onActivityComplete,
  onGameStateChange
}) => {
  const handleCharacterUpdate = (updatedCharacter: Character) => {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleEvent = (message: string) => {
    console.log('Event:', message);
  };

  return (
    <div className="h-screen overflow-hidden portrait:block landscape:hidden">
      {/* Landscape orientation warning */}
      <div className="landscape:flex landscape:items-center landscape:justify-center landscape:h-screen landscape:bg-black">
        <div className="landscape:text-white landscape:text-center landscape:p-8">
          <div className="landscape:text-6xl landscape:mb-4">📱</div>
          <div className="landscape:text-2xl landscape:font-bold landscape:mb-2">Portrait Mode Only</div>
          <div className="landscape:text-lg landscape:opacity-80">Please rotate your device to continue playing</div>
        </div>
      </div>
      
      {/* Portrait mode content */}
      <div className="portrait:block landscape:hidden h-full">
        <MobileGameRouter
          character={character}
          gameState={gameState}
          ageHistory={ageHistory}
          onAgeUp={onAgeUp}
          onActivity={onActivity}
          onCharacterUpdate={handleCharacterUpdate}
          onEvent={handleEvent}
          onActivityComplete={onActivityComplete}
        />

        {/* Event Overlay */}
        {showEventOverlay && gameState.currentEvent && (
          <EventOverlay
            event={gameState.currentEvent}
            onChoice={onChoice}
            onClose={onCloseEventOverlay}
          />
        )}
      </div>
    </div>
  );
};
