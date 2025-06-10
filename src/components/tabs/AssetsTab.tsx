
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { DollarSign, TrendingUp, Home, Car } from 'lucide-react';

interface AssetsTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const AssetsTab: React.FC<AssetsTabProps> = ({ character, onCharacterUpdate }) => {
  const totalAssetValue = character.assets?.reduce((total, asset) => total + (asset.currentValue || asset.value || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 Assets & Wealth</h1>
          <p className="text-gray-600">Manage your financial portfolio</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${character.wealth.toLocaleString()}k</div>
                <div className="text-sm text-gray-600">Net Worth</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">${totalAssetValue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Asset Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {character.assets && character.assets.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {character.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {asset.type === 'real_estate' ? <Home className="h-5 w-5" /> : 
                     asset.type === 'vehicle' ? <Car className="h-5 w-5" /> : 
                     <TrendingUp className="h-5 w-5" />}
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{asset.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(asset.currentValue || asset.value).toLocaleString()}</div>
                    <Badge variant="secondary" className="text-xs">
                      {asset.appreciationRate ? `+${asset.appreciationRate}%/yr` : 'Static'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-500 mb-4">No assets yet</div>
              <p className="text-sm text-gray-400">Start building your wealth by investing in assets</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
