
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Home, Car, Gem, TrendingUp, Monitor, 
  ShoppingCart, Wrench, Shield, DollarSign,
  AlertTriangle, CheckCircle
} from 'lucide-react';
import { 
  getAssetsByCategory, 
  getAvailableAssets, 
  purchaseAsset, 
  sellAsset, 
  maintainAsset, 
  insureAsset,
  getAssetPortfolioValue,
  getAssetConditionColor
} from '../../systems/assetSystem';

interface AssetsTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const AssetsTab: React.FC<AssetsTabProps> = ({ 
  character, 
  onCharacterUpdate, 
  onEvent 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('real_estate');
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const categories = [
    { id: 'real_estate', name: 'Real Estate', icon: Home, color: 'bg-blue-500' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, color: 'bg-red-500' },
    { id: 'luxury', name: 'Luxury', icon: Gem, color: 'bg-purple-500' },
    { id: 'technology', name: 'Technology', icon: Monitor, color: 'bg-green-500' }
  ];

  const portfolioValue = getAssetPortfolioValue(character);
  const ownedAssets = getAssetsByCategory(character, selectedCategory);
  const availableAssets = getAvailableAssets(character, selectedCategory);

  const handlePurchase = (assetId: string) => {
    const result = purchaseAsset(character, assetId, selectedCategory);
    if (result.success && result.character) {
      onCharacterUpdate(result.character);
      onEvent(result.message);
      setShowPurchaseDialog(false);
    } else {
      onEvent(result.message);
    }
  };

  const handleSell = (assetId: string) => {
    const result = sellAsset(character, assetId);
    if (result.success && result.character) {
      onCharacterUpdate(result.character);
      onEvent(result.message);
    } else {
      onEvent(result.message);
    }
  };

  const handleMaintain = (assetId: string) => {
    const result = maintainAsset(character, assetId);
    if (result.success && result.character) {
      onCharacterUpdate(result.character);
      onEvent(result.message);
    } else {
      onEvent(result.message);
    }
  };

  const handleInsure = (assetId: string) => {
    const result = insureAsset(character, assetId);
    if (result.success && result.character) {
      onCharacterUpdate(result.character);
      onEvent(result.message);
    } else {
      onEvent(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-24">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            🏠 Asset Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your valuable assets</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${portfolioValue.toLocaleString()}k
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Portfolio Value</div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {(character.assets || []).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Assets</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 bg-white/50 dark:bg-slate-800/50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">
                  {getAssetsByCategory(character, category.id).length} owned
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Asset Management */}
        <Tabs defaultValue="owned" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 dark:bg-slate-800/50">
            <TabsTrigger value="owned">Owned Assets</TabsTrigger>
            <TabsTrigger value="market">Asset Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="owned" className="mt-4">
            {ownedAssets.length > 0 ? (
              <div className="space-y-3">
                {ownedAssets.map((asset) => (
                  <Card key={asset.id} className="glass border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{asset.emoji}</div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {asset.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">${asset.currentValue}k</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Condition:</span>
                          <span className={`capitalize ${getAssetConditionColor(asset.condition)}`}>
                            {asset.condition}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Year:</span>
                          <span>{asset.yearPurchased}</span>
                        </div>
                        {asset.rentalIncome && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-500" />
                            <span>+${asset.rentalIncome}k/year</span>
                          </div>
                        )}
                        {asset.isInsured && (
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-blue-500" />
                            <span>Insured</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMaintain(asset.id)}
                          disabled={character.wealth < asset.maintenanceCost}
                          className="flex-1"
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          Maintain (${asset.maintenanceCost}k)
                        </Button>
                        
                        {!asset.isInsured && asset.insuranceCost && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleInsure(asset.id)}
                            disabled={character.wealth < asset.insuranceCost}
                            className="flex-1"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            Insure (${asset.insuranceCost}k)
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleSell(asset.id)}
                          className="flex-1"
                        >
                          Sell
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🏚️</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} assets yet
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Check the market to start building your portfolio
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="market" className="mt-4">
            {availableAssets.length > 0 ? (
              <div className="space-y-3">
                {availableAssets.map((asset) => (
                  <Card key={asset.id} className="glass border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{asset.emoji}</div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {asset.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">${asset.purchasePrice}k</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Maintenance:</span>
                          <span>${asset.maintenanceCost}k/year</span>
                        </div>
                        {asset.rentalIncome && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span>+${asset.rentalIncome}k/year</span>
                          </div>
                        )}
                        {asset.requirements && (
                          <>
                            {asset.requirements.minAge && (
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">Min Age:</span>
                                <span>{asset.requirements.minAge}</span>
                              </div>
                            )}
                            {asset.requirements.minIncome && (
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">Min Income:</span>
                                <span>${asset.requirements.minIncome}k</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <Button
                        onClick={() => handlePurchase(asset.id)}
                        disabled={character.wealth < asset.purchasePrice}
                        className="w-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Purchase for ${asset.purchasePrice}k
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🏪</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} available
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    You may need more wealth or income to access premium assets
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
