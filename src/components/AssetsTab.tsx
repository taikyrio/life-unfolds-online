
import React from 'react';
import { Character } from '../types/game';

interface AssetsTabProps {
  character: Character;
}

export const AssetsTab: React.FC<AssetsTabProps> = ({ character }) => {
  return (
    <div className="text-center py-8 px-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Assets</h2>
      <p className="text-gray-600">Coming soon! Buy property, vehicles, and luxury items.</p>
    </div>
  );
};
