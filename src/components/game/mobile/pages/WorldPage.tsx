
import React from 'react';
import { Character } from '../../../../types/game';
import { AssetsMenu } from '../../../menus/AssetsMenu';

interface WorldPageProps {
  character: Character;
  onClose: () => void;
}

export const WorldPage: React.FC<WorldPageProps> = ({
  character,
  onClose
}) => {
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">World</h1>
          <p className="text-white/70 text-sm">Explore assets and opportunities</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AssetsMenu
          character={character}
          onClose={onClose}
          isOpen={true}
        />
      </div>
    </div>
  );
};
