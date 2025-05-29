
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Character } from '../../types/game';
import { Home, Activity, Star, Wallet } from 'lucide-react';

interface LifestyleTabProps {
  character: Character;
  onLifestyleAction: (action: string, data?: any) => void;
}

export const LifestyleTab: React.FC<LifestyleTabProps> = ({ 
  character, 
  onLifestyleAction 
}) => {
  const hasHouse = character.assets.some(asset => asset.type === 'real_estate');
  const hasCar = character.assets.some(asset => asset.type === 'vehicle');

  const lifestyleItems = [
    {
      id: 'buy_house',
      title: 'Buy a House',
      description: 'Own your first home',
      cost: 200,
      icon: <Home className="h-5 w-5" />,
      disabled: hasHouse || character.wealth < 200,
      disabledReason: hasHouse ? 'Already own a house' : 'Insufficient funds'
    },
    {
      id: 'buy_car',
      title: 'Buy a Car',
      description: 'Get your own vehicle',
      cost: 30,
      icon: <Activity className="h-5 w-5" />,
      disabled: hasCar || character.wealth < 30,
      disabledReason: hasCar ? 'Already own a car' : 'Insufficient funds'
    },
    {
      id: 'vacation',
      title: 'Go on Vacation',
      description: 'Take a relaxing trip',
      cost: 15,
      icon: <Star className="h-5 w-5" />,
      disabled: character.wealth < 15,
      disabledReason: 'Insufficient funds'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🏠 Lifestyle
          </h1>
          <p className="text-gray-600">Improve your quality of life</p>
        </div>

        {/* Current Assets */}
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              Your Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {character.assets.length > 0 ? (
              <div className="space-y-2">
                {character.assets.map((asset, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-600 capitalize">{asset.type.replace('_', ' ')}</div>
                    </div>
                    <Badge variant="secondary">${asset.value}k</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <div className="text-2xl mb-2">🏚️</div>
                <p>No assets yet. Start building your lifestyle!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lifestyle Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-600" />
              Lifestyle Purchases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lifestyleItems.map(item => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">${item.cost}k</Badge>
                </div>
                
                <Button
                  className="w-full"
                  onClick={() => onLifestyleAction(item.id)}
                  disabled={item.disabled}
                  variant={item.disabled ? "secondary" : "default"}
                >
                  {item.disabled ? item.disabledReason : `Buy for $${item.cost}k`}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lifestyle Tips */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">💡 Lifestyle Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Owning a house significantly boosts happiness</p>
              <p>• Cars provide convenience and status</p>
              <p>• Vacations are great for mental health</p>
              <p>• Assets can increase in value over time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
