
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface PersonalInfoProps {
  character: Character;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ character }) => {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const characterZodiac = character.zodiacSign || zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];

  return (
    <Card className="glass-card border-0">
      <CardContent className="p-6">
        {/* Personal Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Calendar className="w-4 h-4 text-orange-500" />
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Birthday</div>
              <div className="font-semibold">Oct 9</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg">♎</div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Zodiac Sign</div>
              <div className="font-semibold">{characterZodiac}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
