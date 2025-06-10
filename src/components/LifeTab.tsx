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

  if (isMobile) {
    return (
      <div className="h-full bg-white p-4 overflow-y-auto">
        {/* Mobile BitLife-style Character Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 mb-4 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
            {character.age === 0 ? '👶' : character.age < 5 ? '🧒' : character.age < 13 ? '👦' : character.age < 18 ? '🧑' : '👤'}
          </div>
          <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
            {character.age === 0 ? 'Infant' : character.age < 5 ? 'Toddler' : character.age < 13 ? 'Child' : character.age < 18 ? 'Teen' : 'Adult'}
          </div>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p className="text-sm opacity-90">Age {character.age}</p>
        </div>

        {/* Recent Life Events - BitLife style */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 mb-3">Life Events</h3>
          {Object.entries(ageHistory)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .slice(0, 5)
            .map(([age, events]) => (
              <div key={age} className="space-y-1">
                {events.map((event, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-700 flex-1">{event}</span>
                      <span className="text-xs text-gray-500 ml-2">Age {age}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          
          {Object.keys(ageHistory).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Your life story will appear here as you age up!</p>
            </div>
          )}
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
