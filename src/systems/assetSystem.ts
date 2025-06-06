
import { Character } from '../types/game';
import { Asset as DetailedAsset } from '../types/assets';

export interface AssetPortfolioAnalytics {
  totalValue: number;
  totalReturn: number;
  returnPercentage: number;
}

export const getAssetsByCategory = (character: Character, category: string): any[] => {
  return character.assets?.filter(asset => {
    switch (category) {
      case 'real_estate':
        return asset.type === 'house';
      case 'vehicles':
        return asset.type === 'car';
      case 'luxury':
        return asset.type === 'other';
      case 'technology':
        return asset.type === 'investment';
      default:
        return false;
    }
  }) || [];
};

export const getAvailableAssets = (character: Character, category: string): DetailedAsset[] => {
  // Return empty array for now - would contain purchasable assets
  return [];
};

export const purchaseAsset = (character: Character, assetId: string): { success: boolean; message: string; character?: Character } => {
  return {
    success: false,
    message: 'Asset purchasing not implemented yet'
  };
};

export const sellAsset = (character: Character, assetId: string): { success: boolean; message: string; character?: Character } => {
  return {
    success: false,
    message: 'Asset selling not implemented yet'
  };
};

export const maintainAsset = (character: Character, assetId: string): { success: boolean; message: string; character?: Character } => {
  return {
    success: false,
    message: 'Asset maintenance not implemented yet'
  };
};

export const insureAsset = (character: Character, assetId: string): { success: boolean; message: string; character?: Character } => {
  return {
    success: false,
    message: 'Asset insurance not implemented yet'
  };
};

export const getAssetPortfolioValue = (character: Character): number => {
  return character.assets?.reduce((total, asset) => total + (asset.value || 0), 0) || 0;
};

export const getAssetConditionColor = (condition: string): string => {
  switch (condition) {
    case 'excellent':
      return 'text-green-600';
    case 'good':
      return 'text-blue-600';
    case 'fair':
      return 'text-yellow-600';
    case 'poor':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
