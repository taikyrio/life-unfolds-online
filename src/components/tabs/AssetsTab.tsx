import React, { useState, useMemo } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Home, Car, Gem, TrendingUp, Monitor, 
  ShoppingCart, Wrench, Shield, DollarSign,
  Filter, Search, SortAsc, SortDesc, Plus,
  TrendingDown, BarChart3, PieChart, Calendar
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
  const [sortBy, setSortBy] = useState<'value' | 'name' | 'condition' | 'age'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'real_estate', name: 'Real Estate', icon: Home, color: 'bg-blue-500', emoji: '🏠' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, color: 'bg-red-500', emoji: '🚗' },
    { id: 'luxury', name: 'Luxury', icon: Gem, color: 'bg-purple-500', emoji: '💎' },
    { id: 'technology', name: 'Tech', icon: Monitor, color: 'bg-green-500', emoji: '📱' }
  ];

  const portfolioValue = getAssetPortfolioValue(character);
  const totalAssets = (character.assets || []).length;
  
  // Portfolio analytics
  const portfolioAnalytics = useMemo(() => {
    const assets = character.assets || [];
    const totalPurchasePrice = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
    const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalReturn = totalCurrentValue - totalPurchasePrice;
    const returnPercentage = totalPurchasePrice > 0 ? (totalReturn / totalPurchasePrice) * 100 : 0;
    
    const categoryBreakdown = categories.map(category => {
      const categoryAssets = getAssetsByCategory(character, category.id);
      const value = categoryAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
      const percentage = totalCurrentValue > 0 ? (value / totalCurrentValue) * 100 : 0;
      return { ...category, value, percentage, count: categoryAssets.length };
    });

    return {
      totalReturn,
      returnPercentage,
      categoryBreakdown
    };
  }, [character.assets]);

  const ownedAssets = useMemo(() => {
    let assets = getAssetsByCategory(character, selectedCategory);
    
    // Filter by search term
    if (searchTerm) {
      assets = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort assets
    assets.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'value':
          comparison = a.currentValue - b.currentValue;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'condition':
          const conditionOrder = { excellent: 5, good: 4, fair: 3, poor: 2, damaged: 1 };
          comparison = (conditionOrder[a.condition as keyof typeof conditionOrder] || 0) - 
                      (conditionOrder[b.condition as keyof typeof conditionOrder] || 0);
          break;
        case 'age':
          comparison = a.yearPurchased - b.yearPurchased;
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return assets;
  }, [character, selectedCategory, sortBy, sortOrder, searchTerm]);

  const availableAssets = getAvailableAssets(character, selectedCategory);

  const handlePurchase = (assetId: string) => {
    const result = purchaseAsset(character, assetId);
    if (result.success && result.character) {
      onCharacterUpdate(result.character);
      onEvent(result.message);
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

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
            📊 Asset Portfolio
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage your investments</p>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="glass border-white/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${portfolioValue.toLocaleString()}k
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Portfolio Value</div>
              <div className={`text-xs mt-1 ${portfolioAnalytics.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioAnalytics.returnPercentage >= 0 ? '↗' : '↘'} {Math.abs(portfolioAnalytics.returnPercentage).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {totalAssets}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Total Assets</div>
              <div className={`text-xs mt-1 ${portfolioAnalytics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioAnalytics.totalReturn >= 0 ? '+' : ''}${portfolioAnalytics.totalReturn.toFixed(0)}k
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Breakdown */}
        <Card className="glass border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Portfolio Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {portfolioAnalytics.categoryBreakdown.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.emoji}</span>
                    <div>
                      <div className="text-xs font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.count} assets</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold">${category.value}k</div>
                    <div className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="grid grid-cols-4 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 bg-white/50 dark:bg-slate-800/50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="text-lg">{category.emoji}</div>
                <span className="text-xs font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">
                  {getAssetsByCategory(character, category.id).length}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Asset Management */}
        <Tabs defaultValue="owned" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 dark:bg-slate-800/50">
            <TabsTrigger value="owned" className="text-xs">My Assets</TabsTrigger>
            <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="owned" className="mt-3 space-y-3">
            {/* Search and Sort Controls */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white/50 dark:bg-slate-800/50"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort('value')}
                className="px-3"
              >
                <DollarSign className="h-3 w-3" />
                {sortBy === 'value' && (sortOrder === 'desc' ? <SortDesc className="h-3 w-3 ml-1" /> : <SortAsc className="h-3 w-3 ml-1" />)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort('condition')}
                className="px-3"
              >
                <Shield className="h-3 w-3" />
                {sortBy === 'condition' && (sortOrder === 'desc' ? <SortDesc className="h-3 w-3 ml-1" /> : <SortAsc className="h-3 w-3 ml-1" />)}
              </Button>
            </div>

            {ownedAssets.length > 0 ? (
              <div className="space-y-3">
                {ownedAssets.map((asset) => (
                  <Card key={asset.id} className="glass border-white/20">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xl">{asset.emoji}</div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                              {asset.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="text-xs">${asset.currentValue}k</Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            Bought: ${asset.purchasePrice}k
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1 mb-2 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Condition:</span>
                          <span className={`capitalize ${getAssetConditionColor(asset.condition)}`}>
                            {asset.condition}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span>{character.age - asset.yearPurchased}y old</span>
                        </div>
                        {asset.rentalIncome && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span>+${asset.rentalIncome}k/y</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMaintain(asset.id)}
                          disabled={character.wealth < asset.maintenanceCost}
                          className="flex-1 text-xs py-1"
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          ${asset.maintenanceCost}k
                        </Button>
                        
                        {!asset.isInsured && asset.insuranceCost && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleInsure(asset.id)}
                            disabled={character.wealth < asset.insuranceCost}
                            className="flex-1 text-xs py-1"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            ${asset.insuranceCost}k
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleSell(asset.id)}
                          className="flex-1 text-xs py-1"
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
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🏚️</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} assets
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Check the market to start investing
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="market" className="mt-3">
            {availableAssets.length > 0 ? (
              <div className="space-y-3">
                {availableAssets.map((asset) => (
                  <Card key={asset.id} className="glass border-white/20">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xl">{asset.emoji}</div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                              {asset.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">${asset.purchasePrice}k</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-1 mb-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Wrench className="h-3 w-3 text-gray-400" />
                          <span>${asset.maintenanceCost}k/year</span>
                        </div>
                        {asset.rentalIncome && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span>+${asset.rentalIncome}k/year</span>
                          </div>
                        )}
                        {asset.requirements?.minAge && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Min Age:</span>
                            <span>{asset.requirements.minAge}</span>
                          </div>
                        )}
                        {asset.requirements?.minIncome && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Min Income:</span>
                            <span>${asset.requirements.minIncome}k</span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => handlePurchase(asset.id)}
                        disabled={character.wealth < asset.purchasePrice}
                        className="w-full text-xs py-2"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy ${asset.purchasePrice}k
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">🏪</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} available
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Increase wealth or income to unlock premium assets
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
