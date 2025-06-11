import React, { useState, useEffect, useRef } from 'react';
import { Character } from '../types/game';
import { gameLogger, LifeEvent } from '../utils/gameLogger';
import { ChevronDown, Calendar, TrendingUp, TrendingDown, Heart, Brain, Eye, DollarSign } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'All Events', icon: '📋', color: 'bg-gray-500' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'bg-blue-500' },
    { id: 'career', name: 'Career', icon: '💼', color: 'bg-green-500' },
    { id: 'relationship', name: 'Love', icon: '❤️', color: 'bg-red-500' },
    { id: 'health', name: 'Health', icon: '🏥', color: 'bg-orange-500' },
    { id: 'finance', name: 'Money', icon: '💰', color: 'bg-yellow-500' },
    { id: 'achievement', name: 'Goals', icon: '🏆', color: 'bg-purple-500' }
  ];

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

  const categorizeEvent = (event: string): LifeEvent['category'] => {
    const eventLower = event.toLowerCase();
    if (eventLower.includes('school') || eventLower.includes('grade') || eventLower.includes('study')) return 'education';
    if (eventLower.includes('job') || eventLower.includes('work') || eventLower.includes('career')) return 'career';
    if (eventLower.includes('love') || eventLower.includes('dating') || eventLower.includes('marriage')) return 'relationship';
    if (eventLower.includes('health') || eventLower.includes('sick') || eventLower.includes('doctor')) return 'health';
    if (eventLower.includes('money') || eventLower.includes('buy') || eventLower.includes('$')) return 'finance';
    if (eventLower.includes('achievement') || eventLower.includes('award') || eventLower.includes('won')) return 'achievement';
    return 'family';
  };

  const getEventIcon = (category: LifeEvent['category']) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || '📝';
  };

  const getEventColor = (category: LifeEvent['category']) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.color || 'bg-gray-500';
  };

  const sortedAges = Object.keys(ageHistory)
    .map(Number)
    .sort((a, b) => b - a);

  const scrollToAge = (age: number) => {
    const element = document.getElementById(`age-${age}`);
    if (element && scrollRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auto-scroll to current age on load, but don't reset expanded ages
  useEffect(() => {
    if (sortedAges.length > 0) {
      setTimeout(() => scrollToAge(character.age), 100);
    }
  }, [character.age, sortedAges.length]);

  if (sortedAges.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-6xl mb-4">👶</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Life!</h3>
        <p className="text-gray-600 mb-4">Your story begins now. Every choice matters.</p>
        <div className="bg-blue-100 rounded-lg p-3 text-sm text-blue-800">
          Tap "Age" to start your journey and see your life unfold
        </div>
      </div>
    );
  }

  // Get events for current age filter
  const getEventsToShow = () => {
    if (selectedCategory === 'all') {
      // Show all events from gameLogger
      const allEvents = gameLogger.getAllEvents();
      return allEvents.map(event => ({ age: event.age, event: event.event }));
    } else {
      // Filter by category using gameLogger
      const categoryEvents = gameLogger.getEventsByCategory(selectedCategory as any);
      return categoryEvents.map(event => ({ age: event.age, event: event.event }));
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sticky Header with Filters */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900">Life Timeline</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              <span>Filter</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center p-2 rounded-lg text-xs transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg mb-1">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Timeline */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain relative mobile-scroll"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100vh - 140px)',
          maxHeight: 'calc(100vh - 140px)'
        }}
      >
        <div className="p-4 space-y-4 pb-8">
          {sortedAges.map((age) => {
            const events = getEventsForAge(age);
            const isExpanded = expandedAges.has(age);
            const isCurrentAge = age === character.age;

            if (selectedCategory !== 'all' && events.length === 0) {
              return null;
            }

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
                  onClick={() => toggleAge(age)}
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
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};