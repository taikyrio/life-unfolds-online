
import { Character, AssetTransaction, AssetMarketEvent } from '../types/game';

export const initializeAssetSystem = (character: Character): Character => {
  return {
    ...character,
    financialRecord: {
      ...character.financialRecord,
      assetTransactions: character.financialRecord?.assetTransactions || [],
      assetMarketEvents: character.financialRecord?.assetMarketEvents || []
    }
  };
};

export const processYearlyAssetUpdates = (character: Character): Character => {
  let updatedCharacter = { ...character };
  
  updatedCharacter.assets = updatedCharacter.assets.map(asset => ({
    ...asset,
    value: Math.max(0, asset.value * 0.95),
    currentValue: Math.max(0, asset.currentValue * 0.95)
  }));

  return updatedCharacter;
};

export const getAssetsByCategory = (character: Character, category: string) => {
  return character.assets.filter(asset => asset.category === category);
};

export const getAvailableAssets = (character: Character) => {
  return [
    { id: 'car', name: 'Car', cost: 20000, category: 'vehicle' },
    { id: 'house', name: 'House', cost: 200000, category: 'property' },
    { id: 'stocks', name: 'Stocks', cost: 1000, category: 'investment' }
  ];
};

export const purchaseAsset = (character: Character, assetId: string) => {
  // Simple implementation
  return character;
};

export const sellAsset = (character: Character, assetId: string) => {
  // Simple implementation
  return character;
};

export const maintainAsset = (character: Character, assetId: string) => {
  // Simple implementation
  return character;
};

export const insureAsset = (character: Character, assetId: string) => {
  // Simple implementation
  return character;
};

export const getAssetPortfolioValue = (character: Character): number => {
  return character.assets.reduce((total, asset) => total + asset.currentValue, 0);
};

export const getAssetConditionColor = (condition: string): string => {
  switch (condition) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
