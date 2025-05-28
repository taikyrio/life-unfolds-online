
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { X, Volume2, VolumeX, Palette, Zap } from 'lucide-react';

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({ isOpen, onClose, onNewGame }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  if (!isOpen) return null;

  const handleNewGame = () => {
    onNewGame();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
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
            <h3 className="font-semibold text-lg">Game</h3>
            <Button 
              onClick={handleNewGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              🔄 Start New Life
            </Button>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              Audio
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-toggle">Sound Effects</Label>
              <Switch
                id="sound-toggle"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            {soundEnabled && (
              <div className="space-y-2">
                <Label>Volume: {volume[0]}%</Label>
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
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Animations</Label>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={setAnimationsEnabled}
              />
            </div>
          </div>

          {/* Gameplay Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Gameplay
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
          </div>

          {/* About */}
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm text-gray-600 text-center">
              BitLife Clone v1.0.0
            </p>
            <p className="text-xs text-gray-500 text-center">
              A life simulation game built with React
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
