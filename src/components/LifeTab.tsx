import React from 'react';
import { Character } from '../types/game';
import { CharacterProfile } from './life/CharacterProfile';
import { PersonalInfo } from './life/PersonalInfo';
import { FamilySection } from './life/FamilySection';
import { LifeStory } from './life/LifeStory';
import { MobileLifeTimeline } from './MobileLifeTimeline';
import { useIsMobile } from '../hooks/use-mobile';

interface LifeTabProps {
  character: Character;
  eventHistory: string[];
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  onChoice?: (choiceId: string) => void;
}

export const LifeTab: React.FC<LifeTabProps> = ({
  character,
  eventHistory,
  ageHistory = {},
  onAgeUp,
  onChoice
}) => {
  const isMobile = useIsMobile();

  // Calculate current year based on character's birth year and age
  const getCurrentYear = () => {
    if (character.birthYear) {
      return character.birthYear + character.age;
    }
    // Fallback calculation
    const currentYear = new Date().getFullYear();
    return currentYear - character.age + character.age;
  };

  if (isMobile) {
    return <MobileLifeTimeline character={character} ageHistory={ageHistory} />;
  }

  // Desktop layout (unchanged)
  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <CharacterProfile character={character} />
          <PersonalInfo character={character} />
          <FamilySection character={character} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <LifeStory 
            character={character}
            ageHistory={ageHistory}
            onAgeUp={onAgeUp}
          />
        </div>
      </div>
    </div>
  );
};
