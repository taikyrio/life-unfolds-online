
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Heart, Star } from 'lucide-react';
import { getZodiacData } from '../../services/zodiacService';

interface PersonalInfoProps {
  character: Character;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ character }) => {
  const zodiacData = character.zodiacSign ? getZodiacData(character.zodiacSign) : null;

  return (
    <Card className="glass border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Star className="h-4 w-4" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Age</div>
              <div className="text-sm font-medium">{character.age} years old</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="text-sm font-medium capitalize">{character.relationshipStatus}</div>
            </div>
          </div>
        </div>

        {character.birthplace && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Born in</div>
              <div className="text-sm font-medium">{character.birthplace}</div>
            </div>
          </div>
        )}

        {zodiacData && (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Zodiac Sign</div>
              <div className="text-sm font-medium flex items-center gap-1">
                <span>{zodiacData.emoji}</span>
                <span>{zodiacData.name}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {zodiacData.element}
            </Badge>
          </div>
        )}

        {(character.personalityTraits || character.personality) && (
          <div>
            <div className="text-xs text-gray-500 mb-2">Personality Traits</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>Kindness: {(character.personalityTraits || character.personality)?.kindness || 0}</div>
              <div>Intelligence: {(character.personalityTraits || character.personality)?.intelligence || 0}</div>
              <div>Humor: {(character.personalityTraits || character.personality)?.humor || 0}</div>
              <div>Confidence: {(character.personalityTraits || character.personality)?.confidence || 0}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
