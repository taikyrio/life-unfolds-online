
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { legalEvents, generateRandomLegalEvent, resolveLegalCase } from '../../systems/legalSystem';
import { useToast } from '@/hooks/use-toast';

interface LegalTabProps {
  character: Character;
  onLegalAction: (action: string, data: any) => void;
}

export const LegalTab: React.FC<LegalTabProps> = ({ character, onLegalAction }) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { toast } = useToast();

  const handleLegalEventTrigger = () => {
    const event = generateRandomLegalEvent(character);
    if (event) {
      setSelectedEvent(event);
    } else {
      toast({
        title: "No Legal Issues",
        description: "You're staying out of trouble!",
      });
    }
  };

  const handleDefenseChoice = (defenseOption: any) => {
    if (selectedEvent) {
      const result = resolveLegalCase(character, selectedEvent, defenseOption);
      onLegalAction('resolve_case', { event: selectedEvent, defense: defenseOption, result });
      setSelectedEvent(null);
      
      toast({
        title: result.success ? "Case Resolved" : "Legal Consequences",
        description: result.result,
        variant: result.success ? "default" : "destructive",
      });
    }
  };

  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚖️ Legal Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Criminal Record</p>
              <p className="font-medium">
                {character.criminalRecord ? 
                  `${character.criminalRecord.arrests} arrests, ${character.criminalRecord.convictions} convictions` : 
                  'Clean record'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Legal Status</p>
              <Badge variant={character.legalStatus?.onProbation ? "destructive" : "default"}>
                {character.legalStatus?.onProbation ? 'On Probation' : 'Free'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedEvent && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">⚠️ {selectedEvent.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{selectedEvent.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium">Choose your defense:</h4>
              {selectedEvent.defenseOptions.map((option: any) => (
                <Button
                  key={option.id}
                  onClick={() => handleDefenseChoice(option)}
                  variant="outline"
                  className="w-full justify-start text-left"
                  disabled={option.cost > character.wealth}
                >
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-600">
                      Cost: ${option.cost}k | Success Rate: {option.successRate}%
                    </div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Legal Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            onClick={handleLegalEventTrigger}
            className="w-full"
            variant="outline"
          >
            🎲 Random Legal Event
          </Button>
          
          <Button 
            onClick={() => onLegalAction('hire_lawyer', {})}
            className="w-full"
            variant="outline"
            disabled={character.wealth < 100}
          >
            🧑‍💼 Hire Lawyer ($100k)
          </Button>
          
          <Button 
            onClick={() => onLegalAction('legal_consultation', {})}
            className="w-full"
            variant="outline"
            disabled={character.wealth < 20}
          >
            📋 Legal Consultation ($20k)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
