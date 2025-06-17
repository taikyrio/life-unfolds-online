
import React from 'react';
import { Character } from '../../types/core';

interface GameHeaderProps {
  character: Character;
}

export function GameHeader({ character }: GameHeaderProps) {
  return (
    <div className="px-4 py-6 border-b border-ios-separator">
      <div className="text-center">
        <h1 className="ios-large-title text-ios-label mb-1">{character.name}</h1>
        <p className="ios-body text-ios-secondary">
          Age {character.age} • {character.gender}
        </p>
        <p className="ios-footnote text-ios-secondary mt-1">
          {character.relationshipStatus} • ${character.money.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
