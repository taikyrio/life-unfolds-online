import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../types/game';
import { Briefcase, TrendingUp, DollarSign, Star, Skull, Trophy, Shield } from 'lucide-react';
import { CriminalDLC } from './dlc/CriminalDLC';
import { FameDLC } from './dlc/FameDLC';

interface CareerSystemProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CareerSystem: React.FC<CareerSystemProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [activeDLC, setActiveDLC] = useState<string | null>(null);

  const careerTracks = [
    // Entry Level
    { id: 'retail', name: 'Retail Worker', baseSalary: 25, maxLevel: 3, education: 'None', smarts: 0 },
    { id: 'food_service', name: 'Food Service', baseSalary: 22, maxLevel: 3, education: 'None', smarts: 0 },
    
    // Skilled Labor
    { id: 'mechanic', name: 'Mechanic', baseSalary: 45, maxLevel: 5, education: 'High School', smarts: 40 },
    { id: 'electrician', name: 'Electrician', baseSalary: 55, maxLevel: 5, education: 'High School', smarts: 50 },
    
    // Professional
    { id: 'teacher', name: 'Teacher', baseSalary: 48, maxLevel: 4, education: 'University', smarts: 70 },
    { id: 'nurse', name: 'Nurse', baseSalary: 65, maxLevel: 5, education: 'University', smarts: 75 },
    { id: 'engineer', name: 'Engineer', baseSalary: 75, maxLevel: 6, education: 'University', smarts: 80 },
    
    // Executive
    { id: 'manager', name: 'Manager', baseSalary: 85, maxLevel: 7, education: 'University', smarts: 75 },
    { id: 'executive', name: 'Executive', baseSalary: 120, maxLevel: 8, education: 'Graduate', smarts: 85 },
    
    // Specialized
    { id: 'doctor', name: 'Doctor', baseSalary: 185, maxLevel: 6, education: 'Medical', smarts: 90 },
    { id: 'lawyer', name: 'Lawyer', baseSalary: 125, maxLevel: 6, education: 'Law', smarts: 85 }
  ];

  const isEligible = (career: typeof careerTracks[0]) => {
    const meetsEducation = career.education === 'None' || 
      character.education.some(ed => ed.includes(career.education.split(' ')[0]));
    const meetsSmarts = character.smarts >= career.smarts;
    const meetsAge = character.age >= 16;
    return meetsEducation && meetsSmarts && meetsAge;
  };

  const getCurrentSalary = () => {
    if (!character.job) return 0;
    const career = careerTracks.find(c => c.name === character.job);
    if (!career) return character.salary;
    return career.baseSalary + (character.jobLevel * 15);
  };

  const getPromotionRequirements = () => {
    if (!character.job) return null;
    const career = careerTracks.find(c => c.name === character.job);
    if (!career || character.jobLevel >= career.maxLevel) return null;
    
    const nextLevel = character.jobLevel + 1;
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
          className="mb-4"
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
          className="mb-4"
        >
          ← Back to Careers
        </Button>
        <FameDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Special Careers Section */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Special Careers - DLC Packs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="justify-start h-auto p-4 bg-red-50 border-red-200 hover:bg-red-100"
              onClick={() => setActiveDLC('criminal')}
            >
              <div className="flex items-center gap-3">
                <Skull className="h-6 w-6 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-red-800">Criminal Empire</div>
                  <div className="text-sm text-red-600">Build your criminal organization</div>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="justify-start h-auto p-4 bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
              onClick={() => setActiveDLC('fame')}
            >
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-600" />
                <div className="text-left">
                  <div className="font-semibold text-yellow-800">Fame & Fortune</div>
                  <div className="text-sm text-yellow-600">Become a celebrity or influencer</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Job Status */}
      {character.job ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              Current Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{character.job}</span>
                <Badge variant="secondary">Level {character.jobLevel}</Badge>
              </div>
              <div className="text-sm text-gray-600">
                <div>💰 Salary: ${getCurrentSalary()}k/year</div>
              </div>
            </div>

            {getPromotionRequirements() && (
              <div className="bg-white rounded-lg p-3 border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Next Promotion
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Smarts needed: {getPromotionRequirements()!.smartsRequired}</div>
                  <div>Experience: {getPromotionRequirements()!.yearsRequired} years</div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => onCareerAction('promote')}
                  disabled={character.smarts < getPromotionRequirements()!.smartsRequired}
                >
                  Request Promotion
                </Button>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onCareerAction('quit')}
            >
              Quit Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center text-gray-500">
            <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Currently unemployed</p>
          </CardContent>
        </Card>
      )}

      {/* Available Jobs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Regular Job Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {careerTracks.filter(career => isEligible(career)).map(career => (
            <div key={career.id} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium">{career.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${career.baseSalary}k starting
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Max Level {career.maxLevel}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Requires: {career.education}, {career.smarts} smarts
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onCareerAction('apply', { careerId: career.id })}
                  disabled={character.job === career.name}
                >
                  {character.job === career.name ? 'Current' : 'Apply'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
