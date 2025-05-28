
import React from 'react';
import { Character } from '../types/game';
import { formatSalary } from '../utils/gameUtils';

interface CharacterHeaderProps {
  character: Character;
}

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p className="text-sm opacity-90">
              Age {character.age} • {character.birthplace}, {character.nationality}
            </p>
            <p className="text-xs opacity-75">
              {character.job || 'Unemployed'} {character.salary > 0 && `• ${formatSalary(character.salary)}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${character.wealth}</div>
          <div className="text-xs opacity-75">Net Worth</div>
        </div>
      </div>
    </div>
  );
};
