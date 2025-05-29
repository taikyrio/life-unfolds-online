
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../../types/game';
import { Trophy, Star, Camera, Mic, Tv, Heart, TrendingUp } from 'lucide-react';

interface FameDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const FameDLC: React.FC<FameDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  // Fame careers
  const fameCareers = [
    {
      id: 'social_media_influencer',
      name: 'Social Media Influencer',
      description: 'Build your online presence',
      requirements: { age: 13, looks: 40, fame: 0 },
      baseSalary: 20,
      fameMultiplier: 2,
      category: 'Digital'
    },
    {
      id: 'youtuber',
      name: 'YouTuber',
      description: 'Create viral content',
      requirements: { age: 13, looks: 30, fame: 10 },
      baseSalary: 35,
      fameMultiplier: 3,
      category: 'Digital'
    },
    {
      id: 'model',
      name: 'Model',
      description: 'Fashion and beauty modeling',
      requirements: { age: 16, looks: 70, fame: 20 },
      baseSalary: 65,
      fameMultiplier: 4,
      category: 'Fashion'
    },
    {
      id: 'actor',
      name: 'Actor',
      description: 'Perform in movies and TV',
      requirements: { age: 18, looks: 60, fame: 30 },
      baseSalary: 85,
      fameMultiplier: 5,
      category: 'Entertainment'
    },
    {
      id: 'musician',
      name: 'Musician',
      description: 'Create and perform music',
      requirements: { age: 16, looks: 50, fame: 25 },
      baseSalary: 75,
      fameMultiplier: 4,
      category: 'Music'
    },
    {
      id: 'tv_host',
      name: 'TV Host',
      description: 'Host television shows',
      requirements: { age: 21, looks: 75, fame: 50 },
      baseSalary: 120,
      fameMultiplier: 6,
      category: 'Television'
    },
    {
      id: 'movie_star',
      name: 'Movie Star',
      description: 'A-list Hollywood celebrity',
      requirements: { age: 25, looks: 80, fame: 80 },
      baseSalary: 500,
      fameMultiplier: 10,
      category: 'Hollywood'
    }
  ];

  // Fame activities
  const fameActivities = [
    {
      id: 'photoshoot',
      name: 'Photoshoot',
      description: 'Professional photo session',
      cost: 10,
      fameGain: 5,
      looksBoost: 2,
      requirements: { fame: 0 }
    },
    {
      id: 'interview',
      name: 'Media Interview',
      description: 'Talk show appearance',
      cost: 0,
      fameGain: 15,
      looksBoost: 0,
      requirements: { fame: 20 }
    },
    {
      id: 'red_carpet',
      name: 'Red Carpet Event',
      description: 'Attend high-profile events',
      cost: 50,
      fameGain: 25,
      looksBoost: 5,
      requirements: { fame: 40 }
    },
    {
      id: 'scandal',
      name: 'Create Controversy',
      description: 'Generate buzz (risky)',
      cost: 0,
      fameGain: 30,
      looksBoost: -5,
      requirements: { fame: 10 }
    },
    {
      id: 'charity_event',
      name: 'Charity Event',
      description: 'Improve your image',
      cost: 25,
      fameGain: 10,
      looksBoost: 3,
      requirements: { fame: 30 }
    }
  ];

  const getFame = () => {
    return character.fame || 0;
  };

  const isCareerEligible = (career: typeof fameCareers[0]) => {
    return character.age >= career.requirements.age &&
           character.looks >= career.requirements.looks &&
           getFame() >= career.requirements.fame;
  };

  const getCalculatedSalary = (career: typeof fameCareers[0]) => {
    const fameBonus = Math.floor(getFame() * career.fameMultiplier);
    return career.baseSalary + fameBonus;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Digital': return 'text-blue-600 bg-blue-50';
      case 'Fashion': return 'text-pink-600 bg-pink-50';
      case 'Entertainment': return 'text-purple-600 bg-purple-50';
      case 'Music': return 'text-green-600 bg-green-50';
      case 'Television': return 'text-orange-600 bg-orange-50';
      case 'Hollywood': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Fame Status */}
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Fame Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-yellow-600">Fame Level</div>
              <div className="text-lg">{getFame()}/100</div>
              <Progress value={getFame()} className="h-2 mt-1" />
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-pink-600">Looks</div>
              <div className="text-lg">{character.looks}/100</div>
              <Progress value={character.looks} className="h-2 mt-1" />
            </div>
          </div>
          
          <div className="text-center">
            {getFame() >= 80 && (
              <Badge className="bg-red-100 text-red-800">🌟 Mega Celebrity</Badge>
            )}
            {getFame() >= 60 && getFame() < 80 && (
              <Badge className="bg-orange-100 text-orange-800">⭐ A-List Celebrity</Badge>
            )}
            {getFame() >= 40 && getFame() < 60 && (
              <Badge className="bg-yellow-100 text-yellow-800">🎭 Well-Known</Badge>
            )}
            {getFame() >= 20 && getFame() < 40 && (
              <Badge className="bg-blue-100 text-blue-800">📱 Rising Star</Badge>
            )}
            {getFame() < 20 && (
              <Badge className="bg-gray-100 text-gray-800">👤 Unknown</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fame Activities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-600" />
            Fame Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fameActivities.map(activity => {
            const canAfford = character.wealth >= activity.cost;
            const meetsRequirements = getFame() >= activity.requirements.fame;
            const eligible = canAfford && meetsRequirements;
            
            return (
              <div key={activity.id} className={`border rounded-lg p-3 ${!eligible ? 'opacity-60' : 'hover:bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{activity.name}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onCareerAction('fame_activity', activity)}
                    disabled={!eligible}
                    variant={eligible ? "default" : "secondary"}
                  >
                    {activity.cost > 0 ? `$${activity.cost}k` : 'Free'}
                  </Button>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>⭐ +{activity.fameGain} fame</span>
                  {activity.looksBoost !== 0 && (
                    <span>👑 {activity.looksBoost > 0 ? '+' : ''}{activity.looksBoost} looks</span>
                  )}
                  <span>📋 {activity.requirements.fame} fame required</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Fame Careers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold-600" />
            Fame Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fameCareers.map(career => {
            const eligible = isCareerEligible(career);
            const potentialSalary = getCalculatedSalary(career);
            
            return (
              <div key={career.id} className={`border rounded-lg p-3 ${!eligible ? 'opacity-60' : 'hover:bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{career.name}</h3>
                      <Badge className={getCategoryColor(career.category)}>
                        {career.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>💰 ${potentialSalary}k/year</span>
                      <span>🎂 Age {career.requirements.age}+</span>
                      <span>👑 {career.requirements.looks} looks</span>
                      <span>⭐ {career.requirements.fame} fame</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onCareerAction('join_fame_career', career)}
                    disabled={!eligible || character.job === career.name}
                    variant={eligible ? "default" : "secondary"}
                  >
                    {character.job === career.name ? 'Current' : eligible ? 'Pursue' : 'Locked'}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Tv className="h-5 w-5 text-blue-600" />
            Social Media Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onCareerAction('post_content', { platform: 'instagram' })}
          >
            <Camera className="h-4 w-4 mr-2" />
            Post on Instagram
          </Button>
          
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onCareerAction('post_content', { platform: 'tiktok' })}
          >
            <Mic className="h-4 w-4 mr-2" />
            Create TikTok Video
          </Button>
          
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onCareerAction('collaborate', {})}
            disabled={getFame() < 30}
          >
            <Heart className="h-4 w-4 mr-2" />
            Celebrity Collaboration (30 Fame Required)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
