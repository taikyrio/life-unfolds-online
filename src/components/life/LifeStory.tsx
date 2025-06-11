
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LifeStoryProps {
  character: Character;
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
}

export const LifeStory: React.FC<LifeStoryProps> = ({ character, ageHistory, onAgeUp }) => {
  const getLifeStage = (age: number) => {
    if (age < 2) return { stage: 'Baby', emoji: '👶', color: 'bg-pink-500' };
    if (age < 4) return { stage: 'Toddler', emoji: '🧒', color: 'bg-orange-500' };
    if (age < 13) return { stage: 'Child', emoji: '🧒', color: 'bg-yellow-500' };
    if (age < 20) return { stage: 'Teenager', emoji: '👦', color: 'bg-green-500' };
    if (age < 60) return { stage: 'Adult', emoji: '🧑', color: 'bg-blue-500' };
    return { stage: 'Senior', emoji: '👴', color: 'bg-purple-500' };
  };

  // Calculate the calendar year for a given age
  const getCalendarYear = (age: number) => {
    if (character.birthYear) {
      return character.birthYear + age;
    }
    // Fallback for characters without birth year - ensure realistic years
    const currentYear = new Date().getFullYear();
    const fallbackBirthYear = currentYear - character.age;
    return Math.min(fallbackBirthYear + age, currentYear);
  };

  return (
    <Card className="glass-card border-0 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          📚 Life Story
          <Badge variant="secondary" className="ml-auto">
            {Object.keys(ageHistory).length} years lived
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-[calc(100%-80px)]">
        <ScrollArea className="h-full pr-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="space-y-3">
            {!ageHistory || Object.keys(ageHistory).length === 0 ? (
              <div className="space-y-3">
                <div className="border-l-2 border-blue-200 dark:border-blue-700 pl-4 pb-4 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-semibold">
                      {getCalendarYear(0)} (Age 0)
                    </Badge>
                    <span className="text-xs text-gray-500">Baby</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
                      👶 You were born! Your parents are excited to welcome you into their family.
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    onClick={onAgeUp} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
                  >
                    🎂 Age Up to 1
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {Object.entries(ageHistory || {})
                  .sort(([ageA], [ageB]) => Number(ageB) - Number(ageA))
                  .map(([age, events]) => (
                  <div key={age} className="border-l-2 border-blue-200 dark:border-blue-700 pl-4 pb-4 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-semibold">
                        {getCalendarYear(Number(age))} (Age {age})
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {getLifeStage(Number(age)).stage}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {events.length > 0 ? (
                        events.map((event: string, eventIndex: number) => (
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
  );
};
