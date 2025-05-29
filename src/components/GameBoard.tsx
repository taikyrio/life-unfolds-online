
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
import { MobileNavigation } from './navigation/MobileNavigation';
import { EducationTab } from './tabs/EducationTab';
import { CareersTab } from './tabs/CareersTab';
import { HealthTab } from './tabs/HealthTab';
import { LifestyleTab } from './tabs/LifestyleTab';
import { MoneyTab } from './tabs/MoneyTab';
import { LifeTab } from './LifeTab';
import { GameHeader } from './game/GameHeader';
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
    <div className="min-h-screen bg-gray-50">
      <GameHeader character={gameState.character} />
      
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <CharacterStats character={gameState.character} />
      </div>

      <div className="pb-24">
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
            onActivity={(action, data) => handleActivityAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
          />
        )}
        {activeTab === 'relationships' && (
          <RelationshipsTab character={gameState.character} />
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
            onMoneyAction={(action, data) => handleMoneyAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast)}
          />
        )}
        {activeTab === 'assets' && (
          <AssetsTab character={gameState.character} />
        )}
      </div>

      <MobileNavigation
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab as typeof activeTab)}
        character={gameState.character}
        onAgeUp={ageUp}
        onShowActivityMenu={() => setShowActivitiesMenu(true)}
        onShowRelationshipsMenu={() => setShowRelationshipsMenu(true)}
        onShowAssetsMenu={() => setShowAssetsMenu(true)}
      />

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
