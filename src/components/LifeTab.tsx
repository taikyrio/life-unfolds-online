
import React from 'react';
import { Character } from '../types/game';
import { CharacterProfile } from './life/CharacterProfile';
import { PersonalInfo } from './life/PersonalInfo';
import { FamilySection } from './life/FamilySection';
import { LifeStory } from './life/LifeStory';
import { useIsMobile } from '../hooks/use-mobile';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  onChoice?: (choiceId: string) => void;
}

export const LifeTab: React.FC<LifeTabProps> = ({
  character,
  eventHistory,
  ageHistory = {},
  onAgeUp,
  onChoice
}) => {
  const isMobile = useIsMobile();

  // Calculate current year based on character's birth year and age
  const getCurrentYear = () => {
    if (character.birthYear) {
      return character.birthYear + character.age;
    }
    // Fallback calculation
    const currentYear = new Date().getFullYear();
    return currentYear - character.age + character.age;
  };

  if (isMobile) {
    return (
      <div className="h-full bg-gray-50 flex flex-col">
        {/* Year Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{getCurrentYear()}</div>
            <div className="text-sm text-gray-500">Current Year</div>
          </div>
        </div>

        {/* Character Info Card */}
        <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
              {character.age === 0 ? '👶' : 
               character.age < 5 ? '🧒' : 
               character.age < 13 ? '👦' : 
               character.age < 18 ? '🧑' : '👤'}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{character.name}</h2>
            <p className="text-gray-600 text-sm">{character.age} years old</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">❤️</div>
              <div className="text-xs text-gray-600 mb-1">Health</div>
              <div className="font-bold text-red-600">{Math.round(character.health)}%</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">😊</div>
              <div className="text-xs text-gray-600 mb-1">Happiness</div>
              <div className="font-bold text-yellow-600">{Math.round(character.happiness)}%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-xs text-gray-600 mb-1">Smarts</div>
              <div className="font-bold text-blue-600">{Math.round(character.smarts)}%</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs text-gray-600 mb-1">Looks</div>
              <div className="font-bold text-purple-600">{Math.round(character.looks)}%</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">${character.wealth}k</div>
              <div className="text-xs text-gray-500">Net Worth</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-gray-700">{character.job || 'Unemployed'}</div>
              <div className="text-xs text-gray-500">Job</div>
            </div>
          </div>
        </div>

        {/* Life Events */}
        <div className="flex-1 bg-white mx-4 my-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900 text-center">Life Events</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 420px)' }}>
            {Object.entries(ageHistory)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .slice(0, 5) // Show only last 5 years to prevent scrolling
              .map(([age, events]) => (
                <div key={age} className="mb-3 last:mb-0">
                  <div className="text-xs font-medium text-gray-500 mb-2 text-center">
                    Age {age} ({(character.birthYear || new Date().getFullYear() - character.age) + parseInt(age)})
                  </div>
                  {events.map((event, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-2 mb-2 border-l-3 border-blue-300">
                      <p className="text-xs text-gray-700">{event}</p>
                    </div>
                  ))}
                </div>
              ))}
            
            {Object.keys(ageHistory).length === 0 && (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">👶</div>
                <p className="text-gray-500 text-sm">You were just born!</p>
                <p className="text-gray-400 text-xs">Age up to start your story</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <CharacterProfile character={character} />
          <PersonalInfo character={character} />
          <FamilySection character={character} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <LifeStory 
            character={character}
            ageHistory={ageHistory}
            onAgeUp={onAgeUp}
          />
        </div>
      </div>
    </div>
  );
};
