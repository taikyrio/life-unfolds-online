
import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { iOSButton } from '../ui/iOSButton';
import { iOSCard } from '../ui/iOSCard';

export function WelcomeScreen() {
  const { actions } = useGame();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const handleStartGame = () => {
    if (name.trim()) {
      actions.startNewGame({ name: name.trim(), gender });
    }
  };

  return (
    <div className="min-h-screen bg-ios-background flex flex-col ios-safe-area-top ios-safe-area-bottom">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="ios-large-title text-ios-label mb-2">Life Unfolds</h1>
        <p className="ios-body text-ios-secondary">Live your life, make your choices</p>
      </div>

      {/* Character Creation */}
      <div className="flex-1 px-4">
        <iOSCard className="mb-6">
          <div className="p-6">
            <h2 className="ios-title-2 text-ios-label mb-6 text-center">Create Your Character</h2>
            
            {/* Name Input */}
            <div className="mb-6">
              <label className="ios-headline text-ios-label block mb-3">What's your name?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-4 bg-ios-tertiary border border-ios-separator rounded-xl ios-body text-ios-label placeholder-ios-secondary focus:outline-none focus:border-ios-blue"
                maxLength={20}
              />
            </div>

            {/* Gender Selection */}
            <div className="mb-8">
              <label className="ios-headline text-ios-label block mb-3">Gender</label>
              <div className="flex gap-3">
                {(['male', 'female', 'other'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setGender(option)}
                    className={`flex-1 p-4 rounded-xl ios-touch-feedback ios-ease-animation ${
                      gender === option
                        ? 'bg-ios-blue text-white'
                        : 'bg-ios-tertiary text-ios-label border border-ios-separator'
                    }`}
                  >
                    <span className="ios-body capitalize">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <iOSButton
              variant="primary"
              size="large"
              onClick={handleStartGame}
              disabled={!name.trim()}
              className="w-full"
            >
              Start New Life
            </iOSButton>
          </div>
        </iOSCard>

        {/* Info Card */}
        <iOSCard>
          <div className="p-6">
            <h3 className="ios-headline text-ios-label mb-3">How to Play</h3>
            <ul className="space-y-2">
              <li className="ios-body text-ios-secondary flex items-start">
                <span className="mr-3">🎂</span>
                Age up year by year and make life choices
              </li>
              <li className="ios-body text-ios-secondary flex items-start">
                <span className="mr-3">📊</span>
                Manage your health, happiness, smarts, and looks
              </li>
              <li className="ios-body text-ios-secondary flex items-start">
                <span className="mr-3">🎯</span>
                Unlock achievements and live different lives
              </li>
            </ul>
          </div>
        </iOSCard>
      </div>
    </div>
  );
}
