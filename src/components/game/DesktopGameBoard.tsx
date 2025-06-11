
import React, { useState } from 'react';
import { Character, GameState } from '../../types/game';
import { GameHeader } from '../ui/GameHeader';
import { StatsBar } from '../ui/StatsBar';
import { TabNavigation } from '../ui/TabNavigation';
import { TabContent } from '../ui/TabContent';
import { AgeUpButton } from '../ui/AgeUpButton';
import { GameModals } from '../ui/GameModals';

interface DesktopGameBoardProps {
  gameState: GameState;
  character: Character;
  ageHistory: Record<number, string[]>;
  showActivitiesMenu: boolean;
  showRelationshipsMenu: boolean;
  showAssetsMenu: boolean;
  showActivityModal: boolean;
  showEventOverlay: boolean;
  selectedActivity: any;
  onAgeUp: () => void;
  onChoice: (choiceId: string) => void;
  onActivity: (activityId: string, activityData?: any) => void;
  onGameStateChange: (newState: GameState) => void;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onCareerAction: (action: string, data?: any) => void;
  onEducationAction: (action: string, data?: any) => void;
  onHealthAction: (action: string, data?: any) => void;
  onLifestyleAction: (action: string, data?: any) => void;
  onRelationshipAction: (action: string, data?: any) => void;
  onCloseActivitiesMenu: () => void;
  onCloseRelationshipsMenu: () => void;
  onCloseAssetsMenu: () => void;
  onCloseActivityModal: () => void;
  onCloseEventOverlay: () => void;
  onActivityComplete: () => void;
  onOpenSettings?: () => void;
}

export const DesktopGameBoard: React.FC<DesktopGameBoardProps> = ({
  gameState,
  character,
  ageHistory,
  showActivitiesMenu,
  showRelationshipsMenu,
  showAssetsMenu,
  showActivityModal,
  showEventOverlay,
  selectedActivity,
  onAgeUp,
  onChoice,
  onActivity,
  onGameStateChange,
  onCharacterUpdate,
  onEvent,
  onCareerAction,
  onEducationAction,
  onHealthAction,
  onLifestyleAction,
  onRelationshipAction,
  onCloseActivitiesMenu,
  onCloseRelationshipsMenu,
  onCloseAssetsMenu,
  onCloseActivityModal,
  onCloseEventOverlay,
  onActivityComplete,
  onOpenSettings
}) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education' | 'health' | 'lifestyle' | 'money'>('life');

  return (
    <div className="game-container h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <GameHeader character={character} onOpenSettings={onOpenSettings} />
      <StatsBar character={character} />
      <TabNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      <div className="game-content flex-1 overflow-y-auto">
        <TabContent
          activeTab={activeTab}
          character={character}
          gameState={gameState}
          eventHistory={gameState.eventHistory}
          ageHistory={ageHistory}
          onAgeUp={onAgeUp}
          onChoice={onChoice}
          onActivity={onActivity}
          onGameStateChange={onGameStateChange}
          onCharacterUpdate={onCharacterUpdate}
          onEvent={onEvent}
          onCareerAction={onCareerAction}
          onEducationAction={onEducationAction}
          onHealthAction={onHealthAction}
          onLifestyleAction={onLifestyleAction}
        />
      </div>

      <AgeUpButton onAgeUp={onAgeUp} />

      <GameModals
        gameState={gameState}
        showActivitiesMenu={showActivitiesMenu}
        showRelationshipsMenu={showRelationshipsMenu}
        showAssetsMenu={showAssetsMenu}
        showActivityModal={showActivityModal}
        showEventOverlay={showEventOverlay}
        selectedActivity={selectedActivity}
        onCloseActivitiesMenu={onCloseActivitiesMenu}
        onActivityComplete={onActivityComplete}
        onCloseRelationshipsMenu={onCloseRelationshipsMenu}
        onCloseAssetsMenu={onCloseAssetsMenu}
        onCloseActivityModal={onCloseActivityModal}
        onCloseEventOverlay={onCloseEventOverlay}
        onActivity={onActivity}
        onRelationshipAction={onRelationshipAction}
        onChoice={onChoice}
        onGameStateChange={onGameStateChange}
      />
    </div>
  );
};
