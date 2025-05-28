
import React from 'react';
import { Character, LifeEvent } from '../types/game';
import { CharacterStats } from './CharacterStats';
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
    if (character.age === 0) return `I was born a male in ${character.birthplace}. I was conceived on the beach in Hawaii.`;
    if (character.age < 5) return `I am ${character.age} years old and learning about the world around me.`;
    if (character.age < 13) return `I am ${character.age} years old and enjoying my childhood.`;
    if (character.age < 18) return `I am ${character.age} years old and navigating my teenage years.`;
    return `I am ${character.age} years old and living my adult life.`;
  };

  const getBirthdayInfo = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `My birthday is ${months[character.birthMonth - 1]} ${character.birthDay}. I am a ${character.zodiacSign.name}.`;
  };

  const getFamilyInfo = () => {
    const familyInfo = [`My name is ${character.name}.`];
    
    if (character.familyMembers) {
      character.familyMembers.forEach(member => {
        familyInfo.push(`My ${member.relationship} is ${member.name}, a ${member.job || 'unemployed person'} (age ${member.age}).`);
      });
    }
    
    if (character.pets && character.pets.length > 0) {
      character.pets.forEach(pet => {
        familyInfo.push(`We have a family ${pet.type} named ${pet.name}.`);
      });
    }
    
    return familyInfo;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Area */}
      <div className="px-4 py-3 space-y-3">
        {/* Age Display */}
        <div className="text-center py-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Age: {character.age} years
          </h3>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>{getAgeDescription()}</p>
            <p>{getBirthdayInfo()}</p>
            {getFamilyInfo().map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        </div>

        {/* Event Card - Show if there's a current event */}
        {currentEvent && onChoice && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <EventCard event={currentEvent} onChoice={onChoice} />
          </div>
        )}

        {/* Recent Activity */}
        {eventHistory.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-3">Recent Activity</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {eventHistory.slice(0, 5).map((event, index) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  {event}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats at bottom */}
      <div className="pb-24">
        <CharacterStats character={character} />
      </div>
    </div>
  );
};
