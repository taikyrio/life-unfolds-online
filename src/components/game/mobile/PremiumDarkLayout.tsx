
import React from 'react';
import { Character } from '../../../types/game';
import { PremiumStatsPanel } from './PremiumStatsPanel';
import { FluidNavigationBar } from './FluidNavigationBar';

interface PremiumDarkLayoutProps {
  character: Character;
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
  ageHistory: Record<number, string[]>;
  eventHistory?: string[];
}

export const PremiumDarkLayout: React.FC<PremiumDarkLayoutProps> = ({
  character,
  activeTab,
  onTabChange,
  onAgeUp,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills,
  ageHistory,
  eventHistory = []
}) => {
  const getCalendarYear = (age: number) => {
    const currentYear = new Date().getFullYear();
    const fallbackBirthYear = currentYear - character.age;
    return Math.min(fallbackBirthYear + age, currentYear);
  };

  const formatLifeEvents = () => {
    const events: Array<{ age: number; year: number; events: string[] }> = [];
    
    if (Object.keys(ageHistory).length === 0) {
      events.push({
        age: 0,
        year: getCalendarYear(0),
        events: [`👶 You were born as ${character.name}! Your journey begins...`]
      });
    }

    Object.entries(ageHistory)
      .sort(([ageA], [ageB]) => Number(ageB) - Number(ageA))
      .forEach(([age, ageEvents]) => {
        events.push({
          age: Number(age),
          year: getCalendarYear(Number(age)),
          events: ageEvents.length > 0 ? ageEvents : [`Nothing notable happened this year.`]
        });
      });

    return events;
  };

  const lifeEvents = formatLifeEvents();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      
      {/* Header with character name */}
      <div className="relative z-10 px-6 pt-12 pb-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white/95 tracking-tight">
                {character.name}
              </h1>
              <p className="text-white/60 text-sm font-medium">
                Age {character.age} • Living your story
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main story area */}
      <div className="flex-1 px-4 pb-48 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {lifeEvents.map((yearData, index) => (
            <div key={`${yearData.age}-${index}`} className="group">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl transition-all duration-500 hover:bg-white/8 hover:scale-[1.02] hover:shadow-3xl">
                {/* Year header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{yearData.age}</span>
                    </div>
                    <div>
                      <div className="text-white/90 font-semibold">
                        Age {yearData.age}
                        {yearData.age === character.age && (
                          <span className="ml-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs rounded-full font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-white/50 text-sm">{yearData.year}</div>
                    </div>
                  </div>
                  <div className="text-white/30 group-hover:text-white/60 transition-colors">
                    ⌄
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-3">
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-white/80 leading-relaxed">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats panel */}
      <PremiumStatsPanel character={character} />

      {/* Navigation */}
      <FluidNavigationBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        onAgeUp={onAgeUp}
        character={character}
        onShowActivityMenu={onShowActivityMenu}
        onShowRelationshipsMenu={onShowRelationshipsMenu}
        onShowAssetsMenu={onShowAssetsMenu}
        onShowPersonalitySkills={onShowPersonalitySkills}
      />
    </div>
  );
};
