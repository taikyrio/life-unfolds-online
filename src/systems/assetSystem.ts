
import { Character } from '../types/game';
import { Asset } from '../types/assets';

export const getAssetsByCategory = (character: Character, category: string): Asset[] => {
  if (!character.assets) return [];
  return character.assets.filter((asset: any) => asset.category === category);
};

export const getAvailableAssets = (character: Character, category: string): Asset[] => {
  // Mock available assets for purchase
  const mockAssets: Asset[] = [
    {
      id: 'basic_car',
      name: 'Basic Car',
      type: 'car',
      category: 'vehicles' as any,
      purchasePrice: 15,
      currentValue: 15,
      condition: 'good' as any,
      maintenanceCost: 2,
      yearPurchased: character.age,
      depreciationRate: 0.15,
      appreciationRate: 0,
      isInsured: false,
      description: 'A reliable basic car',
      emoji: '🚗'
    }
  ];
  
  return mockAssets.filter((asset: any) => asset.category === category);
};

export const purchaseAsset = (character: Character, assetId: string): {
  success: boolean;
  message: string;
  character?: Character;
} => {
  const availableAssets = getAvailableAssets(character, 'vehicles');
  const asset = availableAssets.find(a => a.id === assetId);
  
  if (!asset) {
    return { success: false, message: 'Asset not found' };
  }
  
  if (character.wealth < (asset as any).purchasePrice) {
    return { success: false, message: 'Not enough money' };
  }
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - (asset as any).purchasePrice,
    assets: [...(character.assets || []), asset]
  };
  
  return {
    success: true,
    message: `Successfully purchased ${asset.name}!`,
    character: updatedCharacter
  };
};

export const sellAsset = (character: Character, assetId: string): {
  success: boolean;
  message: string;
  character?: Character;
} => {
  const asset = character.assets?.find(a => a.id === assetId);
  if (!asset) {
    return { success: false, message: 'Asset not found' };
  }
  
  const sellPrice = (asset as any).currentValue || asset.value;
  const updatedCharacter = {
    ...character,
    wealth: character.wealth + sellPrice,
    assets: character.assets?.filter(a => a.id !== assetId) || []
  };
  
  return {
    success: true,
    message: `Sold ${asset.name} for $${sellPrice}k`,
    character: updatedCharacter
  };
};

export const maintainAsset = (character: Character, assetId: string): {
  success: boolean;
  message: string;
  character?: Character;
} => {
  const asset = character.assets?.find(a => a.id === assetId);
  if (!asset) {
    return { success: false, message: 'Asset not found' };
  }
  
  const maintenanceCost = (asset as any).maintenanceCost || 1;
  if (character.wealth < maintenanceCost) {
    return { success: false, message: 'Not enough money for maintenance' };
  }
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - maintenanceCost
  };
  
  return {
    success: true,
    message: `Maintained ${asset.name}`,
    character: updatedCharacter
  };
};

export const insureAsset = (character: Character, assetId: string): {
  success: boolean;
  message: string;
  character?: Character;
} => {
  const asset = character.assets?.find(a => a.id === assetId);
  if (!asset) {
    return { success: false, message: 'Asset not found' };
  }
  
  const insuranceCost = (asset as any).insuranceCost || 2;
  if (character.wealth < insuranceCost) {
    return { success: false, message: 'Not enough money for insurance' };
  }
  
  const updatedCharacter = {
    ...character,
    wealth: character.wealth - insuranceCost
  };
  
  return {
    success: true,
    message: `Insured ${asset.name}`,
    character: updatedCharacter
  };
};

export const getAssetPortfolioValue = (character: Character): number => {
  if (!character.assets) return 0;
  return character.assets.reduce((total, asset) => {
    return total + ((asset as any).currentValue || asset.value);
  }, 0);
};

export const getAssetConditionColor = (condition: string): string => {
  switch (condition) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-orange-600';
    case 'damaged': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
