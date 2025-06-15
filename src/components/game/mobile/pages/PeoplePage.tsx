
import React from 'react';
import { Character, GameState } from '../../../../types/game';
import { RelationshipsMenu } from '../../../menus/RelationshipsMenu';
import { Users, Heart, UserPlus, MessageCircle } from 'lucide-react';

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
  const relationshipCount = character.familyMembers?.length || 0;
  const friendsCount = character.familyMembers?.filter(member => member.relationship === 'friend')?.length || 0;
  const familyCount = character.familyMembers?.filter(member => ['parent', 'sibling', 'spouse', 'child'].includes(member.relationship))?.length || 0;

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white">People</h1>
          <p className="text-white/70 text-sm">Manage your relationships and social connections</p>
        </div>

        {/* Relationship Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center">
            <Users className="w-6 h-6 mx-auto mb-1 text-blue-400" />
            <div className="text-lg font-bold text-white">{relationshipCount}</div>
            <div className="text-xs text-white/60">Total</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center">
            <Heart className="w-6 h-6 mx-auto mb-1 text-red-400" />
            <div className="text-lg font-bold text-white">{familyCount}</div>
            <div className="text-xs text-white/60">Family</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center">
            <MessageCircle className="w-6 h-6 mx-auto mb-1 text-green-400" />
            <div className="text-lg font-bold text-white">{friendsCount}</div>
            <div className="text-xs text-white/60">Friends</div>
          </div>
        </div>

        {/* Social Status */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Social Level</div>
              <div className="text-white/60 text-sm">Based on relationships</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{character.relationships}/100</div>
              <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${character.relationships}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relationships Content */}
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
