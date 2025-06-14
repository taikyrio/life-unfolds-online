
import React from 'react';
import { Character } from '../../types/game';
import { getStatEmoji } from '../../utils/gameUtils';

interface CharacterStatsBarProps {
  character: Character;
}

export const CharacterStatsBar: React.FC<CharacterStatsBarProps> = ({ character }) => {
  const stats = [
    { name: 'Happiness', value: character.happiness, emoji: '😊', color: 'bg-yellow-500' },
    { name: 'Health', value: character.health, emoji: '❤️', color: 'bg-red-500' },
    { name: 'Smarts', value: character.smarts, emoji: '🧠', color: 'bg-blue-500' },
    { name: 'Looks', value: character.looks, emoji: '✨', color: 'bg-pink-500' }
  ];

  const getStatBarColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    if (value >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getWarningIcon = (value: number) => {
    if (value <= 12) return '⚠️';
    return '';
  };

  return (
    <div className="bg-white border-t border-gray-200 p-2 sm:p-4 space-y-1 sm:space-y-2">
      {stats.map((stat) => (
        <div key={stat.name} className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1 w-12 sm:w-16 md:w-20 flex-shrink-0">
            <span className="text-xs sm:text-sm md:text-lg">{stat.emoji}</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate hidden sm:inline">{stat.name}</span>
            {getWarningIcon(stat.value) && (
              <span className="text-xs">{getWarningIcon(stat.value)}</span>
            )}
          </div>

          <div className="flex-1 flex items-center gap-1 sm:gap-2 min-w-0">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-3 min-w-0">
              <div 
                className={`h-1.5 sm:h-2 md:h-3 rounded-full transition-all duration-300 ${getStatBarColor(stat.value)}`}
                style={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800 w-6 sm:w-8 text-right flex-shrink-0">
              {Math.round(stat.value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
