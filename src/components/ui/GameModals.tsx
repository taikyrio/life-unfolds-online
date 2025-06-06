
import React from 'react';
import { Character, GameState } from '../../types/game';
import { ActivitiesMenu } from '../menus/ActivitiesMenu';
import { RelationshipsMenu } from '../menus/RelationshipsMenu';
import { AssetsMenu } from '../menus/AssetsMenu';
import { ActivityModal } from '../modals/ActivityModal';
import { EventOverlay } from '../EventOverlay';

interface GameModalsProps {
  gameState: GameState;
  showActivitiesMenu: boolean;
  showRelationshipsMenu: boolean;
  showAssetsMenu: boolean;
  showActivityModal: boolean;
  showEventOverlay: boolean;
  selectedActivity: any;
  onCloseActivitiesMenu: () => void;
  onCloseRelationshipsMenu: () => void;
  onCloseAssetsMenu: () => void;
  onCloseActivityModal: () => void;
  onCloseEventOverlay: () => void;
  onActivity: (action: string, data?: any) => void;
  onRelationshipAction: (action: string, data?: any) => void;
  onChoice: (choiceId: string) => void;
  onGameStateChange: (newState: GameState) => void;
  onActivityComplete?: () => void;
}

export const GameModals: React.FC<GameModalsProps> = ({
  gameState,
  showActivitiesMenu,
  showRelationshipsMenu,
  showAssetsMenu,
  showActivityModal,
  showEventOverlay,
  selectedActivity,
  onCloseActivitiesMenu,
  onCloseRelationshipsMenu,
  onCloseAssetsMenu,
  onCloseActivityModal,
  onCloseEventOverlay,
  onActivity,
  onRelationshipAction,
  onChoice,
  onGameStateChange,
  onActivityComplete
}) => {
  return (
    <>
      {showActivitiesMenu && (
        <ActivitiesMenu
          isOpen={showActivitiesMenu}
          character={gameState.character}
          onActivity={onActivity}
          onClose={onCloseActivitiesMenu}
          onActivityComplete={onActivityComplete}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          character={gameState.character}
          onCharacterUpdate={(updatedCharacter) => {
            onGameStateChange({
              ...gameState,
              character: updatedCharacter
            });
            onCloseRelationshipsMenu();
          }}
          onEvent={(message) => {
            // Handle relationship events
            console.log('Relationship event:', message);
          }}
        />
      )}

      {showAssetsMenu && (
        <AssetsMenu
          isOpen={showAssetsMenu}
          character={gameState.character}
          onClose={onCloseAssetsMenu}
        />
      )}

      {showActivityModal && selectedActivity && (
        <ActivityModal
          isOpen={showActivityModal}
          character={gameState.character}
          activity={selectedActivity}
          onClose={onCloseActivityModal}
          onStartActivity={(activity) => {
            onActivity(activity.id, activity);
            onCloseActivityModal();
          }}
        />
      )}

      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={{
            ...gameState.currentEvent,
            category: gameState.currentEvent.category || 'random'
          }}
          onChoice={onChoice}
          onClose={() => {
            onCloseEventOverlay();
            onGameStateChange({
              ...gameState,
              currentEvent: null
            });
          }}
          characterName={gameState.character.name}
          characterAge={gameState.character.age}
        />
      )}
    </>
  );
};
