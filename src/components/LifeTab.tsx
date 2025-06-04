
import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { EventCard } from './EventCard';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    if (age === 0) return { stage: 'Baby', emoji: '👶', color: 'from-pink-400 to-pink-600' };
    if (age <= 4) return { stage: 'Toddler', emoji: '🧒', color: 'from-blue-400 to-blue-600' };
    if (age <= 12) return { stage: 'Child', emoji: '👧', color: 'from-green-400 to-green-600' };
    if (age <= 17) return { stage: 'Teen', emoji: '🧑‍🎓', color: 'from-purple-400 to-purple-600' };
    if (age <= 25) return { stage: 'Young Adult', emoji: '🧑‍💼', color: 'from-indigo-400 to-indigo-600' };
    if (age <= 50) return { stage: 'Adult', emoji: '👨‍💼', color: 'from-yellow-400 to-yellow-600' };
    if (age <= 65) return { stage: 'Middle-aged', emoji: '👨‍🦳', color: 'from-orange-400 to-orange-600' };
    return { stage: 'Senior', emoji: '👴', color: 'from-gray-400 to-gray-600' };
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Apple-style Character Profile Card */}
      <div className="apple-card space-y-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl apple-shadow-3 vision-float">
              {getAgeStage(character.age).emoji}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 apple-glass-subtle px-3 py-1 rounded-full">
              <span className="text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {getAgeStage(character.age).stage}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="apple-title-2 text-gray-900 dark:text-white">{character.name}</h1>
            <div className="apple-glass-card px-4 py-2 rounded-2xl inline-block apple-shadow-1">
              <span className="apple-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Age {character.age}
              </span>
            </div>
          </div>
        </div>
        
        {/* Apple-style Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="apple-card-minimal text-center vision-depth">
            <div className="text-2xl mb-2">🎂</div>
            <div className="apple-body font-medium text-gray-900 dark:text-white">
              {getMonthName(character.birthMonth || 1)} {character.birthDay}
            </div>
            <div className="apple-caption mt-1">Birthday</div>
          </div>
          <div className="apple-card-minimal text-center vision-depth">
            <div className="text-2xl mb-2">{character.zodiacSign?.emoji || '⭐'}</div>
            <div className="apple-body font-medium text-gray-900 dark:text-white">
              {character.zodiacSign?.name || 'Unknown'}
            </div>
            <div className="apple-caption mt-1">Zodiac</div>
          </div>
        </div>

        {/* Apple-style Family Members */}
        {character.familyMembers.length > 0 && (
          <div className="space-y-4">
            <h3 className="apple-headline text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span>Family</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {character.familyMembers.slice(0, 6).map(member => (
                <div key={member.id} className="apple-card-compact text-center vision-depth apple-hover">
                  <div className="space-y-2">
                    <div className="text-xl">
                      {member.relationship === 'father' && '👨'}
                      {member.relationship === 'mother' && '👩'}
                      {member.relationship === 'sibling' && '👫'}
                      {member.relationship === 'spouse' && '💑'}
                      {member.relationship === 'lover' && '💕'}
                      {member.relationship === 'child' && '👶'}
                    </div>
                    <div className="apple-body font-medium text-gray-900 dark:text-white truncate">
                      {member.name.split(' ')[0]}
                    </div>
                    <div className="apple-caption capitalize">
                      {member.relationship}
                    </div>
                  </div>
                </div>
              ))}
              {character.familyMembers.length > 6 && (
                <div className="apple-card-compact flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg text-gray-400 mb-1">•••</div>
                    <span className="apple-caption font-medium">
                      +{character.familyMembers.length - 6} more
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Apple-style Life History */}
      <div className="flex-1 overflow-hidden">
        <div className="apple-card h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="apple-title-3 text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span>Life Story</span>
            </h2>
            <div className="apple-glass-subtle px-3 py-2 rounded-full">
              <span className="apple-caption font-medium">
                {ageEntries.length} {ageEntries.length === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-full apple-scrollbar">
            <div className="space-y-4 pb-4">
              {ageEntries.reverse().map(entry => (
                <div key={entry.age} className="apple-card-minimal vision-depth apple-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br ${getAgeStage(entry.age).color} text-white apple-shadow-2 vision-float`}>
                        {entry.age}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="apple-body text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="font-semibold text-gray-900 dark:text-white">Age {entry.age}:</span>{' '}
                        <span className="whitespace-pre-line">{entry.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {ageEntries.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6 opacity-50">📖</div>
                  <p className="apple-body text-gray-500 dark:text-gray-400">Your life story will appear here...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Apple-style Age Up Button */}
      {!currentEvent && (
        <div className="safe-area-bottom pt-4">
          <button
            onClick={onAgeUp}
            className="apple-button-primary w-full min-h-[56px] flex items-center justify-center gap-3 animate-apple-scale-in"
          >
            <span className="text-xl">⏰</span>
            <span className="apple-headline">Age Up</span>
          </button>
        </div>
      )}

      {/* Current Event Display */}
      {currentEvent && onChoice && (
        <div className="p-4">
          <EventCard 
            event={currentEvent} 
            onChoice={onChoice}
          />
        </div>
      )}
    </div>
  );
};
