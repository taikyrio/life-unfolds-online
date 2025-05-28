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
    <div className="bg-white border-t border-gray-200 p-2 sm:p-4 space-y-2 sm:space-y-3 relative z-10 mb-16">
      {stats.map((stat) => (
        <div key={stat.name} className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2 w-16 sm:w-20">
            <span className="text-sm sm:text-lg">{stat.emoji}</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{stat.name}</span>
            {getWarningIcon(stat.value) && (
              <span className="text-xs">{getWarningIcon(stat.value)}</span>
            )}
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-3">
              <div 
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${getStatBarColor(stat.value)}`}
                style={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800 w-6 sm:w-8 text-right">
              {Math.round(stat.value)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};