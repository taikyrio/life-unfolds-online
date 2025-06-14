
import React, { useState } from 'react';
import { Character, GameState, LifeEvent } from '../../types/game';
import { EventOverlay } from '../EventOverlay';
import { MobileGameContent } from './mobile/MobileGameContent';
import { MobileBottomSheets } from './mobile/MobileBottomSheets';
import useGameLogic from '../../hooks/useGameLogic';

interface MobileGameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  eventHistory?: string[];
  ageHistory?: Record<number, string[]>;
}

export const MobileGameBoard: React.FC<MobileGameBoardProps> = ({
  gameState,
  onGameStateChange,
  eventHistory = [],
  ageHistory = {}
}) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education'>('life');
  const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);

  const {
    ageHistory: updatedAgeHistory,
    showEventOverlay,
    setShowEventOverlay,
    ageUp,
    handleChoice,
    handleActivity,
    handleCharacterUpdate,
    handleEvent
  } = useGameLogic({ gameState, onGameStateChange });

  const handleShowActivityMenu = () => setActiveBottomSheet('activities');
  const handleShowRelationshipsMenu = () => setActiveBottomSheet('relationships');
  const handleShowAssetsMenu = () => setActiveBottomSheet('assets');
  const handleShowPersonalitySkills = () => setActiveBottomSheet('personality-skills');
  const handleCloseBottomSheet = () => setActiveBottomSheet(null);

  // Wrapper function to handle the activity signature mismatch
  const handleActivityWrapper = (activity: any) => {
    if (typeof activity === 'string') {
      handleActivity(activity, '');
    } else if (activity && typeof activity === 'object') {
      handleActivity(activity.type || 'unknown', activity.id || '');
    } else {
      handleActivity('unknown', '');
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Main Content */}
      <MobileGameContent
        activeTab={activeTab}
        character={gameState.character}
        eventHistory={eventHistory}
        ageHistory={updatedAgeHistory}
        onAgeUp={ageUp}
        handleActivity={handleActivityWrapper}
        onTabChange={setActiveTab}
        onShowActivityMenu={handleShowActivityMenu}
        onShowRelationshipsMenu={handleShowRelationshipsMenu}
        onShowAssetsMenu={handleShowAssetsMenu}
        onShowPersonalitySkills={handleShowPersonalitySkills}
      />

      {/* Bottom Sheets */}
      <MobileBottomSheets
        activeBottomSheet={activeBottomSheet}
        onClose={handleCloseBottomSheet}
        gameState={gameState}
        handleActivity={handleActivity}
        handleCharacterUpdate={handleCharacterUpdate}
        handleEvent={handleEvent}
      />

      {/* Event Overlay */}
      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={gameState.currentEvent}
          onChoice={handleChoice}
          onClose={() => setShowEventOverlay(false)}
          characterName={gameState.character.name}
          characterAge={gameState.character.age}
        />
      )}
    </div>
  );
};
