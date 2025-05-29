
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../../types/game';
import { Skull, DollarSign, Shield, AlertTriangle, Users, Crown } from 'lucide-react';

interface CriminalDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CriminalDLC: React.FC<CriminalDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  // Criminal career paths
  const criminalCareers = [
    {
      id: 'street_thug',
      name: 'Street Thug',
      description: 'Start small with petty crimes',
      requirements: { age: 16, smarts: 0, notoriety: 0 },
      baseSalary: 15,
      riskLevel: 'Low',
      unlocks: ['drug_dealer', 'gang_member']
    },
    {
      id: 'drug_dealer',
      name: 'Drug Dealer',
      description: 'Deal in controlled substances',
      requirements: { age: 18, smarts: 30, notoriety: 20 },
      baseSalary: 45,
      riskLevel: 'Medium',
      unlocks: ['cartel_member']
    },
    {
      id: 'gang_member',
      name: 'Gang Member',
      description: 'Join an organized crime group',
      requirements: { age: 18, smarts: 25, notoriety: 15 },
      baseSalary: 35,
      riskLevel: 'Medium',
      unlocks: ['gang_leader', 'mafia_associate']
    },
    {
      id: 'mafia_associate',
      name: 'Mafia Associate',
      description: 'Work for the family',
      requirements: { age: 21, smarts: 50, notoriety: 40 },
      baseSalary: 75,
      riskLevel: 'High',
      unlocks: ['mafia_soldier']
    },
    {
      id: 'mafia_soldier',
      name: 'Mafia Soldier',
      description: 'Made member of the family',
      requirements: { age: 25, smarts: 60, notoriety: 60 },
      baseSalary: 120,
      riskLevel: 'Very High',
      unlocks: ['mafia_underboss']
    },
    {
      id: 'cartel_leader',
      name: 'Cartel Leader',
      description: 'Run your own drug empire',
      requirements: { age: 30, smarts: 80, notoriety: 80 },
      baseSalary: 500,
      riskLevel: 'Extreme',
      unlocks: []
    }
  ];

  // Criminal operations
  const criminalOperations = [
    {
      id: 'pickpocket',
      name: 'Pickpocket',
      description: 'Steal from unsuspecting victims',
      minReward: 1,
      maxReward: 5,
      arrestChance: 15,
      notorietyGain: 2
    },
    {
      id: 'burglary',
      name: 'Burglary',
      description: 'Break into homes',
      minReward: 10,
      maxReward: 50,
      arrestChance: 25,
      notorietyGain: 5
    },
    {
      id: 'bank_robbery',
      name: 'Bank Robbery',
      description: 'Rob a bank for big money',
      minReward: 100,
      maxReward: 500,
      arrestChance: 60,
      notorietyGain: 20
    },
    {
      id: 'extortion',
      name: 'Extortion',
      description: 'Collect protection money',
      minReward: 20,
      maxReward: 100,
      arrestChance: 30,
      notorietyGain: 8
    }
  ];

  const getNotoriety = () => {
    return character.flags?.includes('notoriety') ? 
      parseInt(character.flags.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0') : 0;
  };

  const isCareerEligible = (career: typeof criminalCareers[0]) => {
    const notoriety = getNotoriety();
    return character.age >= career.requirements.age &&
           character.smarts >= career.requirements.smarts &&
           notoriety >= career.requirements.notoriety;
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
    <div className="space-y-4">
      {/* Criminal Status */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Skull className="h-5 w-5 text-red-600" />
            Criminal Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-red-600">Notoriety</div>
              <div className="text-lg">{getNotoriety()}/100</div>
              <Progress value={getNotoriety()} className="h-2 mt-1" />
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-gray-600">Criminal Record</div>
              <div className="text-lg">{character.criminalRecord ? 'Yes' : 'Clean'}</div>
            </div>
          </div>
          
          {character.criminalRecord && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Warning: Criminal record affects legitimate job opportunities</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Criminal Operations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Criminal Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {criminalOperations.map(operation => (
            <div key={operation.id} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{operation.name}</h3>
                  <p className="text-sm text-gray-600">{operation.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCareerAction('criminal_operation', operation)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Execute
                </Button>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>💰 ${operation.minReward}-{operation.maxReward}k</span>
                <span>🚨 {operation.arrestChance}% arrest chance</span>
                <span>⭐ +{operation.notorietyGain} notoriety</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Criminal Careers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            Criminal Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {criminalCareers.map(career => {
            const eligible = isCareerEligible(career);
            return (
              <div key={career.id} className={`border rounded-lg p-3 ${!eligible ? 'opacity-60' : 'hover:bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{career.name}</h3>
                      <Badge className={getRiskColor(career.riskLevel)}>
                        {career.riskLevel} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>💰 ${career.baseSalary}k/year</span>
                      <span>🎂 Age {career.requirements.age}+</span>
                      <span>🧠 {career.requirements.smarts} smarts</span>
                      <span>⭐ {career.requirements.notoriety} notoriety</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onCareerAction('join_criminal_career', career)}
                    disabled={!eligible || character.job === career.name}
                    variant={eligible ? "default" : "secondary"}
                  >
                    {character.job === career.name ? 'Current' : eligible ? 'Join' : 'Locked'}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Criminal Organizations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Criminal Organizations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onCareerAction('create_organization', { type: 'gang' })}
            disabled={getNotoriety() < 30}
          >
            <Users className="h-4 w-4 mr-2" />
            Start Your Own Gang (30 Notoriety Required)
          </Button>
          
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onCareerAction('create_organization', { type: 'cartel' })}
            disabled={getNotoriety() < 70}
          >
            <Crown className="h-4 w-4 mr-2" />
            Form Drug Cartel (70 Notoriety Required)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
