
import React from 'react';
import { LifeEvent } from '../../types/core';
import { iOSCard } from '../ui/iOSCard';

interface LifeTimelineProps {
  events: LifeEvent[];
}

export function LifeTimeline({ events }: LifeTimelineProps) {
  const recentEvents = events.slice(-10).reverse();

  if (recentEvents.length === 0) {
    return (
      <iOSCard>
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="ios-headline text-ios-label mb-2">Your Life Story</h3>
          <p className="ios-body text-ios-secondary">
            Age up to start creating your life story!
          </p>
        </div>
      </iOSCard>
    );
  }

  return (
    <iOSCard>
      <div className="p-4">
        <h3 className="ios-headline text-ios-label mb-4 px-2">Recent Events</h3>
        <div className="space-y-3">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-3 bg-ios-tertiary rounded-lg">
              <div className="text-2xl flex-shrink-0">{event.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="ios-subhead font-medium text-ios-label truncate">
                    {event.title}
                  </h4>
                  <span className="ios-caption-1 text-ios-secondary flex-shrink-0 ml-2">
                    Age {event.age}
                  </span>
                </div>
                <p className="ios-footnote text-ios-secondary leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </iOSCard>
  );
}
