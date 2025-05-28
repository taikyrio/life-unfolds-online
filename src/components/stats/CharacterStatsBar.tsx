
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CharacterStatsBarProps {
  character: {
    happiness: number;
    health: number;
    smarts: number;
    looks: number;
  };
}

export const CharacterStatsBar: React.FC<CharacterStatsBarProps> = ({ character }) => {
  const stats = [
    { 
      name: 'Happiness', 
      value: character.happiness, 
      emoji: '😊',
      color: '#10B981', // emerald-500
      bgColor: '#D1FAE5' // emerald-100
    },
    { 
      name: 'Health', 
      value: character.health, 
      emoji: '❤️',
      color: '#EF4444', // red-500
      bgColor: '#FEE2E2' // red-100
    },
    { 
      name: 'Smarts', 
      value: character.smarts, 
      emoji: '🧠',
      color: '#8B5CF6', // violet-500
      bgColor: '#EDE9FE' // violet-100
    },
    { 
      name: 'Looks', 
      value: character.looks, 
      emoji: '💎',
      color: '#EC4899', // pink-500
      bgColor: '#FCE7F3' // pink-100
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {stat.value < 20 && stat.name !== 'Happiness' && (
                <AlertTriangle size={12} className="text-red-500" />
              )}
              <span className="text-sm">{stat.emoji}</span>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${stat.value}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 w-10 text-right">
                {stat.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
