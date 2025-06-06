
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Character } from '../../types/game';
import { Badge } from '../ui/badge';
import { Clock, Star, AlertTriangle } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
  duration: number;
  energyCost: number;
  effects: { [key: string]: number };
  requirements?: { [key: string]: number };
  unlockConditions?: { [key: string]: number };
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  character: Character;
  onStartActivity: (activity: Activity) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  activity,
  character,
  onStartActivity
}) => {
  if (!activity) return null;

  const canAfford = character.wealth >= (activity.requirements?.wealth || 0);
  const hasEnergy = character.health >= (activity.energyCost || 0);
  const meetsRequirements = Object.entries(activity.requirements || {}).every(
    ([key, value]) => (character as any)[key] >= value
  );

  const handleStart = () => {
    if (canAfford && hasEnergy && meetsRequirements) {
      onStartActivity(activity);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{activity.emoji}</span>
            {activity.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {activity.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{activity.duration}h</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4" />
              <span>-{activity.energyCost} energy</span>
            </div>
          </div>

          {activity.requirements && Object.keys(activity.requirements).length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Requirements:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(activity.requirements).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="capitalize">{key}:</span>
                    <Badge variant={
                      (character as any)[key] >= value ? "default" : "destructive"
                    }>
                      {value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activity.effects && Object.keys(activity.effects).length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Effects:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(activity.effects).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="capitalize">{key}:</span>
                    <span className={`font-medium ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {value > 0 ? '+' : ''}{value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!canAfford || !hasEnergy || !meetsRequirements) && (
            <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-xs text-red-600">
                {!canAfford && "Not enough money. "}
                {!hasEnergy && "Not enough energy. "}
                {!meetsRequirements && "Requirements not met."}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleStart}
              disabled={!canAfford || !hasEnergy || !meetsRequirements}
              className="flex-1"
            >
              Start Activity
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
