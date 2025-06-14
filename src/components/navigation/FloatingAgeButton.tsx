
import React from 'react';
import { Plus, Sparkles, Clock } from 'lucide-react';
import { Character } from '../../types/game';

interface FloatingAgeButtonProps {
  character: Character;
  onAgeUp: () => void;
}

export const FloatingAgeButton: React.FC<FloatingAgeButtonProps> = ({
  character,
  onAgeUp
}) => {
  // Determine urgency based on character state
  const getUrgencyLevel = () => {
    if (character.health < 20) return 'critical';
    if (character.happiness < 30) return 'urgent';
    if (character.age % 5 === 0) return 'milestone';
    return 'normal';
  };

  const urgency = getUrgencyLevel();

  const getButtonStyle = () => {
    switch (urgency) {
      case 'critical':
        return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/50 animate-pulse';
      case 'urgent':
        return 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-500/50';
      case 'milestone':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/50';
      default:
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/50';
    }
  };

  const getIcon = () => {
    if (urgency === 'milestone') return Sparkles;
    if (urgency === 'critical' || urgency === 'urgent') return Clock;
    return Plus;
  };

  const Icon = getIcon();

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={onAgeUp}
        className={`group relative w-16 h-16 rounded-full ${getButtonStyle()} shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
        
        {/* Main icon */}
        <Icon 
          size={24} 
          className="text-white drop-shadow-lg relative z-10" 
          strokeWidth={2.5}
        />
        
        {/* Age display */}
        <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-full border border-white/20 shadow-lg">
          {character.age}
        </div>
        
        {/* Pulse ring for urgent states */}
        {(urgency === 'critical' || urgency === 'urgent') && (
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        )}
        
        {/* Sparkle effect for milestones */}
        {urgency === 'milestone' && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-1 right-3 w-1 h-1 bg-white rounded-full animate-pulse" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/70 rounded-full animate-pulse delay-150" />
            <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-300" />
          </div>
        )}
      </button>
    </div>
  );
};
