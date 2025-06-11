
import React, { useState } from 'react';
import { GameState } from '../types/game';
import { GameOverScreen } from './GameOverScreen';
import { MobileGameBoard } from './game/MobileGameBoard';
import { DesktopGameBoard } from './game/DesktopGameBoard';
import { useGameLogic } from '../hooks/useGameLogic';
import { useIsMobile } from '../hooks/use-mobile';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onOpenSettings?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange, onOpenSettings }) => {
  const isMobile = useIsMobile();
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);
  const [showRelationshipsMenu, setShowRelationshipsMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const {
    ageHistory,
    showEventOverlay,
    setShowEventOverlay,
    ageUp,
    handleChoice,
    handleCharacterUpdate,
    handleEvent,
    handleActivity,
    handleCareerAction,
    handleEducationAction,
    handleHealthAction,
    handleLifestyleAction,
    handleRelationshipAction
  } = useGameLogic({ gameState, onGameStateChange });

  if (gameState.gameOver) {
    return <GameOverScreen 
      character={gameState.character} 
      reason={gameState.gameOverReason}
      onRestart={() => {
        const newGameState: GameState = {
          character: {
            ...gameState.character,
            education: {
              currentStage: null,
              currentSchool: null,
              currentYear: 0,
              gpa: 0,
              grades: [],
              completedStages: [],
              major: undefined,
              testScores: [],
              disciplinaryActions: 0,
              achievements: [],
              dropouts: 0,
              levels: []
            }
          },
          currentEvent: null,
          gameStarted: false,
          gameOver: false,
          eventHistory: [],
          achievements: [],
          eventTracker: {
            triggeredEvents: new Set(),
            lastEventAge: 0,
            eventCooldowns: new Map(),
            choiceHistory: []
          }
        };
        onGameStateChange(newGameState);
      }}
    />;
  }

  const commonProps = {
    gameState,
    character: gameState.character,
    ageHistory,
    showActivitiesMenu,
    showRelationshipsMenu,
    showAssetsMenu,
    showActivityModal,
    showEventOverlay,
    selectedActivity,
    onAgeUp: ageUp,
    onChoice: handleChoice,
    onActivity: handleActivity,
    onGameStateChange,
    onCharacterUpdate: handleCharacterUpdate,
    onEvent: handleEvent,
    onCareerAction: handleCareerAction,
    onEducationAction: handleEducationAction,
    onHealthAction: handleHealthAction,
    onLifestyleAction: handleLifestyleAction,
    onRelationshipAction: handleRelationshipAction,
    onCloseActivitiesMenu: () => setShowActivitiesMenu(false),
    onCloseRelationshipsMenu: () => setShowRelationshipsMenu(false),
    onCloseAssetsMenu: () => setShowAssetsMenu(false),
    onCloseActivityModal: () => {
      setShowActivityModal(false);
      setSelectedActivity(null);
    },
    onCloseEventOverlay: () => setShowEventOverlay(false),
    onActivityComplete: () => {
      setShowActivitiesMenu(false);
    }
  };

  if (isMobile) {
    return <MobileGameBoard {...commonProps} />;
  }

  return <DesktopGameBoard {...commonProps} onOpenSettings={onOpenSettings} />;
};
