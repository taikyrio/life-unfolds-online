import React from 'react';
import { Progress } from './ui/progress';
import { AlertTriangle } from 'lucide-react';

interface CharacterStatsProps {
  character: {
    happiness: number;
    health: number;
    smarts: number;
    looks: number;
  };
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const stats = [
    { 
      name: 'Happiness', 
      value: character.happiness, 
      emoji: '😊',
      color: 'bg-green-500',
      bgColor: 'bg-green-100'
    },
    { 
      name: 'Health', 
      value: character.health, 
      emoji: '❤️',
      color: 'bg-red-500',
      bgColor: 'bg-red-100'
    },
    { 
      name: 'Smarts', 
      value: character.smarts, 
      emoji: '🧠',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100'
    },
    { 
      name: 'Looks', 
      value: character.looks, 
      emoji: '💎',
      color: 'bg-pink-500',
      bgColor: 'bg-pink-100'
    },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mx-4">
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {stat.value < 20 && stat.name !== 'Happiness' && (
                  <AlertTriangle size={16} className="text-red-500" />
                )}
                <span className="text-2xl">{stat.emoji}</span>
                <span className="font-medium text-gray-700">{stat.name}</span>
              </div>
              <span className="font-bold text-lg text-gray-800">{stat.value}%</span>
            </div>
            <div className={`w-full ${stat.bgColor} rounded-full h-3 overflow-hidden`}>
              <div 
                className={`h-full ${stat.color} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${stat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};