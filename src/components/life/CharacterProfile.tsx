
import React from 'react';
import { Character } from '../../types/game';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Brain, DollarSign, Users } from 'lucide-react';
import { formatMoney } from '../../utils/gameUtils';

interface CharacterProfileProps {
  character: Character;
}

export const CharacterProfile: React.FC<CharacterProfileProps> = ({ character }) => {
  const getLifeStage = (age: number) => {
    if (age < 2) return { stage: 'Baby', emoji: '👶', color: 'bg-pink-500' };
    if (age < 4) return { stage: 'Toddler', emoji: '🧒', color: 'bg-orange-500' };
    if (age < 13) return { stage: 'Child', emoji: '🧒', color: 'bg-yellow-500' };
    if (age < 20) return { stage: 'Teenager', emoji: '👦', color: 'bg-green-500' };
    if (age < 60) return { stage: 'Adult', emoji: '🧑', color: 'bg-blue-500' };
    return { stage: 'Senior', emoji: '👴', color: 'bg-purple-500' };
  };

  const lifeStage = getLifeStage(character.age);

  return (
    <Card className="glass-card border-0">
      <CardContent className="p-6">
        {/* Character Avatar */}
        <div className="text-center mb-4">
          <div className={`w-24 h-24 mx-auto rounded-full ${lifeStage.color} flex items-center justify-center text-4xl mb-3 shadow-lg`}>
            {lifeStage.emoji}
          </div>
          <Badge className={`${lifeStage.color} text-white px-3 py-1 text-sm font-medium`}>
            {lifeStage.stage}
          </Badge>
        </div>

        {/* Character Name & Age */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {character.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Age {character.age}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <Heart className="w-4 h-4 text-red-500" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Health</div>
              <div className="font-semibold text-red-600">{character.health}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Brain className="w-4 h-4 text-yellow-500" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Happiness</div>
              <div className="font-semibold text-yellow-600">{character.happiness}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Money</div>
              <div className="font-semibold text-green-600">{formatMoney(character.wealth)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Users className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Smarts</div>
              <div className="font-semibold text-blue-600">{character.smarts}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
