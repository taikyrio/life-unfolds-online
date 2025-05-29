
import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { EventCard } from './EventCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  currentEvent?: LifeEvent | null;
  onAgeUp: () => void;
  onChoice?: (choiceId: string) => void;
  ageHistory?: Record<number, string[]>;
}

export const LifeTab: React.FC<LifeTabProps> = ({ 
  character, 
  eventHistory, 
  currentEvent, 
  onAgeUp, 
  onChoice,
  ageHistory = {}
}) => {
  const getAgeDescription = (age: number) => {
    if (age === 0) {
      return `I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${character.birthplace}. I was conceived on the beach in Hawaii.`;
    }
    
    const events = ageHistory[age] || [];
    
    if (events.length === 0) {
      return `I am ${age} years old.`;
    }
    
    return events.join('\n');
  };

  // Generate age entries from 0 to current age
  const ageEntries = [];
  for (let age = 0; age <= character.age; age++) {
    ageEntries.push({
      age,
      description: getAgeDescription(age)
    });
  }

  const getMonthName = (month: number): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'January';
  };

  const getAgeStage = (age: number): { stage: string; emoji: string; color: string } => {
    if (age === 0) return { stage: 'Newborn', emoji: '👶', color: 'bg-pink-100 text-pink-800' };
    if (age <= 4) return { stage: 'Toddler', emoji: '🧒', color: 'bg-blue-100 text-blue-800' };
    if (age <= 12) return { stage: 'Child', emoji: '👧', color: 'bg-green-100 text-green-800' };
    if (age <= 17) return { stage: 'Teenager', emoji: '🧑‍🎓', color: 'bg-purple-100 text-purple-800' };
    if (age <= 25) return { stage: 'Young Adult', emoji: '🧑‍💼', color: 'bg-indigo-100 text-indigo-800' };
    if (age <= 50) return { stage: 'Adult', emoji: '👨‍💼', color: 'bg-yellow-100 text-yellow-800' };
    if (age <= 65) return { stage: 'Middle-aged', emoji: '👨‍🦳', color: 'bg-orange-100 text-orange-800' };
    return { stage: 'Senior', emoji: '👴', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="px-4 py-6 space-y-6">
        {/* Character Info Header */}
        <Card className="shadow-lg border-2 border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{getAgeStage(character.age).emoji}</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h1>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAgeStage(character.age).color}`}>
                {getAgeStage(character.age).stage} • Age {character.age}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-semibold mb-1">🎂 Birthday</div>
                <div>{getMonthName(character.birthMonth)} {character.birthDay}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">⭐ Zodiac</div>
                <div>{character.zodiacSign.emoji} {character.zodiacSign.name}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">🌍 Birthplace</div>
                <div>{character.birthplace}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">💼 Status</div>
                <div className="capitalize">{character.relationshipStatus}</div>
              </div>
            </div>
            
            {/* Family Info */}
            {character.familyMembers.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="font-semibold mb-2 text-gray-700">👨‍👩‍👧‍👦 Family:</div>
                <div className="flex flex-wrap gap-2">
                  {character.familyMembers.slice(0, 4).map(member => (
                    <div key={member.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {member.relationship === 'father' && `👨 ${member.name}`}
                      {member.relationship === 'mother' && `👩 ${member.name}`}
                      {member.relationship === 'sibling' && `👫 ${member.name}`}
                      {member.relationship === 'spouse' && `💑 ${member.name}`}
                      {member.relationship === 'lover' && `💕 ${member.name}`}
                      {member.relationship === 'child' && `👶 ${member.name}`}
                    </div>
                  ))}
                  {character.familyMembers.length > 4 && (
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      +{character.familyMembers.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Event Card */}
        {currentEvent && onChoice && (
          <Card className="shadow-lg border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-4">
              <div className="text-center mb-2">
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">
                  ⚡ Current Event
                </span>
              </div>
              <EventCard event={currentEvent} onChoice={onChoice} />
            </CardContent>
          </Card>
        )}

        {/* Life History - Scrollable */}
        <Card className="shadow-lg border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                📚 Life Story
              </h2>
              <span className="text-xs text-gray-500">
                {ageEntries.length} {ageEntries.length === 1 ? 'year' : 'years'} of memories
              </span>
            </div>
            
            <ScrollArea className="h-96 w-full rounded-lg border border-gray-200 bg-gray-50">
              <div className="p-4 space-y-3">
                {ageEntries.reverse().map(entry => (
                  <div key={entry.age} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${getAgeStage(entry.age).color.replace('text', 'bg').replace('100', '500')}`}>
                          {entry.age}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          <span className="font-bold text-gray-900">Age {entry.age}:</span>{' '}
                          <span className="whitespace-pre-line">{entry.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {ageEntries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📖</div>
                    <p>Your life story will appear here as you age up...</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Age Up Button */}
        {!currentEvent && (
          <div className="text-center py-8">
            <button
              onClick={onAgeUp}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <span>🎂</span>
                <span>Age Up</span>
              </div>
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Click to advance to the next year of your life
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
