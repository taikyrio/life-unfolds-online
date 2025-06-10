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
      <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
        {/* BitLife-style Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
              {gameState.character.age === 0 ? '👶' : gameState.character.age < 5 ? '🧒' : gameState.character.age < 13 ? '👦' : gameState.character.age < 18 ? '🧑' : '👤'}
            </div>
            <div>
              <div className="font-bold text-lg">{gameState.character.name}</div>
              <div className="text-sm opacity-90">
                {gameState.character.age === 0 ? 'Infant' : gameState.character.age < 5 ? 'Toddler' : gameState.character.age < 13 ? 'Child' : gameState.character.age < 18 ? 'Teenager' : 'Adult'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl">${gameState.character.wealth}k</div>
            <div className="text-xs opacity-75">Net Worth</div>
          </div>
        </div>

        {/* Stats Bar - Mobile Optimized */}
        <div className="bg-gray-50 p-3">
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: 'Health', value: Math.round(gameState.character.health), icon: '❤️', color: 'text-red-600' },
              { label: 'Happy', value: Math.round(gameState.character.happiness), icon: '😊', color: 'text-yellow-600' },
              { label: 'Social', value: Math.round(gameState.character.relationships || 0), icon: '🤝', color: 'text-purple-600' },
              { label: 'Smarts', value: Math.round(gameState.character.smarts), icon: '🧠', color: 'text-blue-600' },
              { label: 'Looks', value: Math.round(gameState.character.looks), icon: '✨', color: 'text-pink-600' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg mb-1">{stat.icon}</div>
                <div className="text-xs font-medium text-gray-600 mb-1">{stat.label}</div>
                <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Fixed Height */}
        <div className="flex-1 bg-white overflow-hidden">
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

        {/* Bottom Navigation - BitLife Style */}
        <div className="bg-gray-100 border-t border-gray-200">
          <div className="grid grid-cols-4 h-16">
            {[
              { id: 'life', icon: '🏠', label: 'Life' },
              { id: 'activities', icon: '🎯', label: 'Activities' },
              { id: 'careers', icon: '💼', label: 'Career' },
              { id: 'relationships', icon: '💕', label: 'Love' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center h-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Age Up Button - Floating */}
        <button
          onClick={ageUp}
          className="fixed bottom-20 right-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-50"
        >
          +
        </button>

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
