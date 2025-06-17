
import React from 'react';
import { Character } from '../../types/core';
import { iOSCard } from '../ui/iOSCard';

interface StatsPanelProps {
  character: Character;
}

export function StatsPanel({ character }: StatsPanelProps) {
  const stats = [
    { name: 'Health', value: character.health, color: 'bg-ios-green', icon: '❤️' },
    { name: 'Happiness', value: character.happiness, color: 'bg-ios-yellow', icon: '😊' },
    { name: 'Smarts', value: character.smarts, color: 'bg-ios-blue', icon: '🧠' },
    { name: 'Looks', value: character.looks, color: 'bg-ios-pink', icon: '✨' },
  ];

  return (
    <div className="px-4 pb-4">
      <iOSCard>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="ios-footnote text-ios-secondary mb-2">{stat.name}</div>
                
                {/* Progress Bar */}
                <div className="w-full bg-ios-tertiary rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full ${stat.color} transition-all duration-300`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
                
                <div className="ios-caption-1 font-medium text-ios-label">
                  {stat.value}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      </iOSCard>
    </div>
  );
}
