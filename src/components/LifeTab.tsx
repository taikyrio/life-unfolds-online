import React from 'react';
import { Character } from '../types/game';
import { CharacterStats } from './CharacterStats';
import { MapPin, Calendar, User, Users } from 'lucide-react';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  onAgeUp: () => void;
}

export const LifeTab: React.FC<LifeTabProps> = ({ character, eventHistory, onAgeUp }) => {
  const getAgeDescription = () => {
    if (character.age === 0) return "I was born a male in Auckland, New Zealand. I was conceived on the beach in Hawaii.";
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
    return `My birthday is ${months[character.birthMonth - 1]} ${character.birthDay}. I am a ${character.zodiacSign.name} ${character.zodiacSign.emoji}.`;
  };

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <CharacterStats character={character} />

      <div className="px-4 mt-6 space-y-4">
        {/* Age Button */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Age Up</h3>
                <p className="text-sm text-gray-600">Get older and experience life</p>
              </div>
            </div>
            <button
              onClick={onAgeUp}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors shadow-lg hover:scale-105 active:scale-95"
            >
              + Age
            </button>
          </div>
        </div>

        {/* Age and Bio Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Age: {character.age} years
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            {getAgeDescription()}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {getBirthdayInfo()}
          </p>
        </div>

        {/* Family Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-green-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Family</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">My name is {character.name}.</p>
              </div>
            </div>
            {character.familyMembers?.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">
                    My {member.relationship} is {member.name} (age {member.age}).
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="text-green-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Current Location
            </h3>
          </div>
          <p className="text-gray-600">
            I currently live in {character.birthplace}.
          </p>
        </div>

        {/* Activity History Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Life Events
            </h3>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {eventHistory.length > 0 ? (
              eventHistory.slice(0, 10).map((event, index) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                  {event}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No life events yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};