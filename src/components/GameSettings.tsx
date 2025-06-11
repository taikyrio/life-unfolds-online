
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Volume2, VolumeX, Palette, Zap, Dice6, User, RotateCcw, FileText } from 'lucide-react';
import { LogManagement } from './LogManagement';

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onRandomizeStats?: () => void;
  onCustomCharacter?: () => void;
  characterName?: string;
}

export const GameSettings: React.FC<GameSettingsProps> = ({ isOpen, onClose, onNewGame, onRandomizeStats, onCustomCharacter, characterName = "Player" }) => {
  const [showLogManagement, setShowLogManagement] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('bitlife-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('bitlife-volume');
    return saved !== null ? [JSON.parse(saved)] : [75];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('bitlife-dark-mode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [autoSave, setAutoSave] = useState(() => {
    const saved = localStorage.getItem('bitlife-auto-save');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('bitlife-animations');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [statRandomization, setStatRandomization] = useState(() => {
    const saved = localStorage.getItem('bitlife-stat-randomization');
    return saved !== null ? saved : 'realistic';
  });
  const [difficulty, setDifficulty] = useState(() => {
    const saved = localStorage.getItem('bitlife-difficulty');
    return saved !== null ? saved : 'normal';
  });

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('bitlife-sound-enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('bitlife-volume', JSON.stringify(volume[0]));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('bitlife-dark-mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('bitlife-auto-save', JSON.stringify(autoSave));
  }, [autoSave]);

  useEffect(() => {
    localStorage.setItem('bitlife-animations', JSON.stringify(animationsEnabled));
  }, [animationsEnabled]);

  useEffect(() => {
    localStorage.setItem('bitlife-stat-randomization', statRandomization);
  }, [statRandomization]);

  useEffect(() => {
    localStorage.setItem('bitlife-difficulty', difficulty);
  }, [difficulty]);

  if (!isOpen) return null;

  const handleNewGame = () => {
    onNewGame();
    onClose();
  };

  const handleRandomizeStats = () => {
    if (onRandomizeStats) {
      onRandomizeStats();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            BitLife Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Controls */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Character
            </h3>
            <div className="space-y-3">
              <Button 
                onClick={handleNewGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Quick New Life
              </Button>
              
              {onCustomCharacter && (
                <Button 
                  onClick={onCustomCharacter}
                  variant="outline"
                  className="w-full bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 border-purple-200 dark:border-purple-800"
                >
                  <User className="h-4 w-4 mr-2" />
                  Custom Character
                </Button>
              )}
              
              {onRandomizeStats && (
                <Button 
                  onClick={handleRandomizeStats}
                  variant="outline"
                  className="w-full"
                >
                  <Dice6 className="h-4 w-4 mr-2" />
                  Randomize Current Stats
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Stat Randomization Mode</Label>
              <Select value={statRandomization} onValueChange={setStatRandomization}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic (20-80%)</SelectItem>
                  <SelectItem value="balanced">Balanced (30-70%)</SelectItem>
                  <SelectItem value="extreme">Extreme (0-100%)</SelectItem>
                  <SelectItem value="high">High Start (50-90%)</SelectItem>
                </SelectContent>
              </Select>

              <Label className="text-sm font-medium">Game Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy (Better luck)</SelectItem>
                  <SelectItem value="normal">Normal (Standard)</SelectItem>
                  <SelectItem value="hard">Hard (More challenges)</SelectItem>
                  <SelectItem value="nightmare">Nightmare (Brutal)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              Audio
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-toggle" className="text-gray-700 dark:text-gray-300">Sound Effects</Label>
              <Switch
                id="sound-toggle"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            {soundEnabled && (
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Volume: {volume[0]}%</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              <Palette className="h-5 w-5" />
              Display
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="animations" className="text-gray-700 dark:text-gray-300">Animations</Label>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={setAnimationsEnabled}
              />
            </div>
          </div>

          {/* Gameplay Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              <Zap className="h-5 w-5" />
              Gameplay
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save" className="text-gray-700 dark:text-gray-300">Auto Save</Label>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
            
            <Button
              onClick={() => setShowLogManagement(true)}
              variant="outline"
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Manage Life Logs
            </Button>
          </div>

          {/* About */}
          <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              BitLife Clone v1.0.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              A life simulation game built with React
            </p>
          </div>
        </CardContent>
      </Card>
      
      <LogManagement
        isOpen={showLogManagement}
        onClose={() => setShowLogManagement(false)}
        characterName={characterName}
      />
    </div>
  );
};
