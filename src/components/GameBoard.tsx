import React, { useState, useEffect } from 'react';
import { Character, GameState } from '../types/game';
import { CharacterStats } from './CharacterStats';
import { ActivitiesTab } from './ActivitiesTab';
import { RelationshipsTab } from './RelationshipsTab';
import { AssetsTab } from './AssetsTab';
import { GameOverScreen } from './GameOverScreen';
import { ActivitiesMenu } from './menus/ActivitiesMenu';
import { RelationshipsMenu } from './menus/RelationshipsMenu';
import { AssetsMenu } from './menus/AssetsMenu';
import ActivityModal from './modals/ActivityModal';
import { useToast } from '@/hooks/use-toast';
import { EducationTab } from './tabs/EducationTab';
import { CareersTab } from './tabs/CareersTab';
import { HealthTab } from './tabs/HealthTab';
import { LifestyleTab } from './tabs/LifestyleTab';
import { MoneyTab } from './tabs/MoneyTab';
import { LifeTab } from './LifeTab';
import { EventOverlay } from './EventOverlay';
import { processAgeUp, processChoice } from './game/GameLogic';
import { handleActivityAction } from './handlers/ActivityActionHandler';
import { handleCareerAction } from './handlers/CareerActionHandler';
import { handleRelationshipAction } from './handlers/RelationshipActionHandler';
import { handleEducationAction } from './handlers/EducationActionHandler';
import { handleAgeUp, handleDeath, handleEmigrate, handleSurrender, handleHealthAction, handleLifestyleAction, handleMoneyAction } from './handlers/GameStateActionHandlers';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange }) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education' | 'health' | 'lifestyle' | 'money'>('life');
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);
  const [showRelationshipsMenu, setShowRelationshipsMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const [showEventOverlay, setShowEventOverlay] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!gameState.gameStarted) {
      onGameStateChange({
        ...gameState,
        gameStarted: true,
        character: gameState.character,
        eventTracker: {
          triggeredEvents: new Set(),
          lastEventAge: 0,
          eventCooldowns: new Map(),
          choiceHistory: []
        }
      });
    }
  }, [gameState, onGameStateChange]);

  useEffect(() => {
    setShowEventOverlay(!!gameState.currentEvent);
  }, [gameState.currentEvent]);

  const ageUp = () => {
    processAgeUp(gameState, ageHistory || {}, setAgeHistory, onGameStateChange, toast);
  };

  const handleChoice = (choiceId: string) => {
    processChoice(gameState, choiceId, ageHistory, setAgeHistory, onGameStateChange);
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleEvent = (message: string) => {
    toast({
      title: "Event",
      description: message,
    });
  };

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
              major: null,
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

  const handleCriminalOperation = (operation: any) => {
    console.log('Criminal operation:', operation);
    toast({
      title: "Criminal Operation",
      description: "Criminal activities are not yet implemented",
    });
  };

  const handleCybercrime = (crime: any) => {
    console.log('Cybercrime:', crime);
    toast({
      title: "Cybercrime",
      description: "Cybercrime activities are not yet implemented",
    });
  };

  const handleMurder = (target: any) => {
    console.log('Murder target:', target);
    toast({
      title: "Murder",
      description: "Murder activities are not yet implemented",
    });
  };

  const handleActivity = (activityId: string, activityData?: any) => {
    if (activityData && activityData.type) {
      if (activityData.type === 'criminal_operation') {
        handleCriminalOperation(activityData);
        return;
      } else if (activityData.type === 'cybercrime') {
        handleCybercrime(activityData);
        return;
      } else if (activityData.type === 'murder') {
        handleMurder(activityData);
        return;
      }
    }

    handleActivityAction(
      gameState.character,
      activityId,
      activityData,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
    );
  };

  useEffect(() => {
    if (!gameState.character.education) {
      const updatedCharacter = {
        ...gameState.character,
        education: {
          currentStage: null,
          currentSchool: null,
          currentYear: 0,
          gpa: 0,
          completedStages: [],
          major: null,
          testScores: [],
          disciplinaryActions: 0,
          achievements: [],
          dropouts: 0,
          levels: []
        }
      };

      onGameStateChange({
        ...gameState,
        character: updatedCharacter
      });
    }
  }, [gameState.character, onGameStateChange]);

  useEffect(() => {
    if (!gameState.character.education) return;

    const autoEnrollAge = (age: number) => {
      if (!gameState.character.education || !Array.isArray(gameState.character.education.completedStages)) {
        return;
      }

      if (age >= 6 && age <= 11 && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('elementary')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'elementary', schoolId: 'public_elementary' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
      else if (age >= 12 && age <= 14 && gameState.character.education.completedStages.includes('elementary') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('middle')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'middle', schoolId: 'public_middle' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
      else if (age >= 15 && age <= 17 && gameState.character.education.completedStages.includes('middle') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('high')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'high', schoolId: 'public_high' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
    };

    autoEnrollAge(gameState.character.age);
  }, [gameState.character.age, gameState.character.education?.currentStage, gameState.character.education?.completedStages]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Header - Mobile Optimized */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/20 px-3 py-2 safe-area-pt">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
                {gameState.character.name}
              </h1>
              <p className="text-xs text-gray-500">Age {gameState.character.age}</p>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur px-2 py-1 rounded-lg">
            <div className="text-sm font-bold text-green-600 dark:text-green-400">
              ${Math.round(gameState.character.wealth)}k
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Compact Mobile */}
      <div className="flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/10 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { label: 'Health', value: Math.round(gameState.character.health), icon: '❤️', color: 'text-red-500' },
            { label: 'Happy', value: Math.round(gameState.character.happiness), icon: '😊', color: 'text-yellow-500' },
            { label: 'Social', value: Math.round(gameState.character.relationships || 0), icon: '🤝', color: 'text-purple-500' },
            { label: 'Smarts', value: Math.round(gameState.character.smarts), icon: '🧠', color: 'text-blue-500' },
            { label: 'Looks', value: Math.round(gameState.character.looks), icon: '✨', color: 'text-indigo-500' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-sm">{stat.icon}</div>
              <div className={`text-xs font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Icon Only for Mobile */}
      <div className="flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/10 px-1 py-1">
        <div className="flex justify-between items-center overflow-x-auto">
          {[
            { id: 'life', icon: '🏠', label: 'Life' },
            { id: 'activities', icon: '🎯', label: 'Activities' },
            { id: 'careers', icon: '💼', label: 'Careers' },
            { id: 'education', icon: '📚', label: 'Education' },
            { id: 'health', icon: '❤️', label: 'Health' },
            { id: 'money', icon: '💰', label: 'Money' },
            { id: 'relationships', icon: '💕', label: 'Relationships' },
            { id: 'assets', icon: '🏆', label: 'Assets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center min-w-[44px] ${
                activeTab === tab.id
                  ? 'bg-white/90 dark:bg-slate-800/90 shadow-md scale-105'
                  : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{tab.icon}</span>
              {!isMobile && (
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                  {tab.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Full Height with Proper Mobile Spacing */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pb-16">
          {activeTab === 'life' && (
            <LifeTab 
              character={gameState.character}
              eventHistory={gameState.eventHistory}
              currentEvent={gameState.currentEvent}
              onAgeUp={ageUp}
              onChoice={handleChoice}
              ageHistory={ageHistory}
            />
          )}
          {activeTab === 'activities' && (
            <ActivitiesTab 
              character={gameState.character} 
              onActivity={handleActivity}
            />
          )}
          {activeTab === 'relationships' && (
            <RelationshipsTab 
              character={gameState.character} 
              onCharacterUpdate={(updatedCharacter) => {
                onGameStateChange({
                  ...gameState,
                  character: updatedCharacter
                });
              }}
              onEvent={(message) => {
                toast({
                  title: "Relationship Update",
                  description: message,
                });
              }}
            />
          )}
          {activeTab === 'careers' && (
            <CareersTab 
              character={gameState.character}
              onCareerAction={(action, data) => handleCareerAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
            />
          )}
          {activeTab === 'education' && (
            <EducationTab 
              character={gameState.character}
              onEducationAction={(action, data) => handleEducationAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
            />
          )}
          {activeTab === 'health' && (
            <HealthTab 
              character={gameState.character}
              onHealthAction={(action, data) => handleHealthAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
            />
          )}
          {activeTab === 'lifestyle' && (
            <LifestyleTab 
              character={gameState.character}
              onLifestyleAction={(action, data) => handleLifestyleAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
            />
          )}
          {activeTab === 'money' && (
            <MoneyTab 
              character={gameState.character}
              onCharacterUpdate={handleCharacterUpdate}
              onEvent={handleEvent}
            />
          )}
          {activeTab === 'assets' && (
            <AssetsTab character={gameState.character} />
          )}
        </div>
      </div>

      {/* Floating Age Up Button - Mobile Optimized */}
      <button
        onClick={ageUp}
        className={`fixed ${isMobile ? 'bottom-4 right-4 w-14 h-14' : 'bottom-6 right-6 w-16 h-16'} bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 z-50 safe-area-mb`}
        style={{ 
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)' 
        }}
      >
        <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>+</span>
      </button>

      {/* Modals and Overlays */}
      {showActivitiesMenu && (
        <ActivitiesMenu
          isOpen={showActivitiesMenu}
          character={gameState.character}
          onClose={() => setShowActivitiesMenu(false)}
          onActivity={handleActivity}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          isOpen={showRelationshipsMenu}
          character={gameState.character}
          onClose={() => setShowRelationshipsMenu(false)}
          onActivity={(action, data) => handleRelationshipAction(gameState.character, action, ageHistory, setAgeHistory, onGameStateChange, gameState, toast, data)}
        />
      )}

      {showAssetsMenu && (
        <AssetsMenu
          isOpen={showAssetsMenu}
          character={gameState.character}
          onClose={() => setShowAssetsMenu(false)}
        />
      )}

      {showActivityModal && selectedActivity && (
        <ActivityModal
          character={gameState.character}
          onClose={() => {
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
          onSelectActivity={(activity) => {
            handleActivityAction(gameState.character, activity.id, activity, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
        />
      )}

      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={gameState.currentEvent}
          onChoice={handleChoice}
          onClose={() => {
            setShowEventOverlay(false);
            onGameStateChange({
              ...gameState,
              currentEvent: null
            });
          }}
          characterName={gameState.character.name}
          characterAge={gameState.character.age}
        />
      )}
    </div>
  );
};
