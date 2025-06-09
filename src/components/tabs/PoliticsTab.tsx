
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { politicalParties, politicalPositions, campaignForOffice } from '../../systems/politicalSystem';
import { useToast } from '@/hooks/use-toast';

interface PoliticsTabProps {
  character: Character;
  onPoliticalAction: (action: string, data: any) => void;
}

export const PoliticsTab: React.FC<PoliticsTabProps> = ({ character, onPoliticalAction }) => {
  const [selectedParty, setSelectedParty] = useState<string>('independent');
  const { toast } = useToast();

  const handleCampaign = (positionId: string) => {
    const position = politicalPositions.find(p => p.id === positionId);
    const party = politicalParties.find(p => p.id === selectedParty);
    
    if (!position || !party) return;

    const result = campaignForOffice(character, position, party);
    onPoliticalAction('campaign', { position, party, result });
    
    toast({
      title: result.success ? "Election Won!" : "Election Lost",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
  };

  // Get reputation as a number
  const getReputationValue = (character: Character): number => {
    if (typeof character.reputation === 'number') {
      return character.reputation;
    }
    if (character.reputation && typeof character.reputation === 'object' && 'overall' in character.reputation) {
      return character.reputation.overall || 0;
    }
    return 0;
  };

  const reputationValue = getReputationValue(character);

  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏛️ Political Career
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Political Affiliation</p>
              <p className="font-medium">
                {character.politicalAffiliation || 'Independent'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Political Influence</p>
              <p className="font-medium">{character.politicalInfluence || 0}/100</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Reputation</p>
              <p className="font-medium">{reputationValue}/100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🗳️ Choose Political Party</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {politicalParties.map(party => (
              <Button
                key={party.id}
                onClick={() => setSelectedParty(party.id)}
                variant={selectedParty === party.id ? "default" : "outline"}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{party.name}</div>
                  <div className="text-xs opacity-70">{party.description}</div>
                  <div className="text-xs mt-1">
                    Popularity: {party.popularity}% | {party.ideology}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🏆 Run for Office</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {politicalPositions.map(position => {
              const meetsAge = !position.requirements.age || character.age >= position.requirements.age.min;
              const meetsReputation = !position.requirements.reputation || reputationValue >= position.requirements.reputation;
              const meetsWealth = !position.requirements.wealth || character.wealth >= position.requirements.wealth;
              const canAfford = character.wealth >= position.campaignCost;
              
              const canRun = meetsAge && meetsReputation && meetsWealth && canAfford;
              
              return (
                <div key={position.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{position.title}</div>
                      <Badge variant={position.level === 'national' ? 'default' : 'secondary'}>
                        {position.level}
                      </Badge>
                    </div>
                    <div className="text-right text-sm">
                      <div>Salary: ${position.benefits.salary}k</div>
                      <div>Fame: +{position.benefits.fame}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Campaign Cost: ${position.campaignCost}k
                  </div>
                  
                  <div className="text-xs space-y-1 mb-3">
                    {position.requirements.age && (
                      <div className={meetsAge ? 'text-green-600' : 'text-red-600'}>
                        Age: {position.requirements.age.min}+ {meetsAge ? '✓' : '✗'}
                      </div>
                    )}
                    {position.requirements.reputation && (
                      <div className={meetsReputation ? 'text-green-600' : 'text-red-600'}>
                        Reputation: {position.requirements.reputation}+ {meetsReputation ? '✓' : '✗'}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleCampaign(position.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!canRun}
                  >
                    Campaign for {position.title}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
