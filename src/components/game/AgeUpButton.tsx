
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { iOSButton } from '../ui/iOSButton';

export function AgeUpButton() {
  const { actions } = useGame();

  return (
    <iOSButton
      variant="primary"
      size="large"
      onClick={actions.ageUp}
      className="w-full"
    >
      <div className="flex items-center justify-center">
        <span className="text-2xl mr-3">🎂</span>
        <span>Age Up</span>
      </div>
    </iOSButton>
  );
}
