import React from 'react';
import { Character } from '../../types/game';

interface StatsBarProps {
  character: Character;
}

export const StatsBar: React.FC<StatsBarProps> = ({ character }) => {
  const stats = [
    { label: 'Health', value: Math.round(character.health), icon: '❤️', color: 'text-red-500' },
    { label: 'Happy', value: Math.round(character.happiness), icon: '😊', color: 'text-yellow-500' },
    { label: 'Social', value: Math.round(character.relationships || 0), icon: '🤝', color: 'text-purple-500' },
    { label: 'Smarts', value: Math.round(character.smarts), icon: '🧠', color: 'text-blue-500' },
    { label: 'Looks', value: Math.round(character.looks), icon: '✨', color: 'text-indigo-500' }
  ];

  return (
    <div className="flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/10 px-2 py-2">
      <div className="grid grid-cols-5 gap-1">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-sm">{stat.icon}</div>
            <div className={`text-xs font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};