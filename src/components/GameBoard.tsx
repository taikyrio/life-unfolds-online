
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
import { processAgeUp, processChoice } from './game/GameLogic';
import { handleActivityAction } from './handlers/ActivityActionHandler';
import { handleRelationshipAction } from './handlers/RelationshipActionHandler';
import { handleCareerAction } from './handlers/CareerActionHandler';
import { 
  handleEducationAction, 
  handleHealthAction, 
  handleLifestyleAction, 
  handleMoneyAction 
} from './handlers/GameStateActionHandlers';

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
          eventCooldowns: new Map()
        }
      });
    }
  }, [gameState, onGameStateChange]);

  const ageUp = () => {
    processAgeUp(gameState, ageHistory, setAgeHistory, onGameStateChange, toast);
  };

  const handleChoice = (choiceId: string) => {
    processChoice(gameState, choiceId, ageHistory, setAgeHistory, onGameStateChange);
  };

  if (gameState.gameOver) {
    return <GameOverScreen 
      character={gameState.character} 
      reason={gameState.gameOverReason}
      onRestart={() => {
        const newGameState: GameState = {
          character: gameState.character,
          currentEvent: null,
          gameStarted: false,
          gameOver: false,
          eventHistory: [],
          achievements: [],
          eventTracker: {
            triggeredEvents: new Set(),
            lastEventAge: 0,
            eventCooldowns: new Map()
          }
        };
        onGameStateChange(newGameState);
      }}
    />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Ultra Compact Header */}
      <div className="bg-white border-b border-gray-200 px-2 sm:px-3 py-1 flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs sm:text-sm flex-shrink-0">
              👶
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xs sm:text-sm font-bold text-blue-600 truncate">{gameState.character.name}</h2>
              <p className="text-xs text-gray-600">Age {gameState.character.age}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs sm:text-sm font-bold text-green-600">${gameState.character.wealth}k</div>
          </div>
        </div>
      </div>

      {/* Responsive Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-1 sm:px-2 py-1 flex-shrink-0">
        <div className="flex justify-between items-center gap-1 overflow-hidden">
          <div className="flex items-center gap-0.5 text-red-600 min-w-0 flex-shrink">
            <span className="text-xs sm:text-sm">❤️</span>
            <span className="text-xs sm:text-sm font-medium truncate">{Math.round(gameState.character.health)}</span>
          </div>
          <div className="flex items-center gap-0.5 text-yellow-600 min-w-0 flex-shrink">
            <span className="text-xs sm:text-sm">😊</span>
            <span className="text-xs sm:text-sm font-medium truncate">{Math.round(gameState.character.happiness)}</span>
          </div>
          <div className="flex items-center gap-0.5 text-purple-600 min-w-0 flex-shrink">
            <span className="text-xs sm:text-sm">🤝</span>
            <span className="text-xs sm:text-sm font-medium truncate">{Math.round(gameState.character.relationships)}</span>
          </div>
          <div className="flex items-center gap-0.5 text-blue-600 min-w-0 flex-shrink">
            <span className="text-xs sm:text-sm">🧠</span>
            <span className="text-xs sm:text-sm font-medium truncate">{Math.round(gameState.character.intelligence)}</span>
          </div>
          <div className="flex items-center gap-0.5 text-green-600 min-w-0 flex-shrink">
            <span className="text-xs sm:text-sm">💰</span>
            <span className="text-xs sm:text-sm font-medium truncate">{gameState.character.wealth}k</span>
          </div>
        </div>
      </div>

      {/* Compact Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-1 py-1 flex-shrink-0">
        <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto scrollbar-hide">
          {[
            { id: 'life', icon: '🏠' },
            { id: 'activities', icon: '🎯' },
            { id: 'careers', icon: '💼' },
            { id: 'education', icon: '📚' },
            { id: 'health', icon: '❤️' },
            { id: 'money', icon: '💰' },
            { id: 'relationships', icon: '💕' },
            { id: 'assets', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-1.5 sm:px-2 py-1 rounded text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Optimized for small screens */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full">
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
                onActivity={(action, data) => handleActivityAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
              />
            </div>
          )}
          {activeTab === 'relationships' && (
            <div className="h-full overflow-y-auto">
              <RelationshipsTab character={gameState.character} />
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
                onMoneyAction={(action, data) => handleMoneyAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
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
          onActivity={(action, data) => handleActivityAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          isOpen={showRelationshipsMenu}
          character={gameState.character}
          onClose={() => setShowRelationshipsMenu(false)}
          onActivity={(action, data) => handleRelationshipAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
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
    </div>
  );
};
