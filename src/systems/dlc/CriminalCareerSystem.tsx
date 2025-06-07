
import React, { useState } from 'react';
import { Character } from '../../types/character';
import { CriminalProfile } from '../../components/systems/dlc/criminal/CriminalProfile';
import { CriminalPathSelector } from '../../components/systems/dlc/criminal/CriminalPathSelector';
import { CriminalCareerList } from '../../components/systems/dlc/criminal/CriminalCareerList';

interface CriminalCareerSystemProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CriminalCareerSystem: React.FC<CriminalCareerSystemProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const getNotoriety = () => {
    return character.customStats?.notoriety || 0;
  };

  const getCodingSkill = () => {
    return character.customStats?.coding || 0;
  };

  return (
    <div className="space-y-6">
      <CriminalProfile 
        character={character}
        getNotoriety={getNotoriety}
        getCodingSkill={getCodingSkill}
      />

      {!selectedPath ? (
        <CriminalPathSelector onSelectPath={setSelectedPath} />
      ) : (
        <CriminalCareerList
          character={character}
          selectedPath={selectedPath}
          onBackToSelection={() => setSelectedPath(null)}
          onCareerAction={onCareerAction}
          getNotoriety={getNotoriety}
          getCodingSkill={getCodingSkill}
        />
      )}
    </div>
  );
};
