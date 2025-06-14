
import React from 'react';
import { Character } from '../../../types/game';

interface PremiumStatsPanelProps {
  character: Character;
}

export const PremiumStatsPanel: React.FC<PremiumStatsPanelProps> = ({ character }) => {
  const stats = [
    { 
      name: 'Health', 
      value: character.health, 
      icon: '❤️', 
      gradient: 'from-red-500 to-pink-600',
      glow: 'shadow-red-500/25'
    },
    { 
      name: 'Happy', 
      value: character.happiness, 
      icon: '😊', 
      gradient: 'from-yellow-500 to-orange-500',
      glow: 'shadow-yellow-500/25'
    },
    { 
      name: 'Smarts', 
      value: character.smarts, 
      icon: '🧠', 
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/25'
    },
    { 
      name: 'Looks', 
      value: character.looks, 
      icon: '✨', 
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/25'
    }
  ];

  return (
    <div className="fixed bottom-24 left-4 right-4 z-40">
      <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 shadow-2xl max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white/5 rounded-2xl p-3 border border-white/5 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-white/90 text-sm font-bold">
                  {Math.round(stat.value)}
                </span>
              </div>
              <div className="text-white/60 text-xs font-medium mb-2">
                {stat.name}
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700 ease-out shadow-lg ${stat.glow}`}
                  style={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
