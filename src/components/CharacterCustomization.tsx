import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Dice6, User, Sparkles } from 'lucide-react';
import { Character } from '@/types/character';
import { randomizeStats, RandomizationMode } from '@/utils/statRandomization';
import { generateInitialFamily } from '@/utils/familyUtils';

interface CharacterCustomizationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCharacter: (character: Character) => void;
  initialCharacter?: Partial<Character>;
}

export const CharacterCustomization: React.FC<CharacterCustomizationProps> = ({
  isOpen,
  onClose,
  onCreateCharacter,
  initialCharacter
}) => {
  const [firstName, setFirstName] = useState(initialCharacter?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(initialCharacter?.name?.split(' ')[1] || '');
  const [gender, setGender] = useState<'male' | 'female'>(initialCharacter?.gender || 'male');
  const [happiness, setHappiness] = useState([initialCharacter?.happiness || 50]);
  const [health, setHealth] = useState([initialCharacter?.health || 50]);
  const [smarts, setSmarts] = useState([initialCharacter?.smarts || 50]);
  const [looks, setLooks] = useState([initialCharacter?.looks || 50]);
  const [randomMode, setRandomMode] = useState<RandomizationMode>('realistic');

  if (!isOpen) return null;

  const generateRandomName = () => {
    const maleNames = [
      'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
      'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald'
    ];
    const femaleNames = [
      'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica',
      'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna'
    ];
    const lastNames = [
      'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
      'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia'
    ];

    const firstNames = gender === 'male' ? maleNames : femaleNames;
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    setFirstName(randomFirstName);
    setLastName(randomLastName);
  };

  const randomizeAllStats = () => {
    const ranges = {
      realistic: [20, 80],
      balanced: [30, 70],
      extreme: [0, 100],
      high: [50, 90]
    };

    const [min, max] = ranges[randomMode];
    const getRandomStat = () => Math.floor(Math.random() * (max - min + 1)) + min;

    setHappiness([getRandomStat()]);
    setHealth([getRandomStat()]);
    setSmarts([getRandomStat()]);
    setLooks([getRandomStat()]);
  };

  const handleCreateCharacter = () => {
    // Generate family first to get family name
    const familyData = generateInitialFamily(lastName.trim() || undefined);
    const fullName = `${firstName.trim()} ${familyData.familyName}`;

    // Generate random birth year between 2000-2025
    const currentYear = new Date().getFullYear();
    const minBirthYear = 2000;
    const maxBirthYear = Math.min(2025, currentYear);
    const birthYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;

    // Generate random birth month (1-12) and day (1-28 for simplicity)
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;

    const newCharacter: Character = {
      id: 'player',
      name: fullName,
      gender: gender,
      age: 0,
      birthYear: birthYear,
      birthMonth: birthMonth,
      birthDay: birthDay,
      happiness: happiness[0],
      health: health[0],
      smarts: smarts[0],
      looks: looks[0],
      wealth: 0, // Start with no money as a newborn
      relationships: Math.floor((looks[0] + happiness[0]) / 2),
      achievements: [],
      assets: [],
      children: [],
      fame: 0,
      familyMembers: familyData.family, // Use the generated family members
      lifeEvents: [] // Initialize with empty life events
    };

    onCreateCharacter(newCharacter);
    onClose();
  };

  const getStatEmoji = (value: number) => {
    if (value >= 80) return '😊';
    if (value >= 60) return '🙂';
    if (value >= 40) return '😐';
    if (value >= 20) return '😟';
    return '😢';
  };

  const getStatColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 50) return 'text-orange-600';
    if (value >= 30) return 'text-red-600';
    return 'text-red-700';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Create New Life
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Character Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Character Name</Label>
            <div className="flex space-x-2">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="flex-1"
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomName}
                className="px-3"
              >
                <Dice6 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</Label>
            <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">👦 Male</SelectItem>
                <SelectItem value="female">👧 Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Starting Stats</Label>
              <div className="flex space-x-2">
                <Select value={randomMode} onValueChange={(value: RandomizationMode) => setRandomMode(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="extreme">Extreme</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={randomizeAllStats}
                >
                  <Dice6 className="h-4 w-4 mr-1" />
                  Random
                </Button>
              </div>
            </div>

            {/* Individual Stats */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700 dark:text-gray-300">
                    😊 Happiness: <span className="font-bold text-green-600">{happiness[0]}%</span>
                  </Label>
                </div>
                <Slider
                  value={happiness}
                  onValueChange={setHappiness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700 dark:text-gray-300">
                    ❤️ Health: <span className="font-bold text-green-600">{health[0]}%</span>
                  </Label>
                </div>
                <Slider
                  value={health}
                  onValueChange={setHealth}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700 dark:text-gray-300">
                    🧠 Smarts: <span className="font-bold text-green-600">{smarts[0]}%</span>
                  </Label>
                </div>
                <Slider
                  value={smarts}
                  onValueChange={setSmarts}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700 dark:text-gray-300">
                    💎 Looks: <span className="font-bold text-green-600">{looks[0]}%</span>
                  </Label>
                </div>
                <Slider
                  value={looks}
                  onValueChange={setLooks}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCharacter}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Start Life
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
