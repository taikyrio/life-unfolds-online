
import React from 'react';
import { Character } from '../../../types/game';
import { CharacterStats } from '../../CharacterStats';

interface MobileGameHeaderProps {
  character: Character;
}

export const MobileGameHeader: React.FC<MobileGameHeaderProps> = ({ character }) => {
  return (
    <div className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 p-4 text-center">
        <h1 className="text-xl font-bold text-white mb-2 tracking-tight">
          {character.name}, {character.age}
        </h1>
        <CharacterStats character={character} />
      </div>
    </div>
  );
};
