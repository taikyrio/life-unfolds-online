
import React from 'react';
import { Character } from '../../types/game';
import { Button } from './button';
import { Settings } from 'lucide-react';
import { formatMoney } from '../../utils/moneyFormatting';

interface GameHeaderProps {
  character: Character;
  onOpenSettings?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ character, onOpenSettings }) => {
  const getLifeStage = (age: number): string => {
    if (age === 0) return 'Infant';
    if (age < 5) return 'Toddler';
    if (age < 13) return 'Child';
    if (age < 18) return 'Teenager';
    return 'Adult';
  };

  const getAvatarEmoji = (age: number): string => {
    if (age === 0) return '👶';
    if (age < 5) return '🧒';
    if (age < 13) return '👦';
    if (age < 18) return '🧑';
    return '👤';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl border-2 border-white/30 shadow-lg">
              {getAvatarEmoji(character.age)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">
              {character.age}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-xl font-bold text-white truncate">{character.name}</h2>
            </div>
            <p className="text-sm text-white/80 capitalize">
              {getLifeStage(character.age)}
              {character.isPregnant && ` • 🤰 Pregnant (${character.pregnancyMonths || 0}/9)`}
            </p>
            {character.job && (
              <p className="text-xs text-white/70 mt-1">{character.job}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-white drop-shadow-lg">{formatMoney(character.wealth * 1000)}</div>
            <div className="text-xs text-white/70">Net Worth</div>
            {character.job && (
              <div className="text-xs text-white/60">{formatMoney((character.salary || 0) * 1000)}/year</div>
            )}
          </div>
          {onOpenSettings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 p-0"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
