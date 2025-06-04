import React from 'react';
import { Character, GameState } from '../../types/game';
import { ActivitiesMenu } from '../menus/ActivitiesMenu';
import { RelationshipsMenu } from '../menus/RelationshipsMenu';
import { AssetsMenu } from '../menus/AssetsMenu';
import ActivityModal from '../modals/ActivityModal';
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
  onActivity: (activityId: string, activityData?: any) => void;
  onRelationshipAction: (action: string, data?: any) => void;
  onChoice: (choiceId: string) => void;
  onGameStateChange: (newState: GameState) => void;
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
  onGameStateChange
}) => {
  return (
    <>
      {showActivitiesMenu && (
        <ActivitiesMenu
          isOpen={showActivitiesMenu}
          character={gameState.character}
          onClose={onCloseActivitiesMenu}
          onActivity={onActivity}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          isOpen={showRelationshipsMenu}
          character={gameState.character}
          onClose={onCloseRelationshipsMenu}
          onActivity={(action, data) => onRelationshipAction(action, data)}
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
          character={gameState.character}
          onClose={onCloseActivityModal}
          onSelectActivity={(activity) => {
            onActivity(activity.id, activity);
            onCloseActivityModal();
          }}
        />
      )}

      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={gameState.currentEvent}
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