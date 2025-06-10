import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Character } from '../../types/game';
import { Briefcase, TrendingUp, DollarSign, Star, Skull, Trophy, Music2, ChevronRight } from 'lucide-react';
import { CriminalDLC } from './dlc/CriminalDLC';
import { FameDLC } from './dlc/FameDLC';
import { MusicianDLC } from './dlc/MusicianDLC';
import { formatMoney } from '../../utils/moneyFormatting';

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
    // Entry Level - Annual salaries
    { id: 'retail', name: 'Retail Worker', baseSalary: 25000, maxLevel: 3, education: 'None', smarts: 0 },
    { id: 'food_service', name: 'Food Service', baseSalary: 22000, maxLevel: 3, education: 'None', smarts: 0 },
    
    // Skilled Labor
    { id: 'mechanic', name: 'Mechanic', baseSalary: 45000, maxLevel: 5, education: 'High School', smarts: 40 },
    { id: 'electrician', name: 'Electrician', baseSalary: 55000, maxLevel: 5, education: 'High School', smarts: 50 },
    
    // Professional
    { id: 'teacher', name: 'Teacher', baseSalary: 48000, maxLevel: 4, education: 'University', smarts: 70 },
    { id: 'nurse', name: 'Nurse', baseSalary: 65000, maxLevel: 5, education: 'University', smarts: 75 },
    { id: 'engineer', name: 'Engineer', baseSalary: 75000, maxLevel: 6, education: 'University', smarts: 80 },
    
    // Executive
    { id: 'manager', name: 'Manager', baseSalary: 85000, maxLevel: 7, education: 'University', smarts: 75 },
    { id: 'executive', name: 'Executive', baseSalary: 120000, maxLevel: 8, education: 'Graduate', smarts: 85 },
    
    // Specialized
    { id: 'doctor', name: 'Doctor', baseSalary: 185000, maxLevel: 6, education: 'Medical', smarts: 90 },
    { id: 'lawyer', name: 'Lawyer', baseSalary: 125000, maxLevel: 6, education: 'Law', smarts: 85 }
  ];

  const isEligible = (career: typeof careerTracks[0]) => {
    const meetsEducation = career.education === 'None' || 
      (character.educationLevel && character.educationLevel.toLowerCase().includes(career.education.toLowerCase()));
    const meetsSmarts = character.smarts >= career.smarts;
    const meetsAge = character.age >= 16;
    return meetsEducation && meetsSmarts && meetsAge;
  };

  const getCurrentSalary = () => {
    if (!character.job) return 0;
    const career = careerTracks.find(c => c.name === character.job);
    if (!career) return character.salary || 0;
    const jobLevel = character.jobLevel || 1;
    return career.baseSalary + (jobLevel * 5000); // $5k raise per level
  };

  const getPromotionRequirements = () => {
    if (!character.job) return null;
    const career = careerTracks.find(c => c.name === character.job);
    const jobLevel = character.jobLevel || 1;
    if (!career || jobLevel >= career.maxLevel) return null;
    
    const nextLevel = jobLevel + 1;
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
          className="mb-4 text-white"
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
          className="mb-4 text-white"
        >
          ← Back to Careers
        </Button>
        <FameDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  if (activeDLC === 'musician') {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setActiveDLC(null)}
          className="mb-4 text-white"
        >
          ← Back to Careers
        </Button>
        <MusicianDLC character={character} onCareerAction={onCareerAction} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Special Careers Section */}
      <Card className="glass border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Star className="h-5 w-5 text-purple-400" />
            Special Careers - DLC Packs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="justify-between h-auto p-4 bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-white"
              onClick={() => setActiveDLC('criminal')}
            >
              <div className="flex items-center gap-3">
                <Skull className="h-6 w-6 text-red-400" />
                <div className="text-left">
                  <div className="font-semibold text-red-300">Criminal Empire</div>
                  <div className="text-sm text-red-400">Build your criminal organization</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-red-400" />
            </Button>
            
            <Button
              variant="outline"
              className="justify-between h-auto p-4 bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20 text-white"
              onClick={() => setActiveDLC('fame')}
            >
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold text-yellow-300">Fame & Fortune</div>
                  <div className="text-sm text-yellow-400">Become a celebrity or influencer</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-yellow-400" />
            </Button>

            <Button
              variant="outline"
              className="justify-between h-auto p-4 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-white"
              onClick={() => setActiveDLC('musician')}
              disabled={character.age < 10}
            >
              <div className="flex items-center gap-3">
                <Music2 className="h-6 w-6 text-purple-400" />
                <div className="text-left">
                  <div className="font-semibold text-purple-300">Musician</div>
                  <div className="text-sm text-purple-400">Create music, tour, and build your fanbase</div>
                  {character.age < 10 && <div className="text-xs text-red-400">Available at age 10+</div>}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-purple-400" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Job Status */}
      {character.job ? (
        <Card className="glass border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Briefcase className="h-5 w-5 text-green-400" />
              Current Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-white">{character.job}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">Level {character.jobLevel}</Badge>
              </div>
              <div className="text-sm text-white/70">
                <div>💰 Salary: {formatMoney(getCurrentSalary())}/year</div>
              </div>
            </div>

            {getPromotionRequirements() && (
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1 text-white">
                  <TrendingUp className="h-4 w-4" />
                  Next Promotion
                </h4>
                <div className="text-xs text-white/70 space-y-1">
                  <div>Smarts needed: {getPromotionRequirements()!.smartsRequired}</div>
                  <div>Experience: {getPromotionRequirements()!.yearsRequired} years</div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 bg-green-500 hover:bg-green-600"
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
              className="w-full border-red-500/50 text-red-300 hover:bg-red-500/20"
              onClick={() => onCareerAction('quit')}
            >
              Quit Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass border-white/20">
          <CardContent className="p-4 text-center text-white/70">
            <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Currently unemployed</p>
          </CardContent>
        </Card>
      )}

      {/* Available Jobs */}
      <Card className="glass border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Regular Job Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {careerTracks.filter(career => isEligible(career)).map(career => (
            <div key={career.id} className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-white">{career.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-white/60 mt-1">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {formatMoney(career.baseSalary)} starting
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Max Level {career.maxLevel}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    Requires: {career.education}, {career.smarts} smarts
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onCareerAction('apply', { careerId: career.id })}
                  disabled={character.job === career.name}
                  className="bg-blue-500 hover:bg-blue-600"
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
