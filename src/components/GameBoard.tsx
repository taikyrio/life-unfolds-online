
import React, { useState } from 'react';
import { GameState } from '../types/game';
import { GameOverScreen } from './GameOverScreen';
import { GameHeader } from './ui/GameHeader';
import { StatsBar } from './ui/StatsBar';
import { TabNavigation } from './ui/TabNavigation';
import { TabContent } from './ui/TabContent';
import { AgeUpButton } from './ui/AgeUpButton';
import { GameModals } from './ui/GameModals';
import { useGameLogic } from '../hooks/useGameLogic';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onOpenSettings?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange, onOpenSettings }) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education' | 'health' | 'lifestyle' | 'money'>('life');
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

  return (
    <div className="game-container h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <GameHeader character={gameState.character} onOpenSettings={onOpenSettings} />
      <StatsBar character={gameState.character} />
      <TabNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      <div className="game-content flex-1 overflow-y-auto">
        <TabContent
          activeTab={activeTab}
          character={gameState.character}
          gameState={gameState}
          eventHistory={gameState.eventHistory}
          ageHistory={ageHistory}
          onAgeUp={ageUp}
          onChoice={handleChoice}
          onActivity={handleActivity}
          onGameStateChange={onGameStateChange}
          onCharacterUpdate={handleCharacterUpdate}
          onEvent={handleEvent}
          onCareerAction={handleCareerAction}
          onEducationAction={handleEducationAction}
          onHealthAction={handleHealthAction}
          onLifestyleAction={handleLifestyleAction}
        />
      </div>

      <AgeUpButton onAgeUp={ageUp} />

      <GameModals
        gameState={gameState}
        showActivitiesMenu={showActivitiesMenu}
        showRelationshipsMenu={showRelationshipsMenu}
        showAssetsMenu={showAssetsMenu}
        showActivityModal={showActivityModal}
        showEventOverlay={showEventOverlay}
        selectedActivity={selectedActivity}
        onCloseActivitiesMenu={() => setShowActivitiesMenu(false)}
        onActivityComplete={() => {
          setShowActivitiesMenu(false);
          setActiveTab('life');
        }}
        onCloseRelationshipsMenu={() => setShowRelationshipsMenu(false)}
        onCloseAssetsMenu={() => setShowAssetsMenu(false)}
        onCloseActivityModal={() => {
          setShowActivityModal(false);
          setSelectedActivity(null);
        }}
        onCloseEventOverlay={() => setShowEventOverlay(false)}
        onActivity={handleActivity}
        onRelationshipAction={handleRelationshipAction}
        onChoice={handleChoice}
        onGameStateChange={onGameStateChange}
      />
    </div>
  );
};
