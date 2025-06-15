
import React from 'react';
import { Character, GameState } from '../../../../types/game';
import { RelationshipsMenu } from '../../../menus/RelationshipsMenu';

interface PeoplePageProps {
  character: Character;
  gameState: GameState;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({
  character,
  gameState,
  onCharacterUpdate,
  onEvent
}) => {
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">People</h1>
          <p className="text-white/70 text-sm">Manage your relationships</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <RelationshipsMenu
          character={character}
          onCharacterUpdate={onCharacterUpdate}
          onEvent={onEvent}
        />
      </div>
    </div>
  );
};
