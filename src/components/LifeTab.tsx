
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
      <div className="h-full bg-gray-100 flex flex-col">
        {/* Character Header Card */}
        <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{character.name}</h2>
            <p className="text-sm text-gray-600 mb-3">
              {character.age} Years Old
            </p>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: 'Happiness', value: Math.round(character.happiness), color: 'text-yellow-600' },
                { label: 'Health', value: Math.round(character.health), color: 'text-red-600' },
                { label: 'Smarts', value: Math.round(character.smarts), color: 'text-blue-600' },
                { label: 'Looks', value: Math.round(character.looks), color: 'text-purple-600' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-medium text-gray-900">${character.wealth}k</div>
                <div className="text-xs text-gray-500">Net Worth</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-medium text-gray-900">{character.job || 'Unemployed'}</div>
                <div className="text-xs text-gray-500">Occupation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Life Events Timeline */}
        <div className="flex-1 bg-white mx-4 my-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Life Story</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {Object.entries(ageHistory)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([age, events]) => (
                  <div key={age} className="space-y-2">
                    <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      {age} Years Old
                    </div>
                    {events.map((event, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 ml-4 border-l-2 border-blue-200">
                        <p className="text-sm text-gray-700">{event}</p>
                      </div>
                    ))}
                  </div>
                ))}
              
              {Object.keys(ageHistory).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">👶</div>
                  <p className="text-gray-500 text-sm">You were just born! Your life story will unfold here as you age up.</p>
                </div>
              )}
            </div>
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
