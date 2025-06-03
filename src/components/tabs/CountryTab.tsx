
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { countries, emigrateToCountry, getCountryByName } from '../../systems/countrySystem';
import { useToast } from '@/hooks/use-toast';

interface CountryTabProps {
  character: Character;
  onCountryAction: (action: string, data: any) => void;
}

export const CountryTab: React.FC<CountryTabProps> = ({ character, onCountryAction }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { toast } = useToast();

  const currentCountry = getCountryByName(character.currentCountry || 'usa');

  const handleEmigration = (targetCountryId: string) => {
    const targetCountry = countries.find(c => c.id === targetCountryId);
    if (!targetCountry) return;

    const result = emigrateToCountry(character, targetCountry);
    onCountryAction('emigrate', { country: targetCountry, result });
    
    toast({
      title: result.success ? "Emigration Successful" : "Emigration Failed",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
  };

  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌍 Current Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentCountry && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCountry.emoji}</span>
                <div>
                  <h3 className="font-semibold">{currentCountry.name}</h3>
                  <p className="text-sm text-gray-600">{currentCountry.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Quality of Life</p>
                  <div className="space-y-1 text-xs">
                    <div>Healthcare: {currentCountry.qualityOfLife.healthcare}/100</div>
                    <div>Education: {currentCountry.qualityOfLife.education}/100</div>
                    <div>Safety: {currentCountry.qualityOfLife.safety}/100</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Living Costs</p>
                  <div className="space-y-1 text-xs">
                    <div>Housing: ${currentCountry.livingCosts.housing}k/year</div>
                    <div>Healthcare: ${currentCountry.livingCosts.healthcare}k/year</div>
                    <div>Food: ${currentCountry.livingCosts.food}k/year</div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Unique Opportunities</p>
                <div className="space-y-2">
                  {currentCountry.opportunities.slice(0, 2).map(opp => (
                    <div key={opp.id} className="p-2 bg-blue-50 rounded">
                      <div className="font-medium text-sm">{opp.name}</div>
                      <div className="text-xs text-gray-600">{opp.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>✈️ Immigration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {countries
              .filter(country => country.id !== character.currentCountry)
              .slice(0, 4)
              .map(country => (
                <div key={country.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.emoji}</span>
                      <div>
                        <div className="font-medium">{country.name}</div>
                        <div className="text-xs text-gray-600">{country.continent}</div>
                      </div>
                    </div>
                    <Badge variant={country.economicLevel === 'advanced' ? 'default' : 'secondary'}>
                      {country.economicLevel}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-1 mb-3">
                    <div>Requirements: ${country.immigrationRequirements.wealth || 0}k wealth</div>
                    <div>Language: {country.language}</div>
                  </div>
                  
                  <Button
                    onClick={() => handleEmigration(country.id)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={character.wealth < (country.immigrationRequirements.wealth || 0)}
                  >
                    Emigrate to {country.name}
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
