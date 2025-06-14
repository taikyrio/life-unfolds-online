
import React from 'react';
import { ArrowRight, Clock, Sparkles, Zap } from 'lucide-react';
import { Character } from '../../types/game';

interface GameAgeButtonProps {
  character: Character;
  onAgeUp: () => void;
}

export const GameAgeButton: React.FC<GameAgeButtonProps> = ({
  character,
  onAgeUp
}) => {
  const getUrgencyLevel = () => {
    if (character.health < 30) return 'critical';
    if (character.happiness < 40) return 'concerning';
    if (character.age % 5 === 0) return 'milestone';
    return 'normal';
  };

  const urgency = getUrgencyLevel();

  const getButtonConfig = () => {
    switch (urgency) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-600 to-red-700',
          shadow: 'shadow-red-600/30',
          icon: Clock,
          pulse: true
        };
      case 'concerning':
        return {
          bg: 'bg-gradient-to-r from-orange-600 to-red-600',
          shadow: 'shadow-orange-600/30',
          icon: Zap,
          pulse: false
        };
      case 'milestone':
        return {
          bg: 'bg-gradient-to-r from-purple-600 to-pink-600',
          shadow: 'shadow-purple-600/30',
          icon: Sparkles,
          pulse: false
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
          shadow: 'shadow-blue-600/30',
          icon: ArrowRight,
          pulse: false
        };
    }
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <button
        onClick={onAgeUp}
        className={`group relative w-14 h-14 rounded-2xl ${config.bg} ${config.shadow} shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 ${
          config.pulse ? 'animate-pulse' : ''
        }`}
      >
        {/* Game-style button highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20" />
        
        {/* Age display */}
        <div className="absolute -top-2 -left-2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-xl border border-slate-600/50 shadow-lg">
          {character.age}
        </div>
        
        {/* Main icon */}
        <Icon 
          size={20} 
          className="text-white drop-shadow-lg relative z-10" 
          strokeWidth={2.5}
        />
        
        {/* Milestone sparkles */}
        {urgency === 'milestone' && (
          <>
            <div className="absolute top-2 right-1 w-1 h-1 bg-white/80 rounded-full animate-pulse" />
            <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-150" />
          </>
        )}
      </button>
    </div>
  );
};
