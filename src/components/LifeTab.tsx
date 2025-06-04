import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { EventCard } from './EventCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatMoney } from '../utils/gameUtils';
import { Heart, Brain, DollarSign, Users, Calendar, MapPin } from 'lucide-react';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  ageHistory: { age: number; events: string[] }[];
  onAgeUp: () => void;
  onChoice?: (choiceId: string) => void;
}

export const LifeTab: React.FC<LifeTabProps> = ({
  character,
  eventHistory,
  ageHistory,
  onAgeUp,
  onChoice
}) => {
  const getLifeStage = (age: number) => {
    if (age < 2) return { stage: 'Baby', emoji: '👶', color: 'bg-pink-500' };
    if (age < 4) return { stage: 'Toddler', emoji: '🧒', color: 'bg-orange-500' };
    if (age < 13) return { stage: 'Child', emoji: '🧒', color: 'bg-yellow-500' };
    if (age < 20) return { stage: 'Teenager', emoji: '👦', color: 'bg-green-500' };
    if (age < 60) return { stage: 'Adult', emoji: '🧑', color: 'bg-blue-500' };
    return { stage: 'Senior', emoji: '👴', color: 'bg-purple-500' };
  };

  const lifeStage = getLifeStage(character.age);
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const characterZodiac = character.zodiacSign || zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left Column - Character Profile */}
        <div className="lg:col-span-1 space-y-4">
          {/* Main Character Card */}
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
                  {character.firstName} {character.lastName}
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

          {/* Family Section */}
          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                👨‍👩‍👧‍👦 Family
                <Badge variant="secondary" className="ml-auto">
                  {character.family?.length || 0} members
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {character.family?.slice(0, 3).map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">👤</span>
                      <span className="font-medium text-sm">{member.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{member.relationship}</Badge>
                  </div>
                )) || (
                  <p className="text-gray-500 text-sm">No family members yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Life Story & Recent Events */}
        <div className="lg:col-span-2 space-y-4">
          {/* Life Story */}
          <Card className="glass-card border-0 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                📚 Life Story
                <Badge variant="secondary" className="ml-auto">
                  {ageHistory.length} years lived
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-80px)]">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-3">
                  {ageHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🌟</div>
                      <h3 className="text-xl font-semibold mb-2">Your life story begins!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Start aging up to create memories and experiences.
                      </p>
                      <Button onClick={onAgeUp} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Begin Your Journey
                      </Button>
                    </div>
                  ) : (
                    <>
                      {ageHistory.slice().reverse().map((yearData, index) => (
                        <div key={`${yearData.age}-${index}`} className="border-l-2 border-blue-200 dark:border-blue-700 pl-4 pb-4 relative">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-semibold">
                              Age {yearData.age}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {getLifeStage(yearData.age).stage}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {yearData.events.length > 0 ? (
                              yearData.events.map((event, eventIndex) => (
                                <div key={eventIndex} className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
                                  {event}
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-gray-500 italic">
                                Nothing notable happened this year.
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Age Up Button at bottom */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button 
                          onClick={onAgeUp} 
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
                        >
                          🎂 Age Up to {character.age + 1}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};