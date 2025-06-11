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
      <div className="h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col overflow-hidden">
        {/* InstLife-style Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                {gameState.character.age === 0 ? '👶' : gameState.character.age < 5 ? '🧒' : gameState.character.age < 13 ? '👦' : gameState.character.age < 18 ? '🧑' : '👤'}
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">{gameState.character.name}</div>
                <div className="text-sm text-gray-500">
                  {gameState.character.age === 0 ? 'Infant' : gameState.character.age < 5 ? 'Toddler' : gameState.character.age < 13 ? 'Child' : gameState.character.age < 18 ? 'Teenager' : 'Adult'} • Age {gameState.character.age}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-green-600">${gameState.character.wealth}k</div>
              <div className="text-xs text-gray-500">Net Worth</div>
            </div>
          </div>
        </div>

        {/* InstLife-style Stats */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Happiness', value: Math.round(gameState.character.happiness), color: 'bg-gradient-to-br from-yellow-400 to-orange-400', icon: '😊' },
              { label: 'Health', value: Math.round(gameState.character.health), color: 'bg-gradient-to-br from-red-400 to-pink-400', icon: '❤️' },
              { label: 'Smarts', value: Math.round(gameState.character.smarts), color: 'bg-gradient-to-br from-blue-400 to-indigo-400', icon: '🧠' },
              { label: 'Looks', value: Math.round(gameState.character.looks), color: 'bg-gradient-to-br from-purple-400 to-pink-400', icon: '✨' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-lg mx-auto mb-2 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-xs font-medium text-gray-600 mb-1">{stat.label}</div>
                <div className="text-sm font-bold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
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

        {/* InstLife-style Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-5 h-20">
            {[
              { id: 'life', icon: '🏠', label: 'Life' },
              { id: 'activities', icon: '🎯', label: 'Activities' },
              { id: 'careers', icon: '💼', label: 'Career' },
              { id: 'relationships', icon: '💕', label: 'Love' },
              { id: 'age', icon: '+', label: 'Age Up', special: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.special ? ageUp() : setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center h-full transition-all duration-200 ${
                  tab.special 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                    : activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`${tab.special ? 'text-2xl font-bold' : 'text-xl'} mb-1`}>
                  {tab.icon}
                </span>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
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
