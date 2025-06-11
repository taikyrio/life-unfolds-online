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
      <div className="h-full bg-white flex flex-col overflow-hidden">
        {/* InstLife-style Character Summary */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 mb-1">{character.age} Years Old</div>
            <div className="text-sm text-gray-600 mb-3">{getCurrentYear()}</div>
            
            {/* Compact Stats */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="text-center">
                <div className="text-lg">❤️</div>
                <div className="text-xs font-bold text-red-600">{Math.round(character.health)}%</div>
              </div>
              <div className="text-center">
                <div className="text-lg">😊</div>
                <div className="text-xs font-bold text-yellow-600">{Math.round(character.happiness)}%</div>
              </div>
              <div className="text-center">
                <div className="text-lg">🧠</div>
                <div className="text-xs font-bold text-blue-600">{Math.round(character.smarts)}%</div>
              </div>
              <div className="text-center">
                <div className="text-lg">✨</div>
                <div className="text-xs font-bold text-purple-600">{Math.round(character.looks)}%</div>
              </div>
            </div>

            {/* Status */}
            <div className="text-xs text-gray-500">
              {character.job ? `${character.job} • ` : ''}
              ${character.wealth}k net worth
            </div>
          </div>
        </div>

        {/* Life Events - InstLife Style */}
        <div className="flex-1 bg-white overflow-y-auto p-4">
          <div className="space-y-3">
            {Object.entries(ageHistory)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([age, events]) => (
                <div key={age} className="space-y-2">
                  <div className="text-sm font-bold text-orange-600">
                    {age} Years Old
                  </div>
                  {events.map((event, index) => (
                    <div key={index} className="text-sm text-gray-800 leading-relaxed pl-2">
                      {event}
                    </div>
                  ))}
                </div>
              ))}
            
            {Object.keys(ageHistory).length === 0 && (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">👶</div>
                <div className="text-sm text-gray-600">You were just born!</div>
                <div className="text-xs text-gray-400 mt-1">Tap "Age!" to start your story</div>
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
