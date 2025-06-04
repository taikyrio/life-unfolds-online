import React from 'react';
import { Character } from '../../types/game';

interface GameHeaderProps {
  character: Character;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ character }) => {
  return (
    <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/20 px-3 py-2 safe-area-pt">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm">
            👤
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
              {character.name}
            </h1>
            <p className="text-xs text-gray-500">Age {character.age}</p>
          </div>
        </div>
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur px-2 py-1 rounded-lg">
          <div className="text-sm font-bold text-green-600 dark:text-green-400">
            ${Math.round(character.wealth)}k
          </div>
        </div>
      </div>
    </div>
  );
};