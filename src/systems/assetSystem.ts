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
  
  // Update asset values based on depreciation/appreciation
  updatedCharacter.assets = updatedCharacter.assets.map(asset => ({
    ...asset,
    value: Math.max(0, asset.value * 0.95), // Simple 5% depreciation
    currentValue: Math.max(0, asset.currentValue * 0.95)
  }));

  return updatedCharacter;
};
