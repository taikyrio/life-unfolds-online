
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
      <div className="h-full bg-gray-50 p-4 overflow-y-auto">
        {/* InstLife-style Character Summary Card */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
              {character.age === 0 ? '👶' : character.age < 5 ? '🧒' : character.age < 13 ? '👦' : character.age < 18 ? '🧑' : '👤'}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{character.name}</h2>
            <p className="text-gray-500 mb-4">
              {character.age === 0 ? 'Infant' : character.age < 5 ? 'Toddler' : character.age < 13 ? 'Child' : character.age < 18 ? 'Teenager' : 'Adult'} • Age {character.age}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                <div className="text-2xl font-bold text-green-600">${character.wealth}k</div>
                <div className="text-xs text-green-700">Net Worth</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{character.job || 'Unemployed'}</div>
                <div className="text-xs text-blue-700">Occupation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Life Events - InstLife style */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-sm mr-2">📖</span>
            Life Story
          </h3>
          
          <div className="space-y-3">
            {Object.entries(ageHistory)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .slice(0, 4)
              .map(([age, events]) => (
                <div key={age} className="space-y-2">
                  {events.map((event, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-gray-700 flex-1">{event}</span>
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg ml-3">Age {age}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            
            {Object.keys(ageHistory).length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                  ✨
                </div>
                <p className="text-gray-500 text-sm">Your life story will unfold here as you age up!</p>
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
