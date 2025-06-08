
import React, { useState, useEffect } from 'react';
import { Character, GameState } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { generateRandomAppearance, generateRandomPersonality } from '../utils/statRandomization';
import { generateFamilyBackground, applyFamilyBackground, generateFamilyName } from '../utils/familyBackgroundGenerator';
import { processGameLogic } from './game/GameLogic';

interface CharacterCustomizationProps {
  onCharacterCreated: (gameState: GameState) => void;
  onBack: () => void;
}

export const CharacterCustomization: React.FC<CharacterCustomizationProps> = ({ onCharacterCreated, onBack }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('New York');
  const [customMode, setCustomMode] = useState(false);
  
  // Character stats
  const [health, setHealth] = useState([90]);
  const [happiness, setHappiness] = useState([50]);
  const [smarts, setSmarts] = useState([50]);
  const [looks, setLooks] = useState([50]);

  // Background and traits
  const [familyBackground, setFamilyBackground] = useState(generateFamilyBackground());
  const [personalityTraits, setPersonalityTraits] = useState({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
    creativity: 50,
    ambition: 50,
    empathy: 50,
    resilience: 50,
    curiosity: 50
  });

  const handleRandomize = () => {
    const randomAppearance = generateRandomAppearance();
    const randomPersonality = generateRandomPersonality();
    
    setHealth([randomAppearance.health]);
    setHappiness([randomAppearance.happiness]);
    setSmarts([randomAppearance.smarts]);
    setLooks([randomAppearance.looks]);
    
    setPersonalityTraits(randomPersonality);
    setFamilyBackground(generateFamilyBackground());
  };

  const handleCreateCharacter = () => {
    if (!name.trim()) {
      alert('Please enter a name for your character');
      return;
    }

    const baseCharacter: Partial<Character> = {
      id: `character_${Date.now()}`,
      name: name.trim(),
      gender,
      age: 0,
      health: health[0],
      happiness: happiness[0],
      smarts: smarts[0],
      looks: looks[0],
      wealth: 100,
      relationships: 50,
      fame: 0,
      achievements: [],
      assets: [],
      children: [],
      familyMembers: [],
      lifeEvents: [],
      birthplace: `${city}, ${country}`,
      birthYear: new Date().getFullYear(),
      birthMonth: Math.floor(Math.random() * 12) + 1,
      birthDay: Math.floor(Math.random() * 28) + 1,
      currentCountry: country,
      citizenship: [country],
      personalityTraits,
      familyBackground
    };

    // Process character through game logic to initialize all systems
    const processedCharacter = processGameLogic(baseCharacter as Character);
    
    // Apply family background effects
    applyFamilyBackground(processedCharacter, familyBackground);
    
    // Generate family name and apply to family members
    const familyName = generateFamilyName(processedCharacter.familyMembers);
    processedCharacter.familyMembers = processedCharacter.familyMembers.map(member => ({
      ...member,
      name: member.name.split(' ')[0] + ' ' + familyName
    }));

    const initialGameState: GameState = {
      character: processedCharacter,
      currentEvent: null,
      gameStarted: true,
      gameOver: false,
      eventHistory: [`🌟 ${processedCharacter.name} was born in ${processedCharacter.birthplace}!`],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map(),
        choiceHistory: []
      }
    };

    onCharacterCreated(initialGameState);
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Japan', 'Australia', 'Brazil', 'India', 'China'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Character</h1>
          <p className="text-gray-600">Design your perfect life simulation character</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter character name"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter birth city"
                />
              </div>
            </CardContent>
          </Card>

          {/* Character Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Character Stats
                <Button variant="outline" size="sm" onClick={handleRandomize}>
                  🎲 Randomize
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Health: {health[0]}</Label>
                <Slider
                  value={health}
                  onValueChange={setHealth}
                  min={20}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Happiness: {happiness[0]}</Label>
                <Slider
                  value={happiness}
                  onValueChange={setHappiness}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Intelligence: {smarts[0]}</Label>
                <Slider
                  value={smarts}
                  onValueChange={setSmarts}
                  min={10}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Appearance: {looks[0]}</Label>
                <Slider
                  value={looks}
                  onValueChange={setLooks}
                  min={10}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Family Background */}
          <Card>
            <CardHeader>
              <CardTitle>Family Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant="outline" className="text-sm">
                  {familyBackground.type.replace('_', ' ').toUpperCase()}
                </Badge>
                <p className="text-sm text-gray-600">{familyBackground.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Income: {familyBackground.traits.familyIncome}</div>
                  <div>Education: {familyBackground.traits.parentEducation}</div>
                  <div>Stability: {familyBackground.traits.familyStability}</div>
                  <div>Support: {familyBackground.traits.parentalSupport}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personality Traits */}
          <Card>
            <CardHeader>
              <CardTitle>Personality Traits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Openness: {personalityTraits.openness}</div>
                <div>Conscientiousness: {personalityTraits.conscientiousness}</div>
                <div>Extraversion: {personalityTraits.extraversion}</div>
                <div>Agreeableness: {personalityTraits.agreeableness}</div>
                <div>Creativity: {personalityTraits.creativity}</div>
                <div>Ambition: {personalityTraits.ambition}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleCreateCharacter} className="px-8">
            Start Life
          </Button>
        </div>
      </div>
    </div>
  );
};
