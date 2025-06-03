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
    <div className="h-full flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
      {/* Device-optimized Character Profile Card */}
      <div className="mobile-card space-y-3 sm:space-y-4">
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-lg sm:text-2xl md:text-3xl mx-auto apple-shadow-sm">
            {getAgeStage(character.age).emoji}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{character.name}</h1>
            <div className="glass-card px-3 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl inline-block">
              <span className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {getAgeStage(character.age).stage} • Age {character.age}
              </span>
            </div>
          </div>
        </div>
        
        {/* Device-responsive Birthday and Zodiac Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center touch-feedback min-h-[80px] sm:min-h-[90px]">
            <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">🎂</div>
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white leading-tight">
              {getMonthName(character.birthMonth || 1)} {character.birthDay}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">Birthday</div>
          </div>
          <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center touch-feedback min-h-[80px] sm:min-h-[90px]">
            <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{character.zodiacSign?.emoji || '⭐'}</div>
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white leading-tight">
              {character.zodiacSign?.name || 'Unknown'}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">Zodiac</div>
          </div>
        </div>

        {/* Mobile-optimized Family Members */}
        {character.familyMembers.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>👨‍👩‍👧‍👦</span>
              <span>Family</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {character.familyMembers.slice(0, 6).map(member => (
                <div key={member.id} className="glass-card rounded-2xl p-3 apple-hover touch-feedback">
                  <div className="text-center space-y-2">
                    <div className="text-xl">
                      {member.relationship === 'father' && '👨'}
                      {member.relationship === 'mother' && '👩'}
                      {member.relationship === 'sibling' && '👫'}
                      {member.relationship === 'spouse' && '💑'}
                      {member.relationship === 'lover' && '💕'}
                      {member.relationship === 'child' && '👶'}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {member.name.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {member.relationship}
                    </div>
                  </div>
                </div>
              ))}
              {character.familyMembers.length > 6 && (
                <div className="glass-card rounded-2xl p-3 flex items-center justify-center touch-feedback">
                  <div className="text-center">
                    <div className="text-lg text-gray-400 mb-1">•••</div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      +{character.familyMembers.length - 6} more
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile-optimized Life History */}
      <div className="flex-1 overflow-hidden">
        <div className="mobile-card h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>📚</span>
              <span>Life Story</span>
            </h2>
            <div className="glass-card px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {ageEntries.length} {ageEntries.length === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="space-y-3 pb-4">
              {ageEntries.reverse().map(entry => (
                <div key={entry.age} className="glass-card rounded-2xl p-4 apple-hover touch-feedback">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold bg-gradient-to-br ${
                        entry.age === 0 ? 'from-pink-400 to-pink-600' :
                        entry.age <= 4 ? 'from-blue-400 to-blue-600' :
                        entry.age <= 12 ? 'from-green-400 to-green-600' :
                        entry.age <= 17 ? 'from-purple-400 to-purple-600' :
                        entry.age <= 25 ? 'from-indigo-400 to-indigo-600' :
                        entry.age <= 50 ? 'from-yellow-400 to-yellow-600' :
                        entry.age <= 65 ? 'from-orange-400 to-orange-600' :
                        'from-gray-400 to-gray-600'
                      } text-white apple-shadow-sm`}>
                        {entry.age}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="font-bold text-gray-900 dark:text-white">Age {entry.age}:</span>{' '}
                        <span className="whitespace-pre-line">{entry.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {ageEntries.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📖</div>
                  <p className="text-gray-500 dark:text-gray-400 text-base">Your life story will appear here...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Device-optimized Age Up Button */}
      {!currentEvent && (
        <div className="safe-area-pb pt-2 sm:pt-4">
          <button
            onClick={onAgeUp}
            className="w-full min-h-[52px] sm:min-h-[56px] md:min-h-[60px] rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white apple-shadow-md touch-feedback apple-transition"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl">⏰</span>
              <span>Age Up</span>
            </div>
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