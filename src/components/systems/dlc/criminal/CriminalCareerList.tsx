
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Character } from '../../../../types/character';
import { criminalPaths } from './criminalPathsData';

interface CriminalCareerListProps {
  character: Character;
  selectedPath: string;
  onBackToSelection: () => void;
  onCareerAction: (action: string, data?: any) => void;
  getNotoriety: () => number;
  getCodingSkill: () => number;
}

export const CriminalCareerList: React.FC<CriminalCareerListProps> = ({
  character,
  selectedPath,
  onBackToSelection,
  onCareerAction,
  getNotoriety,
  getCodingSkill
}) => {
  const path = criminalPaths[selectedPath as keyof typeof criminalPaths];
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      case 'Extreme': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button 
          variant="outline" 
          onClick={onBackToSelection}
          className="text-sm"
        >
          ← Back to Paths
        </Button>
        <h2 className="text-xl font-bold">{path.name} Careers</h2>
      </div>
      
      <div className="space-y-3">
        {path.careers.map((career: any) => {
          const eligible = character.age >= career.requirements.age && 
                          getNotoriety() >= career.requirements.notoriety &&
                          (!career.requirements.coding || getCodingSkill() >= career.requirements.coding);
          
          const isCurrentJob = character.job === career.name;
          
          return (
            <Card key={career.id} className={`${eligible ? 'border-green-200' : 'border-gray-200'} ${isCurrentJob ? 'bg-blue-50 border-blue-300' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{career.name}</h3>
                    <p className="text-gray-600 text-sm">{career.description}</p>
                  </div>
                  <Badge className={getRiskColor(career.riskLevel)}>
                    {career.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="font-medium">Salary:</span> ${career.salary}k/year
                  </div>
                  <div>
                    <span className="font-medium">Requirements:</span> Age {career.requirements.age}+, Notoriety {career.requirements.notoriety}+
                    {career.requirements.coding && `, Coding ${career.requirements.coding}+`}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Your stats: Age {character.age}, Notoriety {getNotoriety()}, Coding {getCodingSkill()}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onCareerAction('join_criminal_career', career)}
                    disabled={!eligible || isCurrentJob}
                    variant={eligible && !isCurrentJob ? "default" : "secondary"}
                  >
                    {isCurrentJob ? 'Current' : eligible ? 'Join' : 'Locked'}
                  </Button>
                </div>
                
                {!eligible && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                    Requirements not met. Need: Age {career.requirements.age}+, Notoriety {career.requirements.notoriety}+
                    {career.requirements.coding && `, Coding ${career.requirements.coding}+`}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
