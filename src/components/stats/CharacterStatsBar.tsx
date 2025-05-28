
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Character } from '../../types/game';

interface CharacterStatsBarProps {
  character: Character;
}

export const CharacterStatsBar: React.FC<CharacterStatsBarProps> = ({ character }) => {
  const stats = [
    { 
      name: 'Happiness', 
      value: character.happiness, 
      emoji: '😊',
      color: '#4CAF50'
    },
    { 
      name: 'Health', 
      value: character.health, 
      emoji: '❤️',
      color: '#F44336'
    },
    { 
      name: 'Smarts', 
      value: character.smarts, 
      emoji: '🧠',
      color: '#9C27B0'
    },
    { 
      name: 'Looks', 
      value: character.looks, 
      emoji: '💎',
      color: character.looks < 20 ? '#8B4513' : '#E91E63'
    },
  ];

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 w-24">
              {stat.value < 20 && stat.name !== 'Happiness' && (
                <AlertTriangle size={14} className="text-red-500" />
              )}
              <span className="text-lg">{stat.emoji}</span>
              <span className="text-sm font-medium text-gray-700 flex-1">{stat.name}</span>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${stat.value}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
              <span className="text-sm font-bold text-gray-800 w-10 text-right">{stat.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
