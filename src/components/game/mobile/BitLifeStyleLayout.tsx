
import React from 'react';
import { Character } from '../../../types/game';
import { CharacterStatsBar } from '../../stats/CharacterStatsBar';
import { ResponsiveBottomNav } from '../../navigation/ResponsiveBottomNav';

interface BitLifeStyleLayoutProps {
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

export const BitLifeStyleLayout: React.FC<BitLifeStyleLayoutProps> = ({
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
    
    // Add birth event if no history exists
    if (Object.keys(ageHistory).length === 0) {
      events.push({
        age: 0,
        year: getCalendarYear(0),
        events: [`👶 You were born! Your parents are excited to welcome you into their family.`]
      });
    }

    // Add events from age history
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
    <div className="h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col">
      {/* Header with Character Name */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-600/30">
        <h1 className="text-xl font-bold text-white text-center">
          {character.name}, {character.age}
        </h1>
      </div>

      {/* Main Content Area - Scrollable Life Timeline */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Life Timeline</h2>
            <button className="text-blue-500 text-sm font-medium">
              Filter ⌄
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4 mobile-scroll">
          <div className="space-y-3">
            {lifeEvents.map((yearData, index) => (
              <div 
                key={`${yearData.age}-${index}`}
                className="bg-orange-50 rounded-xl p-4 border border-orange-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">
                      Age {yearData.age}
                      {yearData.age === character.age && (
                        <span className="text-orange-600 ml-1">(Current)</span>
                      )}
                    </span>
                  </div>
                  <button className="text-gray-400">⌄</button>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  📅 {yearData.year} • {yearData.events.length} event{yearData.events.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-2">
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="text-sm text-gray-700 bg-white p-2 rounded-lg">
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Stats Bar */}
      <CharacterStatsBar character={character} />

      {/* Bottom Navigation */}
      <ResponsiveBottomNav
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
