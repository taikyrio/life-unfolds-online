
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../../types/game';
import { Skull, Crown, Users, Shield, Zap, Globe } from 'lucide-react';

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
    return parseInt(character.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0');
  };

  const getCodingSkill = () => {
    return parseInt(character.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0');
  };

  const criminalPaths = {
    mafia: {
      id: 'mafia',
      name: 'Mafia',
      icon: Crown,
      description: 'Traditional organized crime family',
      color: 'from-red-600 to-red-800',
      careers: [
        {
          id: 'mafia_associate',
          name: 'Mafia Associate',
          description: 'Entry level family member',
          requirements: { age: 18, notoriety: 20 },
          salary: 45,
          riskLevel: 'Medium'
        },
        {
          id: 'mafia_soldier',
          name: 'Mafia Soldier',
          description: 'Made member of the family',
          requirements: { age: 25, notoriety: 40 },
          salary: 85,
          riskLevel: 'High'
        },
        {
          id: 'mafia_capo',
          name: 'Mafia Capo',
          description: 'Lead soldiers and operations',
          requirements: { age: 30, notoriety: 60 },
          salary: 150,
          riskLevel: 'Very High'
        },
        {
          id: 'mafia_underboss',
          name: 'Mafia Underboss',
          description: 'Second in command',
          requirements: { age: 35, notoriety: 80 },
          salary: 250,
          riskLevel: 'Extreme'
        },
        {
          id: 'mafia_boss',
          name: 'Mafia Boss',
          description: 'Head of the crime family',
          requirements: { age: 40, notoriety: 95 },
          salary: 500,
          riskLevel: 'Extreme'
        }
      ]
    },
    cartel: {
      id: 'cartel',
      name: 'Drug Cartel',
      icon: Globe,
      description: 'International drug trafficking organization',
      color: 'from-orange-600 to-orange-800',
      careers: [
        {
          id: 'cartel_runner',
          name: 'Drug Runner',
          description: 'Transport drugs across borders',
          requirements: { age: 18, notoriety: 15 },
          salary: 40,
          riskLevel: 'High'
        },
        {
          id: 'cartel_dealer',
          name: 'Cartel Dealer',
          description: 'Manage local drug distribution',
          requirements: { age: 21, notoriety: 30 },
          salary: 75,
          riskLevel: 'High'
        },
        {
          id: 'cartel_lieutenant',
          name: 'Cartel Lieutenant',
          description: 'Oversee territory operations',
          requirements: { age: 28, notoriety: 50 },
          salary: 140,
          riskLevel: 'Very High'
        },
        {
          id: 'cartel_commander',
          name: 'Cartel Commander',
          description: 'Regional operations leader',
          requirements: { age: 32, notoriety: 70 },
          salary: 220,
          riskLevel: 'Extreme'
        },
        {
          id: 'cartel_kingpin',
          name: 'Cartel Kingpin',
          description: 'Control international operations',
          requirements: { age: 35, notoriety: 90 },
          salary: 450,
          riskLevel: 'Extreme'
        }
      ]
    },
    cybercrime: {
      id: 'cybercrime',
      name: 'Cybercrime Syndicate',
      icon: Zap,
      description: 'High-tech digital criminal operations',
      color: 'from-blue-600 to-purple-800',
      careers: [
        {
          id: 'script_kiddie',
          name: 'Script Kiddie',
          description: 'Basic hacking and digital theft',
          requirements: { age: 14, notoriety: 5, coding: 20 },
          salary: 25,
          riskLevel: 'Low'
        },
        {
          id: 'black_hat_hacker',
          name: 'Black Hat Hacker',
          description: 'Professional cybercriminal',
          requirements: { age: 18, notoriety: 20, coding: 50 },
          salary: 65,
          riskLevel: 'Medium'
        },
        {
          id: 'cyber_criminal',
          name: 'Cyber Criminal',
          description: 'Advanced digital operations',
          requirements: { age: 22, notoriety: 35, coding: 70 },
          salary: 120,
          riskLevel: 'High'
        },
        {
          id: 'dark_web_kingpin',
          name: 'Dark Web Kingpin',
          description: 'Control illegal online markets',
          requirements: { age: 28, notoriety: 60, coding: 90 },
          salary: 200,
          riskLevel: 'Very High'
        },
        {
          id: 'cyber_syndicate_leader',
          name: 'Cyber Syndicate Leader',
          description: 'Lead international cybercrime network',
          requirements: { age: 32, notoriety: 85, coding: 95 },
          salary: 400,
          riskLevel: 'Extreme'
        }
      ]
    }
  };

  const isCareerEligible = (career: any) => {
    const notoriety = getNotoriety();
    const coding = getCodingSkill();
    
    return character.age >= career.requirements.age &&
           notoriety >= career.requirements.notoriety &&
           (!career.requirements.coding || coding >= career.requirements.coding);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Very High': return 'text-red-600 bg-red-50';
      case 'Extreme': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Criminal Status */}
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Skull className="h-5 w-5 text-red-600" />
            Criminal Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-red-600">Notoriety</div>
              <div className="text-lg">{getNotoriety()}/100</div>
              <Progress value={getNotoriety()} className="h-2 mt-1" />
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-blue-600">Coding</div>
              <div className="text-lg">{getCodingSkill()}/100</div>
              <Progress value={getCodingSkill()} className="h-2 mt-1" />
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-gray-600">Record</div>
              <div className="text-sm">{character.criminalRecord ? '⚠️ Yes' : '✅ Clean'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criminal Career Paths */}
      {!selectedPath ? (
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-center mb-4">Choose Your Criminal Path</h2>
          {Object.values(criminalPaths).map((path) => (
            <Card key={path.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6" onClick={() => setSelectedPath(path.id)}>
                <div className={`bg-gradient-to-r ${path.color} text-white rounded-lg p-4 mb-4`}>
                  <div className="flex items-center gap-3">
                    <path.icon className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">{path.name}</h3>
                      <p className="text-gray-100">{path.description}</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {path.careers.length} career levels available
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPath(null)}
              className="text-sm"
            >
              ← Back to Paths
            </Button>
            <h2 className="text-xl font-bold">{criminalPaths[selectedPath as keyof typeof criminalPaths].name} Careers</h2>
          </div>

          {criminalPaths[selectedPath as keyof typeof criminalPaths].careers.map(career => {
            const eligible = isCareerEligible(career);
            const isCurrentJob = character.job === career.name;
            
            return (
              <Card key={career.id} className={`${!eligible ? 'opacity-60' : ''} ${isCurrentJob ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{career.name}</h3>
                        <Badge className={getRiskColor(career.riskLevel)}>
                          {career.riskLevel} Risk
                        </Badge>
                        {isCurrentJob && <Badge variant="default">Current</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>💰 ${career.salary}k/year</span>
                        <span>🎂 Age {career.requirements.age}+</span>
                        <span>⭐ {career.requirements.notoriety} notoriety</span>
                        {career.requirements.coding && (
                          <span>💻 {career.requirements.coding} coding</span>
                        )}
                      </div>
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
      )}
    </div>
  );
};
