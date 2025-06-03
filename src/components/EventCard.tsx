
import React from 'react';
import { LifeEvent } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  event: LifeEvent;
  onChoice: (choiceId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onChoice }) => {
  return (
    <div className="mobile-card animate-scale-in apple-shadow-lg">
      {/* Mobile-optimized Event Header */}
      <div className="text-center pb-4 bg-gradient-to-b from-blue-50/50 to-transparent rounded-t-3xl p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 apple-shadow-sm">
          {event.emoji}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Mobile-first Choice Buttons */}
      <div className="space-y-3 px-6 pb-6">
        {event.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice.id)}
            className="mobile-button bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-900 dark:text-white apple-shadow-sm"
          >
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl flex-shrink-0">{choice.emoji}</span>
              <span className="text-sm font-medium leading-tight">{choice.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
