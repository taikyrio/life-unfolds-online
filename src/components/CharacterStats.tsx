
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Character } from '../types/game';
import { getStatColor, getStatEmoji, getLifeStage, formatSalary } from '../utils/gameUtils';

interface CharacterStatsProps {
  character: Character;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const mainStats = [
    { name: 'Health', value: character.health, key: 'health' },
    { name: 'Happiness', value: character.happiness, key: 'happiness' },
    { name: 'Smarts', value: character.smarts, key: 'smarts' },
    { name: 'Looks', value: character.looks, key: 'looks' },
  ];

  const secondaryStats = [
    { name: 'Wealth', value: Math.min(character.wealth, 100), key: 'wealth', display: `$${character.wealth}` },
    { name: 'Relationships', value: character.relationships, key: 'relationships' },
    { name: 'Fame', value: character.fame, key: 'fame' },
  ];

  return (
    <div className="space-y-4">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-game-text flex items-center gap-2">
            👤 {character.name}
          </CardTitle>
          <div className="text-sm text-gray-600 space-y-1">
            <p>📍 {character.birthplace}, {character.nationality}</p>
            <p>🎂 {getLifeStage(character.age)} - Age {character.age} ({character.year})</p>
            {character.education && <p>🎓 {character.education}</p>}
            {character.job && <p>💼 {character.job} ({formatSalary(character.salary)})</p>}
            {character.relationshipStatus !== 'single' && (
              <p>💕 {character.relationshipStatus}{character.partnerName ? ` - ${character.partnerName}` : ''}</p>
            )}
            {character.children.length > 0 && (
              <p>👶 Children: {character.children.length}</p>
            )}
            {character.criminalRecord && <p>🚨 Criminal Record</p>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">Main Stats</h4>
            {mainStats.map((stat) => (
              <div key={stat.key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-game-text flex items-center gap-2 text-sm">
                    {getStatEmoji(stat.key, stat.value)} {stat.name}
                  </span>
                  <span className={`font-bold text-sm ${getStatColor(stat.value)}`}>
                    {stat.value}
                  </span>
                </div>
                <Progress value={stat.value} className="h-1.5" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">Life Stats</h4>
            {secondaryStats.map((stat) => (
              <div key={stat.key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-game-text flex items-center gap-2 text-sm">
                    {getStatEmoji(stat.key, stat.value)} {stat.name}
                  </span>
                  <span className={`font-bold text-sm ${getStatColor(stat.value)}`}>
                    {stat.display || stat.value}
                  </span>
                </div>
                <Progress value={stat.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
