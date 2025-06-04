
import React from 'react';
import { LifeEvent } from '../types/game';

interface EventCardProps {
  event: LifeEvent;
  onChoice: (choiceId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onChoice }) => {
  return (
    <div className="apple-card animate-apple-scale-in vision-depth">
      {/* Apple-style Event Header */}
      <div className="text-center pb-6 bg-gradient-to-b from-blue-50/30 to-transparent rounded-t-3xl">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 apple-shadow-3 vision-elevated">
          {event.emoji}
        </div>
        <h3 className="apple-title-3 text-gray-900 dark:text-white mb-4">
          {event.title}
        </h3>
        <p className="apple-body text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
          {event.description}
        </p>
      </div>

      {/* Apple-style Choice Buttons */}
      <div className="space-y-4">
        {event.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice.id)}
            className="w-full apple-glass-card hover:bg-white/10 dark:hover:bg-white/5 text-gray-900 dark:text-white apple-press min-h-[60px] apple-shadow-2"
          >
            <div className="flex items-center gap-4 text-left px-2">
              <span className="text-3xl flex-shrink-0 vision-float">{choice.emoji}</span>
              <span className="apple-body font-medium leading-tight flex-1">{choice.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
