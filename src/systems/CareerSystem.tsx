
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { CriminalDLC } from './dlc/CriminalDLC';
import { FameDLC } from './dlc/FameDLC';
import { MusicianDLC } from './dlc/MusicianDLC';
import { CareerHeader } from '../components/careers/CareerHeader';
import { CurrentJobCard } from '../components/careers/CurrentJobCard';
import { JobListings } from '../components/careers/JobListings';
import { careerTracks } from '../components/careers/CareerData';

interface CareerSystemProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CareerSystem: React.FC<CareerSystemProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [activeDLC, setActiveDLC] = useState<string | null>(null);

  const isEligible = (career: typeof careerTracks[0]) => {
    const meetsEducation = career.education === 'None' || 
      (character.education?.completedStages || []).includes(career.education.toLowerCase());
    const meetsSmarts = character.smarts >= career.smarts;
    const meetsAge = character.age >= 16;
    return meetsEducation && meetsSmarts && meetsAge;
  };

  const getCurrentSalary = () => {
    if (!character.job) return 0;
    const career = careerTracks.find((c: any) => c.name === character.job);
    if (!career) return character.salary || 0;
    return career.baseSalary + ((character.jobLevel || 0) * 15);
  };

  const getPromotionRequirements = () => {
    if (!character.job) return null;
    const career = careerTracks.find((c: any) => c.name === character.job);
    if (!career || (character.jobLevel || 0) >= career.maxLevel) return null;
    
    const nextLevel = (character.jobLevel || 0) + 1;
    const smartsRequired = career.smarts + (nextLevel * 10);
    const yearsRequired = nextLevel * 2;
    
    return { smartsRequired, yearsRequired };
  };

  if (activeDLC === 'criminal') {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setActiveDLC(null)}
          className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white/90 transition-all duration-200"
        >
          ← Back to Careers
        </Button>
        <CriminalDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  if (activeDLC === 'fame') {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setActiveDLC(null)}
          className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white/90 transition-all duration-200"
        >
          ← Back to Careers
        </Button>
        <FameDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  if (activeDLC === 'music') {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setActiveDLC(null)}
          className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white/90 transition-all duration-200"
        >
          ← Back to Careers
        </Button>
        <MusicianDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CareerHeader onSelectDLC={setActiveDLC} />
      
      <CurrentJobCard
        character={character}
        getCurrentSalary={getCurrentSalary}
        getPromotionRequirements={getPromotionRequirements}
        onCareerAction={onCareerAction}
      />

      <JobListings
        character={character}
        careerTracks={careerTracks}
        isEligible={isEligible}
        onCareerAction={onCareerAction}
      />
    </div>
  );
};
