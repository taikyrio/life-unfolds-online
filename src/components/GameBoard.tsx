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
import { useIsMobile } from '../hooks/use-mobile';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onOpenSettings?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange, onOpenSettings }) => {
  const isMobile = useIsMobile();
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

  if (isMobile) {
    return (
      <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
        {/* InstLife-style Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-center p-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'life', icon: '🏠', label: 'Life' },
                { id: 'activities', icon: '🎯', label: 'Activities' },
                { id: 'careers', icon: '💼', label: 'Career' },
                { id: 'relationships', icon: '❤️', label: 'Love' },
                { id: 'education', icon: '🎓', label: 'School' },
                { id: 'money', icon: '💰', label: 'Money' },
                { id: 'assets', icon: '🏠', label: 'Assets' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-white text-gray-900 shadow-sm font-medium' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-xs mt-1">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
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

        {/* InstLife-style Bottom Action Bar */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-center p-4">
            <button
              onClick={ageUp}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 shadow-md"
            >
              <span className="text-xl">🎂</span>
              <span>Age Up!</span>
            </button>
          </div>
        </div>

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
