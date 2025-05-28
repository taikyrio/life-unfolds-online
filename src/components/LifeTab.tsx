
import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { EventCard } from './EventCard';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  currentEvent?: LifeEvent | null;
  onAgeUp: () => void;
  onChoice?: (choiceId: string) => void;
}

export const LifeTab: React.FC<LifeTabProps> = ({ 
  character, 
  eventHistory, 
  currentEvent, 
  onAgeUp, 
  onChoice 
}) => {
  const getAgeDescription = () => {
    if (character.age === 0) {
      return `I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${character.birthplace}. I was conceived on the beach in Hawaii.`;
    }
    
    const descriptions = [
      `Age ${character.age}: I am ${character.age} years old.`,
      `My birthday is ${getMonthName(character.birthMonth)} ${character.birthDay}. I am a ${character.zodiacSign.name}.`,
      `My name is ${character.name}.`
    ];

    // Add family information
    if (character.familyMembers) {
      character.familyMembers.forEach(member => {
        if (member.relationship === 'father') {
          descriptions.push(`My father is ${member.name}, a ${member.job || 'unemployed person'} (age ${member.age}).`);
        } else if (member.relationship === 'mother') {
          descriptions.push(`My mother is ${member.name}, a ${member.job || 'unemployed person'} (age ${member.age}).`);
        } else if (member.relationship === 'sibling') {
          descriptions.push(`I have a sibling named ${member.name}.`);
        }
      });
    }

    // Add pet information
    if (character.pets && character.pets.length > 0) {
      character.pets.forEach(pet => {
        descriptions.push(`We have a family ${pet.type} named ${pet.name}.`);
      });
    }

    return descriptions.join('\n\n');
  };

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
      <div className="px-4 py-6 space-y-6">
        {/* Age Description - BitLife Style */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {getAgeDescription()}
          </div>
        </div>

        {/* Event Card - Show if there's a current event */}
        {currentEvent && onChoice && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <EventCard event={currentEvent} onChoice={onChoice} />
          </div>
        )}
      </div>
    </div>
  );
};
