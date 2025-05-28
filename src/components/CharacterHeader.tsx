import React from 'react';
import { Character } from '../types/game';
import { formatSalary } from '../utils/gameUtils';

interface CharacterHeaderProps {
  character: Character;
}

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  return (
    <div className="bg-white p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👶
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-blue-600 truncate">{character.name}</h2>
              <span className="text-blue-500 text-sm">ℹ️</span>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {character.age === 0 ? 'Infant' : 
               character.age < 5 ? 'Toddler' :
               character.age < 13 ? 'Child' :
               character.age < 18 ? 'Teenager' : 'Adult'}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-bold text-green-600">${character.wealth.toLocaleString()}</div>
          <div className="text-xs text-blue-500">Bank Balance</div>
        </div>
      </div>
    </div>
  );
};
```import React from 'react';
import { Character } from '../types/game';
import { formatSalary } from '../utils/gameUtils';

interface CharacterHeaderProps {
  character: Character;
}

const getLifeStage = (age: number): string => {
  if (age === 0) return 'Infant';
  if (age < 5) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  return 'Adult';
};

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  return (
    <div className="bg-white p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👶
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-blue-600 truncate">{character.name}</h2>
              <span className="text-blue-500 text-sm">ℹ️</span>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {character.age === 0 ? 'Infant' : 
               character.age < 5 ? 'Toddler' :
               character.age < 13 ? 'Child' :
               character.age < 18 ? 'Teenager' : 'Adult'}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-bold text-green-600">${character.wealth.toLocaleString()}</div>
          <div className="text-xs text-blue-500">Bank Balance</div>
        </div>
      </div>
    </div>
  );
};
```

Display pregnancy status in character header

```javascript
import React from 'react';
import { Character } from '../types/game';
import { formatSalary } from '../utils/gameUtils';

interface CharacterHeaderProps {
  character: Character;
}

const getLifeStage = (age: number): string => {
  if (age === 0) return 'Infant';
  if (age < 5) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  return 'Adult';
};

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character }) => {
  return (
    <div className="bg-white p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            👶
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-blue-600 truncate">{character.name}</h2>
              <span className="text-blue-500 text-sm">ℹ️</span>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {character.age === 0 ? 'Infant' : 
               character.age < 5 ? 'Toddler' :
               character.age < 13 ? 'Child' :
               character.age < 18 ? 'Teenager' : 'Adult'}
               {character.isPregnant && ` • 🤰 Pregnant (${character.pregnancyMonths || 0}/9)`}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-bold text-green-600">${character.wealth.toLocaleString()}</div>
          <div className="text-xs text-blue-500">Bank Balance</div>
        </div>
      </div>
    </div>
  );
};