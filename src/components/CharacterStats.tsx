
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Character } from '../types/game';
import { getStatColor, getStatEmoji } from '../utils/gameUtils';

interface CharacterStatsProps {
  character: Character;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const stats = [
    { name: 'Health', value: character.health, key: 'health' },
    { name: 'Happiness', value: character.happiness, key: 'happiness' },
    { name: 'Wealth', value: Math.min(character.wealth, 100), key: 'wealth' }, // Cap display at 100 for progress bar
    { name: 'Relationships', value: character.relationships, key: 'relationships' },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-game-text flex items-center gap-2">
          📊 Character Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-game-text flex items-center gap-2">
                {getStatEmoji(stat.key, stat.value)} {stat.name}
              </span>
              <span className={`font-bold ${getStatColor(stat.value)}`}>
                {stat.key === 'wealth' ? `$${character.wealth}` : stat.value}
              </span>
            </div>
            <Progress 
              value={stat.value} 
              className="h-2"
            />
          </div>
        ))}
        
        <div className="pt-2 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>🎂 Age: {character.age}</p>
            <p>📅 Year: {character.year}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
