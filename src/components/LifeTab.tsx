import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { EventCard } from './EventCard';

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
      return `I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${character.birthplace}. I was conceived on the beach in Hawaii.`;
    }
    
    const baseDescription = `Age ${age}: I am ${age} years old.`;
    const events = ageHistory[age] || [];
    
    if (events.length === 0) {
      return baseDescription;
    }
    
    return [baseDescription, ...events].join('\n');
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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'January';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Area */}
      <div className="px-4 py-6 space-y-6 max-h-screen overflow-y-auto">
        {/* Character Info at top */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-700 leading-relaxed">
            <div className="font-semibold text-lg mb-3">{character.name}</div>
            <div>Birthday: {getMonthName(character.birthMonth)} {character.birthDay}</div>
            <div>Zodiac Sign: {character.zodiacSign.emoji} {character.zodiacSign.name}</div>
            <div>Birthplace: {character.birthplace}</div>
            
            {/* Family Info */}
            {character.familyMembers.length > 0 && (
              <div className="mt-4">
                <div className="font-medium mb-2">Family:</div>
                {character.familyMembers.slice(0, 3).map(member => (
                  <div key={member.id} className="text-sm">
                    {member.relationship === 'father' && `Father: ${member.name}`}
                    {member.relationship === 'mother' && `Mother: ${member.name}`}
                    {member.relationship === 'sibling' && `Sibling: ${member.name}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Event Card - Show if there's a current event */}
        {currentEvent && onChoice && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <EventCard event={currentEvent} onChoice={onChoice} />
          </div>
        )}

        {/* Age History - BitLife Style */}
        <div className="space-y-3">
          {ageEntries.reverse().map(entry => (
            <div key={entry.age} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {entry.description}
              </div>
            </div>
          ))}
        </div>

        {/* Age Up Button at bottom */}
        {!currentEvent && (
          <div className="text-center py-8">
            <button
              onClick={onAgeUp}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors"
            >
              Age Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
