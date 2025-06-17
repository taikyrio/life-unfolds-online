
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { iOSCard } from '../ui/iOSCard';
import { iOSButton } from '../ui/iOSButton';

export function EventScreen() {
  const { state, actions } = useGame();

  if (!state.currentEvent || !state.character) return null;

  const event = state.currentEvent;

  return (
    <div className="min-h-screen bg-ios-background flex flex-col ios-safe-area-top ios-safe-area-bottom">
      {/* Header */}
      <div className="px-4 py-6 border-b border-ios-separator">
        <div className="text-center">
          <div className="text-4xl mb-2">📝</div>
          <h1 className="ios-title-2 text-ios-label">Age {state.character.age}</h1>
        </div>
      </div>

      {/* Event Content */}
      <div className="flex-1 px-4 py-6">
        <iOSCard>
          <div className="p-6">
            <h2 className="ios-title-2 text-ios-label mb-4 text-center">
              {event.title}
            </h2>
            <p className="ios-body text-ios-secondary mb-8 text-center leading-relaxed">
              {event.description}
            </p>

            {/* Choices */}
            <div className="space-y-4">
              {event.choices.map((choice) => (
                <iOSButton
                  key={choice.id}
                  variant="secondary"
                  size="large"
                  onClick={() => actions.makeChoice(choice.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start">
                    {choice.icon && (
                      <span className="text-2xl mr-4 flex-shrink-0">{choice.icon}</span>
                    )}
                    <div>
                      <div className="ios-body font-medium">{choice.text}</div>
                      {choice.description && (
                        <div className="ios-footnote text-ios-secondary mt-1">
                          {choice.description}
                        </div>
                      )}
                    </div>
                  </div>
                </iOSButton>
              ))}
            </div>
          </div>
        </iOSCard>
      </div>
    </div>
  );
}
