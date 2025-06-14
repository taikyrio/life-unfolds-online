
import React, { useState, useEffect } from 'react';
import { Character } from '../types/game';
import { gameLogger, LifeEvent } from '../utils/gameLogger';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TimelineHeader } from './timeline/TimelineHeader';
import { TimelineAgeCard } from './timeline/TimelineAgeCard';
import { TimelineEmptyState } from './timeline/TimelineEmptyState';
import { categorizeEvent } from './timeline/timelineUtils';

interface MobileLifeTimelineProps {
  character: Character;
  ageHistory: Record<number, string[]>;
}

export const MobileLifeTimeline: React.FC<MobileLifeTimelineProps> = ({ 
  character, 
  ageHistory 
}) => {
  const [expandedAges, setExpandedAges] = useState<Set<number>>(() => {
    // Initialize with current age and persist across navigation
    const saved = localStorage.getItem(`timeline_expanded_${character.id}`);
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch {
        return new Set([character.age]);
      }
    }
    return new Set([character.age]);
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const saved = localStorage.getItem(`timeline_filter_${character.id}`);
    return saved || 'all';
  });

  const toggleAge = (age: number) => {
    const newExpanded = new Set(expandedAges);
    if (newExpanded.has(age)) {
      newExpanded.delete(age);
    } else {
      newExpanded.add(age);
    }
    setExpandedAges(newExpanded);
    // Save to localStorage
    localStorage.setItem(`timeline_expanded_${character.id}`, JSON.stringify(Array.from(newExpanded)));
  };

  // Save filter selection
  useEffect(() => {
    localStorage.setItem(`timeline_filter_${character.id}`, selectedCategory);
  }, [selectedCategory, character.id]);

  const getEventsForAge = (age: number): LifeEvent[] => {
    const loggedEvents = gameLogger.getEventsByAge(age);
    const historyEvents = ageHistory[age] || [];

    // If we have logged events, use those primarily
    if (loggedEvents.length > 0) {
      return selectedCategory === 'all' 
        ? loggedEvents 
        : loggedEvents.filter(event => event.category === selectedCategory);
    }

    // Fallback to history events and convert to LifeEvent format
    const convertedEvents: LifeEvent[] = historyEvents.map((event, index) => ({
      id: `history_${age}_${index}`,
      age,
      year: (character.birthYear || 2000) + age,
      event,
      category: categorizeEvent(event),
      timestamp: Date.now() - (character.age - age) * 365 * 24 * 60 * 60 * 1000
    }));

    return selectedCategory === 'all' 
      ? convertedEvents 
      : convertedEvents.filter(event => event.category === selectedCategory);
  };

  const sortedAges = Object.keys(ageHistory)
    .map(Number)
    .sort((a, b) => b - a);

  if (sortedAges.length === 0) {
    return <TimelineEmptyState />;
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <TimelineHeader
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Scrollable Timeline using ScrollArea */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 pb-8">
          {sortedAges.map((age) => {
            const events = getEventsForAge(age);
            const isExpanded = expandedAges.has(age);

            if (selectedCategory !== 'all' && events.length === 0) {
              return null;
            }

            return (
              <TimelineAgeCard
                key={age}
                age={age}
                character={character}
                events={events}
                isExpanded={isExpanded}
                onToggleAge={toggleAge}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
