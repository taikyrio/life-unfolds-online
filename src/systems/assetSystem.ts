
import { Character } from '../types/game';

export interface AssetActionResult {
  success: boolean;
  character: Character;
  message: string;
}

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
    { 
      id: 'car', 
      name: 'Car', 
      cost: 20000, 
      category: 'vehicle',
      emoji: '🚗',
      description: 'A reliable vehicle',
      purchasePrice: 20000,
      maintenanceCost: 1000,
      rentalIncome: 0,
      requirements: { minAge: 16 }
    },
    { 
      id: 'house', 
      name: 'House', 
      cost: 200000, 
      category: 'property',
      emoji: '🏠',
      description: 'A nice home',
      purchasePrice: 200000,
      maintenanceCost: 5000,
      rentalIncome: 2000,
      requirements: { minAge: 18, minWealth: 50000 }
    }
  ];
};

export const purchaseAsset = (character: Character, assetId: string): AssetActionResult => {
  const availableAssets = getAvailableAssets(character);
  const asset = availableAssets.find(a => a.id === assetId);
  
  if (!asset) {
    return {
      success: false,
      character,
      message: 'Asset not found'
    };
  }
  
  if (character.wealth < asset.cost) {
    return {
      success: false,
      character,
      message: 'Not enough money'
    };
  }
  
  const newAsset = {
    id: asset.id,
    name: asset.name,
    value: asset.cost,
    category: asset.category as any,
    type: asset.name,
    condition: 'excellent' as const,
    purchasePrice: asset.cost,
    currentValue: asset.cost,
    maintenanceCost: asset.maintenanceCost || 0,
    yearPurchased: new Date().getFullYear(),
    description: asset.description,
    emoji: asset.emoji
  };
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - asset.cost,
    assets: [...character.assets, newAsset]
  };
  
  return {
    success: true,
    character: updatedCharacter,
    message: `Successfully purchased ${asset.name}!`
  };
};

export const sellAsset = (character: Character, assetId: string): AssetActionResult => {
  const assetIndex = character.assets.findIndex(a => a.id === assetId);
  
  if (assetIndex === -1) {
    return {
      success: false,
      character,
      message: 'Asset not found'
    };
  }
  
  const asset = character.assets[assetIndex];
  const salePrice = Math.floor(asset.currentValue * 0.8);
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth + salePrice,
    assets: character.assets.filter((_, index) => index !== assetIndex)
  };
  
  return {
    success: true,
    character: updatedCharacter,
    message: `Sold ${asset.name} for $${salePrice}`
  };
};

export const maintainAsset = (character: Character, assetId: string): AssetActionResult => {
  const assetIndex = character.assets.findIndex(a => a.id === assetId);
  
  if (assetIndex === -1) {
    return {
      success: false,
      character,
      message: 'Asset not found'
    };
  }
  
  const asset = character.assets[assetIndex];
  const maintenanceCost = asset.maintenanceCost || 100;
  
  if (character.wealth < maintenanceCost) {
    return {
      success: false,
      character,
      message: 'Not enough money for maintenance'
    };
  }
  
  const updatedAssets = [...character.assets];
  updatedAssets[assetIndex] = {
    ...asset,
    condition: 'excellent',
    currentValue: Math.min(asset.purchasePrice, asset.currentValue * 1.1)
  };
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - maintenanceCost,
    assets: updatedAssets
  };
  
  return {
    success: true,
    character: updatedCharacter,
    message: `Maintained ${asset.name} for $${maintenanceCost}`
  };
};

export const insureAsset = (character: Character, assetId: string): AssetActionResult => {
  const assetIndex = character.assets.findIndex(a => a.id === assetId);
  
  if (assetIndex === -1) {
    return {
      success: false,
      character,
      message: 'Asset not found'
    };
  }
  
  const asset = character.assets[assetIndex];
  const insuranceCost = Math.floor(asset.currentValue * 0.02);
  
  if (character.wealth < insuranceCost) {
    return {
      success: false,
      character,
      message: 'Not enough money for insurance'
    };
  }
  
  const updatedAssets = [...character.assets];
  updatedAssets[assetIndex] = {
    ...asset,
    isInsured: true,
    insuranceCost
  };
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - insuranceCost,
    assets: updatedAssets
  };
  
  return {
    success: true,
    character: updatedCharacter,
    message: `Insured ${asset.name} for $${insuranceCost}/year`
  };
};

export const getAssetPortfolioValue = (character: Character): number => {
  return character.assets.reduce((total, asset) => total + asset.currentValue, 0);
};

export const getAssetConditionColor = (condition: string | number): string => {
  if (typeof condition === 'number') {
    if (condition >= 80) return 'text-green-600';
    if (condition >= 60) return 'text-blue-600';
    if (condition >= 40) return 'text-yellow-600';
    if (condition >= 20) return 'text-red-600';
    return 'text-gray-600';
  }
  
  switch (condition) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
