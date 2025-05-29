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
      return `I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${character.birthplace}.`;
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
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month - 1] || 'Jan';
  };

  const getAgeStage = (age: number): { stage: string; emoji: string; color: string } => {
    if (age === 0) return { stage: 'Baby', emoji: '👶', color: 'bg-pink-100 text-pink-800' };
    if (age <= 4) return { stage: 'Toddler', emoji: '🧒', color: 'bg-blue-100 text-blue-800' };
    if (age <= 12) return { stage: 'Child', emoji: '👧', color: 'bg-green-100 text-green-800' };
    if (age <= 17) return { stage: 'Teen', emoji: '🧑‍🎓', color: 'bg-purple-100 text-purple-800' };
    if (age <= 25) return { stage: 'Young Adult', emoji: '🧑‍💼', color: 'bg-indigo-100 text-indigo-800' };
    if (age <= 50) return { stage: 'Adult', emoji: '👨‍💼', color: 'bg-yellow-100 text-yellow-800' };
    if (age <= 65) return { stage: 'Middle-aged', emoji: '👨‍🦳', color: 'bg-orange-100 text-orange-800' };
    return { stage: 'Senior', emoji: '👴', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Compact Character Info */}
      <div className="p-3 flex-shrink-0">
        <Card className="shadow-sm border border-blue-200 bg-white">
          <CardContent className="p-3">
            <div className="text-center mb-2">
              <div className="text-2xl mb-1">{getAgeStage(character.age).emoji}</div>
              <h1 className="text-lg font-bold text-gray-800 mb-1">{character.name}</h1>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAgeStage(character.age).color}`}>
                {getAgeStage(character.age).stage} • Age {character.age}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div>
                <div className="font-semibold">🎂 {getMonthName(character.birthMonth)} {character.birthDay}</div>
              </div>
              <div>
                <div className="font-semibold">⭐ {character.zodiacSign.emoji} {character.zodiacSign.name}</div>
              </div>
            </div>

            {/* Compact Family Info */}
            {character.familyMembers.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="text-xs font-semibold mb-1 text-gray-700">👨‍👩‍👧‍👦 Family:</div>
                <div className="flex flex-wrap gap-1">
                  {character.familyMembers.slice(0, 3).map(member => (
                    <div key={member.id} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                      {member.relationship === 'father' && `👨 ${member.name.split(' ')[0]}`}
                      {member.relationship === 'mother' && `👩 ${member.name.split(' ')[0]}`}
                      {member.relationship === 'sibling' && `👫 ${member.name.split(' ')[0]}`}
                      {member.relationship === 'spouse' && `💑 ${member.name.split(' ')[0]}`}
                      {member.relationship === 'lover' && `💕 ${member.name.split(' ')[0]}`}
                      {member.relationship === 'child' && `👶 ${member.name.split(' ')[0]}`}
                    </div>
                  ))}
                  {character.familyMembers.length > 3 && (
                    <div className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                      +{character.familyMembers.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Life History - Takes remaining space */}
      <div className="flex-1 px-3 pb-3 mt-2 overflow-hidden">
        <Card className="h-full shadow-sm border border-gray-200">
          <CardContent className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                📚 Life Story
              </h2>
              <span className="text-xs text-gray-500">
                {ageEntries.length} {ageEntries.length === 1 ? 'year' : 'years'}
              </span>
            </div>

            <ScrollArea className="flex-1 rounded-lg border border-gray-200 bg-gray-50">
              <div className="p-2 space-y-2">
                {ageEntries.reverse().map(entry => (
                  <div key={entry.age} className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getAgeStage(entry.age).color.replace('text', 'bg').replace('100', '500')}`}>
                          {entry.age}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-700 leading-relaxed">
                          <span className="font-bold text-gray-900">Age {entry.age}:</span>{' '}
                          <span className="whitespace-pre-line">{entry.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {ageEntries.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="text-2xl mb-1">📖</div>
                    <p className="text-xs">Your life story will appear here...</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Age Up Button - Fixed at bottom when no event */}
      {!currentEvent && (
        <div className="p-3 flex-shrink-0">
          <button
            onClick={onAgeUp}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <span>🎂</span>
              <span>Age Up</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};