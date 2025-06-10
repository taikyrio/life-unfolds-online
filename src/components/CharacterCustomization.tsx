import React, { useState, useEffect } from 'react';
import { Character, PersonalityTraits } from '../types/character';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { generateRandomPersonality } from '../utils/characterUtils';

interface CharacterCustomizationProps {
  character: Character;
  onUpdate: (character: Character) => void;
  onComplete: () => void;
}

export const CharacterCustomization: React.FC<CharacterCustomizationProps> = ({
  character,
  onUpdate,
  onComplete,
}) => {
  const [customCharacter, setCustomCharacter] = useState<Character>(character);
  const [personality, setPersonality] = useState<PersonalityTraits>({
    kindness: character.personality?.kindness || 50,
    intelligence: character.personality?.intelligence || 50,
    humor: character.personality?.humor || 50,
    ambition: character.personality?.ambition || 50,
    honesty: character.personality?.honesty || 50,
    empathy: character.personality?.empathy || 50,
    creativity: character.personality?.creativity || 50,
    confidence: character.personality?.confidence || 50,
    patience: character.personality?.patience || 50,
    loyalty: character.personality?.loyalty || 50,
    analytical: character.personality?.analytical || 50,
    adventurous: character.personality?.adventurous || 50,
    cautious: character.personality?.cautious || 50
  });

  useEffect(() => {
    const updatedCharacter = {
      ...customCharacter,
      personality
    };
    setCustomCharacter(updatedCharacter);
    onUpdate(updatedCharacter);
  }, [personality, onUpdate]);

  const handleNameChange = (value: string) => {
    const updated = { ...customCharacter, name: value };
    setCustomCharacter(updated);
    onUpdate(updated);
  };

  const handlePersonalityChange = (trait: keyof PersonalityTraits, value: number[]) => {
    const updatedPersonality = {
      ...personality,
      [trait]: value[0]
    };
    setPersonality(updatedPersonality);
  };

  const randomizePersonality = () => {
    const randomPersonality = generateRandomPersonality();
    setPersonality(randomPersonality);
  };

  const personalityTraits: { key: keyof PersonalityTraits; label: string; description: string }[] = [
    { key: 'kindness', label: 'Kindness', description: 'How caring and compassionate you are' },
    { key: 'intelligence', label: 'Intelligence', description: 'Your cognitive abilities and learning capacity' },
    { key: 'humor', label: 'Humor', description: 'Your ability to be funny and appreciate comedy' },
    { key: 'ambition', label: 'Ambition', description: 'Your drive to succeed and achieve goals' },
    { key: 'honesty', label: 'Honesty', description: 'Your tendency to be truthful and transparent' },
    { key: 'empathy', label: 'Empathy', description: 'Your ability to understand others\' feelings' },
    { key: 'creativity', label: 'Creativity', description: 'Your artistic and innovative thinking' },
    { key: 'confidence', label: 'Confidence', description: 'Your self-assurance and belief in abilities' },
    { key: 'patience', label: 'Patience', description: 'Your ability to remain calm and wait' },
    { key: 'loyalty', label: 'Loyalty', description: 'Your faithfulness to friends and commitments' },
    { key: 'analytical', label: 'Analytical', description: 'Your logical and systematic thinking' },
    { key: 'adventurous', label: 'Adventurous', description: 'Your willingness to take risks and try new things' },
    { key: 'cautious', label: 'Cautious', description: 'Your tendency to be careful and avoid risks' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Character Customization</CardTitle>
          <p className="text-center text-muted-foreground">
            Customize your character's name and personality traits
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Customization */}
          <div className="space-y-2">
            <Label htmlFor="character-name">Character Name</Label>
            <Input
              id="character-name"
              value={customCharacter.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your character's name"
            />
          </div>

          <Separator />

          {/* Personality Traits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personality Traits</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={randomizePersonality}
              >
                Randomize
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalityTraits.map((trait) => (
                <div key={trait.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{trait.label}</Label>
                    <span className="text-sm text-muted-foreground">
                      {personality[trait.key]}
                    </span>
                  </div>
                  <Slider
                    value={[personality[trait.key]]}
                    onValueChange={(value) => handlePersonalityChange(trait.key, value)}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Character Preview</h3>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-lg">{customCharacter.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Age: {customCharacter.age} • 
                Health: {customCharacter.health} • 
                Happiness: {customCharacter.happiness}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {personalityTraits
                  .filter(trait => personality[trait.key] > 70)
                  .slice(0, 3)
                  .map(trait => (
                    <span
                      key={trait.key}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {trait.label}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onComplete}
              className="flex-1"
              size="lg"
            >
              Start Life
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
