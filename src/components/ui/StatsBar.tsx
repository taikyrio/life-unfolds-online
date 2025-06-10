
import React from 'react';
import { Character } from '../../types/game';

interface StatsBarProps {
  character: Character;
}

export const StatsBar: React.FC<StatsBarProps> = ({ character }) => {
  const stats = [
    { label: 'Health', value: Math.round(character.health), icon: '❤️', color: 'from-red-400 to-red-600', bg: 'bg-red-50' },
    { label: 'Happy', value: Math.round(character.happiness), icon: '😊', color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Social', value: Math.round(character.relationships || 0), icon: '🤝', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Smarts', value: Math.round(character.smarts), icon: '🧠', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Looks', value: Math.round(character.looks), icon: '✨', color: 'from-indigo-400 to-indigo-600', bg: 'bg-indigo-50' }
  ];

  const getStatBarColor = (value: number, gradient: string) => {
    const opacity = value >= 75 ? '100' : value >= 50 ? '80' : value >= 25 ? '60' : '40';
    return `bg-gradient-to-r ${gradient} opacity-${opacity}`;
  };

  const getWarningIcon = (value: number) => {
    if (value <= 12) return '⚠️';
    return '';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-4 py-3 shadow-sm">
      <div className="grid grid-cols-5 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-3 text-center relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-xs font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-bold text-gray-800">{stat.value}</span>
                {getWarningIcon(stat.value) && (
                  <span className="text-xs">{getWarningIcon(stat.value)}</span>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${stat.color}`}
                style={{ width: `${Math.max(0, Math.min(100, stat.value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
