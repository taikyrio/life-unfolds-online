
import React from 'react';
import { Heart, Brain, DollarSign } from 'lucide-react';
import { LifeEvent } from '../../utils/gameLogger';
import { getEventIcon, getEventColor } from './timelineUtils';

interface TimelineEventItemProps {
  event: LifeEvent;
  index: number;
}

export const TimelineEventItem: React.FC<TimelineEventItemProps> = ({ event, index }) => {
  return (
    <div
      key={event.id || index}
      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm ${getEventColor(event.category)}`}>
        {getEventIcon(event.category)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-relaxed">
          {event.event}
        </p>
        {event.impact && (
          <div className="flex items-center gap-2 mt-2 text-xs">
            {event.impact.happiness && (
              <span className={`flex items-center gap-1 ${event.impact.happiness > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <Heart className="w-3 h-3" />
                {event.impact.happiness > 0 ? '+' : ''}{event.impact.happiness}
              </span>
            )}
            {event.impact.smarts && (
              <span className={`flex items-center gap-1 ${event.impact.smarts > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                <Brain className="w-3 h-3" />
                {event.impact.smarts > 0 ? '+' : ''}{event.impact.smarts}
              </span>
            )}
            {event.impact.money && (
              <span className={`flex items-center gap-1 ${event.impact.money > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <DollarSign className="w-3 h-3" />
                {event.impact.money > 0 ? '+' : ''}{event.impact.money}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
