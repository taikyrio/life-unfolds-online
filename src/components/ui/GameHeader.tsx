
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

  return (
    <div className="glass border-b border-white/20 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👤
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white truncate">{character.name}</h2>
            </div>
            <p className="text-sm text-white/70 capitalize">
              {getLifeStage(character.age)} • Age {character.age}
              {character.isPregnant && ` • 🤰 Pregnant (${character.pregnancyMonths || 0}/9)`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-green-400">{formatMoney(character.wealth * 1000)}</div>
            <div className="text-xs text-white/60">Net Worth</div>
            {character.job && (
              <div className="text-xs text-white/60">{formatMoney((character.salary || 0) * 1000)}/year</div>
            )}
          </div>
          {onOpenSettings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
