
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, Camera, Trophy } from 'lucide-react';
import { Character } from '../../types/character';

interface FameDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const FameDLC: React.FC<FameDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const fameLevel = character.fame || 0;
  const getFameTitle = () => {
    if (fameLevel >= 90) return '🌟 Global Superstar';
    if (fameLevel >= 75) return '⭐ A-List Celebrity';
    if (fameLevel >= 50) return '🎭 Famous Personality';
    if (fameLevel >= 25) return '📺 Local Celebrity';
    if (fameLevel >= 10) return '🎪 Minor Celebrity';
    return '👤 Unknown';
  };

  const fameActivities = [
    {
      id: 'photo_shoot',
      name: 'Photo Shoot',
      description: 'Participate in a professional photo shoot',
      fame: 5,
      cost: 10,
      emoji: '📸'
    },
    {
      id: 'tv_interview',
      name: 'TV Interview',
      description: 'Appear on a television talk show',
      fame: 10,
      cost: 5,
      emoji: '📺'
    },
    {
      id: 'charity_event',
      name: 'Charity Event',
      description: 'Host or attend a high-profile charity event',
      fame: 8,
      cost: 25,
      emoji: '🎗️'
    },
    {
      id: 'awards_show',
      name: 'Awards Show',
      description: 'Attend a prestigious awards ceremony',
      fame: 15,
      cost: 50,
      emoji: '🏆'
    }
  ];

  const handleFameActivity = (activity: any) => {
    if (character.wealth < activity.cost) {
      onCareerAction('fame_insufficient_funds', { activity });
      return;
    }

    onCareerAction('fame_activity', { 
      activity,
      fameGain: activity.fame,
      cost: activity.cost
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Fame Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-700">{getFameTitle()}</div>
              <div className="text-lg text-gray-600">{fameLevel}/100</div>
              <Progress value={fameLevel} className="h-3 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Fame Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {fameActivities.map((activity) => (
              <div key={activity.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activity.emoji}</span>
                      <h3 className="font-semibold">{activity.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-yellow-600">+{activity.fame} Fame</span>
                      <span className="text-red-600">${activity.cost}k Cost</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleFameActivity(activity)}
                    disabled={character.wealth < activity.cost}
                  >
                    {character.wealth < activity.cost ? 'Too Expensive' : 'Do Activity'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
