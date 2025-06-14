
import React from 'react';
import { Character, GameState } from '../../../types/game';
import { BottomSheetContainer } from './BottomSheetContainer';
import { ActivitiesTab } from '../../ActivitiesTab';
import { RelationshipsTab } from '../../RelationshipsTab';
import { AssetsTab } from '../../tabs/AssetsTab';
import { PersonalitySkillsPanel } from '../../PersonalitySkillsPanel';

interface MobileBottomSheetsProps {
  activeBottomSheet: string | null;
  onClose: () => void;
  gameState: GameState;
  handleActivity: (activityType: string, activityId: string) => void;
  handleCharacterUpdate: (character: Character) => void;
  handleEvent: (message: string) => void;
}

export const MobileBottomSheets: React.FC<MobileBottomSheetsProps> = ({
  activeBottomSheet,
  onClose,
  gameState,
  handleActivity,
  handleCharacterUpdate,
  handleEvent
}) => {
  return (
    <>
      {/* Activities Bottom Sheet */}
      <BottomSheetContainer
        isOpen={activeBottomSheet === 'activities'}
        onClose={onClose}
        title="Activities"
      >
        <ActivitiesTab character={gameState.character} onActivity={handleActivity} />
      </BottomSheetContainer>

      {/* Relationships Bottom Sheet */}
      <BottomSheetContainer
        isOpen={activeBottomSheet === 'relationships'}
        onClose={onClose}
        title="Relationships"
      >
        <RelationshipsTab 
          character={gameState.character} 
          onCharacterUpdate={handleCharacterUpdate}
          onEvent={handleEvent}
        />
      </BottomSheetContainer>

      {/* Assets Bottom Sheet */}
      <BottomSheetContainer
        isOpen={activeBottomSheet === 'assets'}
        onClose={onClose}
        title="Assets"
      >
        <AssetsTab character={gameState.character} onCharacterUpdate={handleCharacterUpdate} />
      </BottomSheetContainer>

      {/* Personality & Skills Bottom Sheet */}
      <BottomSheetContainer
        isOpen={activeBottomSheet === 'personality-skills'}
        onClose={onClose}
        title="Personality & Skills"
      >
        <PersonalitySkillsPanel character={gameState.character} />
      </BottomSheetContainer>
    </>
  );
};
