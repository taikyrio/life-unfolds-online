
import React from 'react';
import { Character } from '../types/game';
import { formatSalary } from '../utils/gameUtils';

interface CharacterHeaderProps {
  character: Character;
}

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-3 sm:p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
            👤
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold truncate">{character.name}</h2>
            <p className="text-xs sm:text-sm opacity-90">
              Age {character.age} • {character.birthplace}
            </p>
            <p className="text-xs opacity-75 truncate">
              {character.job || 'Unemployed'} {character.salary > 0 && `• ${formatSalary(character.salary)}`}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs opacity-75">{character.zodiacSign.emoji} {character.zodiacSign.name}</span>
              {character.relationshipStatus !== 'single' && (
                <span className="text-xs opacity-75">💕 {character.relationshipStatus}</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-lg sm:text-2xl font-bold">${character.wealth.toLocaleString()}</div>
          <div className="text-xs opacity-75">Net Worth</div>
          {character.fame > 0 && (
            <div className="text-xs opacity-75 mt-1">
              🌟 {character.fame}% Fame
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
