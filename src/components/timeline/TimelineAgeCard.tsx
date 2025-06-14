
import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Character } from '../../types/game';
import { LifeEvent } from '../../utils/gameLogger';
import { TimelineEventItem } from './TimelineEventItem';

interface TimelineAgeCardProps {
  age: number;
  character: Character;
  events: LifeEvent[];
  isExpanded: boolean;
  onToggleAge: (age: number) => void;
}

export const TimelineAgeCard: React.FC<TimelineAgeCardProps> = ({
  age,
  character,
  events,
  isExpanded,
  onToggleAge
}) => {
  const isCurrentAge = age === character.age;

  return (
    <div
      key={age}
      id={`age-${age}`}
      className={`rounded-xl shadow-sm border transition-all ${
        isCurrentAge 
          ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Age Header */}
      <button
        onClick={() => onToggleAge(age)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors"
      >
        <div className="flex items-center gap-3">
          {isCurrentAge && (
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          )}
          <div className="text-left">
            <div className="text-lg font-bold text-gray-900">
              Age {age}
              {isCurrentAge && <span className="text-orange-600 ml-2">(Current)</span>}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {(character.birthYear || 2000) + age}
              <span className="ml-2">{events.length} events</span>
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Events List */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {events.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No events in this category
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {events.map((event, index) => (
                <TimelineEventItem key={event.id || index} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
