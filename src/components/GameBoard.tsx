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
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Apple-style Header */}
      <div className="apple-nav-bar safe-area-top flex-shrink-0 relative z-20">
        <div className="mobile-apple-container py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xl flex-shrink-0 apple-shadow-2 vision-float">
                👤
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="apple-title-3 text-gray-900 dark:text-white truncate">{gameState.character.name}</h1>
                <p className="apple-caption">Age {gameState.character.age}</p>
              </div>
            </div>
            <div className="apple-glass-card px-4 py-2 rounded-2xl apple-shadow-1 flex-shrink-0">
              <div className="apple-headline bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                ${gameState.character.wealth}k
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style Stats Dashboard */}
      <div className="apple-glass border-b border-white/10 flex-shrink-0 relative z-20">
        <div className="mobile-apple-container py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: 'Health', value: Math.round(gameState.character.health), icon: '❤️', color: 'from-red-400 to-red-600' },
              { label: 'Happy', value: Math.round(gameState.character.happiness), icon: '😊', color: 'from-yellow-400 to-orange-500' },
              { label: 'Social', value: Math.round(gameState.character.relationships || 0), icon: '🤝', color: 'from-purple-400 to-pink-500' },
              { label: 'Smarts', value: Math.round(gameState.character.smarts), icon: '🧠', color: 'from-blue-400 to-cyan-500' },
              { label: 'Looks', value: Math.round(gameState.character.looks), icon: '✨', color: 'from-indigo-400 to-purple-500' }
            ].map((stat) => (
              <div key={stat.label} className="apple-card-compact text-center vision-depth apple-hover">
                <div className="space-y-2">
                  <div className="text-2xl vision-float">{stat.icon}</div>
                  <div className={`apple-title-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="apple-caption font-medium truncate">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apple-style Tab Navigation */}
      <div className="apple-glass border-b border-white/10 flex-shrink-0 relative z-20">
        <div className="flex overflow-x-auto apple-scrollbar gap-2 px-4 py-3">
          {[
            { id: 'life', icon: '🏠', label: 'Life' },
            { id: 'activities', icon: '🎯', label: 'Activities' },
            { id: 'careers', icon: '💼', label: 'Career' },
            { id: 'education', icon: '📚', label: 'School' },
            { id: 'health', icon: '❤️', label: 'Health' },
            { id: 'money', icon: '💰', label: 'Money' },
            { id: 'relationships', icon: '💕', label: 'Love' },
            { id: 'assets', icon: '🏆', label: 'Assets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-shrink-0 min-w-[60px] px-4 py-3 rounded-2xl apple-press vision-depth ${
                activeTab === tab.id
                  ? 'apple-glass-card text-blue-600 dark:text-blue-400 scale-105 apple-shadow-2'
                  : 'apple-glass-subtle text-gray-600 dark:text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl vision-float">{tab.icon}</span>
                <span className="text-xs font-medium truncate leading-tight">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Apple-style Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto apple-scrollbar mobile-apple-container py-6">
          {activeTab === 'life' && (
            <div className="h-full">
              <LifeTab 
                character={gameState.character}
                eventHistory={gameState.eventHistory}
                currentEvent={gameState.currentEvent}
                onAgeUp={ageUp}
                onChoice={handleChoice}
                ageHistory={ageHistory}
              />
            </div>
          )}
          {activeTab === 'activities' && (
            <div className="h-full overflow-y-auto">
              <ActivitiesTab 
                character={gameState.character} 
                onActivity={handleActivity}
              />
            </div>
          )}
          {activeTab === 'relationships' && (
            <div className="h-full overflow-y-auto">
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
            </div>
          )}
          {activeTab === 'careers' && (
            <div className="h-full overflow-y-auto">
              <CareersTab 
                character={gameState.character}
                onCareerAction={(action, data) => handleCareerAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
              />
            </div>
          )}
          {activeTab === 'education' && (
            <div className="h-full overflow-y-auto">
              <EducationTab 
                character={gameState.character}
                onEducationAction={(action, data) => handleEducationAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
              />
            </div>
          )}
          {activeTab === 'health' && (
            <div className="h-full overflow-y-auto">
              <HealthTab 
                character={gameState.character}
                onHealthAction={(action, data) => handleHealthAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
              />
            </div>
          )}
          {activeTab === 'lifestyle' && (
            <div className="h-full overflow-y-auto">
              <LifestyleTab 
                character={gameState.character}
                onLifestyleAction={(action, data) => handleLifestyleAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
              />
            </div>
          )}
          {activeTab === 'money' && (
            <div className="h-full overflow-y-auto">
              <MoneyTab 
                character={gameState.character}
                onCharacterUpdate={handleCharacterUpdate}
                onEvent={handleEvent}
              />
            </div>
          )}
          {activeTab === 'assets' && (
            <div className="h-full overflow-y-auto">
              <AssetsTab character={gameState.character} />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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

      {/* Event Overlay */}
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
