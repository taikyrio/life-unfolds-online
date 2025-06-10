
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Heart, Star, User } from 'lucide-react';
import { getZodiacData } from '../../services/zodiacService';

interface PersonalInfoProps {
  character: Character;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ character }) => {
  const zodiacData = character.zodiacSign ? getZodiacData(character.zodiacSign) : null;

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/50 border-blue-200/50 shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-sm flex items-center gap-2">
          <User className="h-4 w-4" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Age</div>
              <div className="text-sm font-bold text-gray-800">{character.age} years old</div>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-pink-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Status</div>
              <div className="text-sm font-bold text-gray-800 capitalize">{character.relationshipStatus}</div>
            </div>
          </div>
        </div>

        {character.birthplace && (
          <div className="bg-white/70 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Born in</div>
              <div className="text-sm font-bold text-gray-800">{character.birthplace}</div>
            </div>
          </div>
        )}

        {zodiacData && (
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Zodiac Sign</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    <span>{zodiacData.emoji}</span>
                    <span>{zodiacData.name}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                {zodiacData.element}
              </Badge>
            </div>
          </div>
        )}

        {(character.personalityTraits || character.personality) && (
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-xs text-gray-500 font-medium mb-3">Personality Traits</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-2 text-center">
                <div className="text-xs opacity-90">Kindness</div>
                <div className="text-sm font-bold">{(character.personalityTraits || character.personality)?.kindness || 0}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-2 text-center">
                <div className="text-xs opacity-90">Intelligence</div>
                <div className="text-sm font-bold">{(character.personalityTraits || character.personality)?.intelligence || 0}</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-2 text-center">
                <div className="text-xs opacity-90">Humor</div>
                <div className="text-sm font-bold">{(character.personalityTraits || character.personality)?.humor || 0}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-2 text-center">
                <div className="text-xs opacity-90">Confidence</div>
                <div className="text-sm font-bold">{(character.personalityTraits || character.personality)?.confidence || 0}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
