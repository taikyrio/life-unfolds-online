import { Character, Asset, AssetTransaction, AssetMarketEvent } from '../types/game';
import { ASSET_CATALOG, ASSET_MARKET_EVENTS } from '../data/assetData';

export const initializeAssetSystem = (character: Character): Character => {
  return {
    ...character,
    assets: character.assets || [],
    assetTransactions: character.assetTransactions || [],
    assetMarketEvents: character.assetMarketEvents || []
  };
};

export const purchaseAsset = (
  character: Character, 
  assetId: string, 
  category: string
): { success: boolean; character?: Character; message: string } => {
  const assetTemplate = ASSET_CATALOG[category]?.find(a => a.id === assetId);
  if (!assetTemplate) {
    return { success: false, message: 'Asset not found' };
  }

  // Check requirements
  const requirements = assetTemplate.requirements;
  if (requirements) {
    if (requirements.minAge && character.age < requirements.minAge) {
      return { success: false, message: `You must be at least ${requirements.minAge} years old` };
    }
    if (requirements.minWealth && character.wealth < requirements.minWealth) {
      return { success: false, message: `You need at least $${requirements.minWealth}k to afford this` };
    }
    if (requirements.minIncome && character.salary && character.salary < requirements.minIncome) {
      return { success: false, message: `You need at least $${requirements.minIncome}k annual income` };
    }
  }

  // Check if can afford
  if (character.wealth < assetTemplate.purchasePrice) {
    return { 
      success: false, 
      message: `Insufficient funds. Need $${assetTemplate.purchasePrice}k, have $${character.wealth}k` 
    };
  }

  // Create new asset instance
  const newAsset: Asset = {
    ...assetTemplate,
    id: `${assetId}_${Date.now()}`,
    yearPurchased: character.age,
    currentValue: assetTemplate.purchasePrice
  };

  // Create transaction
  const transaction: AssetTransaction = {
    id: `purchase_${Date.now()}`,
    assetId: newAsset.id,
    type: 'purchase',
    amount: -assetTemplate.purchasePrice,
    year: character.age,
    description: `Purchased ${assetTemplate.name}`
  };

  const updatedCharacter: Character = {
    ...character,
    wealth: character.wealth - assetTemplate.purchasePrice,
    assets: [...(character.assets || []), newAsset],
    assetTransactions: [...(character.assetTransactions || []), transaction]
  };

  // Apply asset benefits
  if (assetTemplate.benefits) {
    const benefits = assetTemplate.benefits;
    updatedCharacter.happiness = Math.min(100, (updatedCharacter.happiness || 50) + (benefits.happinessBonus || 0));
    updatedCharacter.health = Math.min(100, (updatedCharacter.health || 50) + (benefits.healthBonus || 0));
  }

  return { 
    success: true, 
    character: updatedCharacter, 
    message: `Successfully purchased ${assetTemplate.name}!` 
  };
};

export const sellAsset = (
  character: Character, 
  assetId: string
): { success: boolean; character?: Character; message: string } => {
  const assetIndex = (character.assets || []).findIndex(a => a.id === assetId);
  if (assetIndex === -1) {
    return { success: false, message: 'Asset not found' };
  }

  const asset = character.assets![assetIndex];
  const salePrice = Math.floor(asset.currentValue * 0.9); // 10% selling fee

  const transaction: AssetTransaction = {
    id: `sale_${Date.now()}`,
    assetId: asset.id,
    type: 'sale',
    amount: salePrice,
    year: character.age,
    description: `Sold ${asset.name}`
  };

  const updatedAssets = [...character.assets!];
  updatedAssets.splice(assetIndex, 1);

  const updatedCharacter: Character = {
    ...character,
    wealth: character.wealth + salePrice,
    assets: updatedAssets,
    assetTransactions: [...(character.assetTransactions || []), transaction]
  };

  return { 
    success: true, 
    character: updatedCharacter, 
    message: `Sold ${asset.name} for $${salePrice}k` 
  };
};

export const maintainAsset = (
  character: Character, 
  assetId: string
): { success: boolean; character?: Character; message: string } => {
  const assetIndex = (character.assets || []).findIndex(a => a.id === assetId);
  if (assetIndex === -1) {
    return { success: false, message: 'Asset not found' };
  }

  const asset = character.assets![assetIndex];
  const maintenanceCost = asset.maintenanceCost;

  if (character.wealth < maintenanceCost) {
    return { success: false, message: `Need $${maintenanceCost}k for maintenance` };
  }

  const transaction: AssetTransaction = {
    id: `maintenance_${Date.now()}`,
    assetId: asset.id,
    type: 'maintenance',
    amount: -maintenanceCost,
    year: character.age,
    description: `Maintained ${asset.name}`
  };

  const updatedAssets = [...character.assets!];
  updatedAssets[assetIndex] = {
    ...asset,
    condition: improveCondition(asset.condition),
    lastMaintenanceYear: character.age
  };

  const updatedCharacter: Character = {
    ...character,
    wealth: character.wealth - maintenanceCost,
    assets: updatedAssets,
    assetTransactions: [...(character.assetTransactions || []), transaction]
  };

  return { 
    success: true, 
    character: updatedCharacter, 
    message: `Maintained ${asset.name}` 
  };
};

export const insureAsset = (
  character: Character, 
  assetId: string
): { success: boolean; character?: Character; message: string } => {
  const assetIndex = (character.assets || []).findIndex(a => a.id === assetId);
  if (assetIndex === -1) {
    return { success: false, message: 'Asset not found' };
  }

  const asset = character.assets![assetIndex];
  const insuranceCost = asset.insuranceCost || 0;

  if (character.wealth < insuranceCost) {
    return { success: false, message: `Need $${insuranceCost}k for insurance` };
  }

  const transaction: AssetTransaction = {
    id: `insurance_${Date.now()}`,
    assetId: asset.id,
    type: 'insurance',
    amount: -insuranceCost,
    year: character.age,
    description: `Insured ${asset.name}`
  };

  const updatedAssets = [...character.assets!];
  updatedAssets[assetIndex] = { ...asset, isInsured: true };

  const updatedCharacter: Character = {
    ...character,
    wealth: character.wealth - insuranceCost,
    assets: updatedAssets,
    assetTransactions: [...(character.assetTransactions || []), transaction]
  };

  return { 
    success: true, 
    character: updatedCharacter, 
    message: `Insured ${asset.name}` 
  };
};

export const processYearlyAssetUpdates = (character: Character): Character => {
  if (!character.assets || character.assets.length === 0) {
    return character;
  }

  let updatedCharacter = { ...character };
  const updatedAssets = [...character.assets];
  const newTransactions: AssetTransaction[] = [];

  // Process each asset
  updatedAssets.forEach((asset, index) => {
    // Age the asset (depreciation/appreciation)
    const ageMultiplier = character.age - asset.yearPurchased;
    const depreciationFactor = Math.pow(1 - asset.depreciationRate, ageMultiplier);
    const appreciationFactor = Math.pow(1 + asset.appreciationRate, ageMultiplier);
    
    updatedAssets[index] = {
      ...asset,
      currentValue: Math.max(1, Math.floor(asset.purchasePrice * depreciationFactor * appreciationFactor)),
      condition: degradeCondition(asset.condition, asset.lastMaintenanceYear, character.age)
    };

    // Generate rental income
    if (asset.rentalIncome && asset.rentalIncome > 0) {
      const rentalAmount = Math.floor(asset.rentalIncome);
      updatedCharacter.wealth += rentalAmount;
      
      newTransactions.push({
        id: `rental_${asset.id}_${character.age}`,
        assetId: asset.id,
        type: 'rental_income',
        amount: rentalAmount,
        year: character.age,
        description: `Rental income from ${asset.name}`
      });
    }
  });

  return {
    ...updatedCharacter,
    assets: updatedAssets,
    assetTransactions: [...(character.assetTransactions || []), ...newTransactions]
  };
};

export const getAssetPortfolioValue = (character: Character): number => {
  return (character.assets || []).reduce((total, asset) => total + asset.currentValue, 0);
};

export const getAssetsByCategory = (character: Character, category: string): Asset[] => {
  return (character.assets || []).filter(asset => asset.category === category);
};

export const getAvailableAssets = (character: Character, category: string): Asset[] => {
  const available = ASSET_CATALOG[category] || [];
  const owned = character.assets || [];
  
  return available.filter(asset => {
    // Check if already owned (for unique items)
    const alreadyOwned = owned.some(ownedAsset => ownedAsset.type === asset.type);
    if (alreadyOwned && ['mansion', 'yacht', 'art_collection'].includes(asset.id)) {
      return false;
    }
    
    // Check requirements
    const requirements = asset.requirements;
    if (requirements) {
      if (requirements.minAge && character.age < requirements.minAge) return false;
      if (requirements.minWealth && character.wealth < requirements.minWealth) return false;
      if (requirements.minIncome && character.salary && character.salary < requirements.minIncome) return false;
    }
    
    return true;
  });
};

// Helper functions
const improveCondition = (condition: string): string => {
  const conditions = ['damaged', 'poor', 'fair', 'good', 'excellent'];
  const currentIndex = conditions.indexOf(condition);
  return conditions[Math.min(currentIndex + 1, conditions.length - 1)];
};

const degradeCondition = (condition: string, lastMaintenance?: number, currentYear?: number): string => {
  if (!lastMaintenance || !currentYear) return condition;
  
  const yearsSinceMaintenance = currentYear - lastMaintenance;
  if (yearsSinceMaintenance < 2) return condition;
  
  const conditions = ['excellent', 'good', 'fair', 'poor', 'damaged'];
  const currentIndex = conditions.indexOf(condition);
  const degradeAmount = Math.floor(yearsSinceMaintenance / 2);
  
  return conditions[Math.min(currentIndex + degradeAmount, conditions.length - 1)];
};

export const getAssetConditionColor = (condition: string | number): string => {
  if (typeof condition === 'number') {
    if (condition >= 90) return 'text-green-600';
    if (condition >= 70) return 'text-blue-600';
    if (condition >= 50) return 'text-yellow-600';
    if (condition >= 30) return 'text-orange-600';
    return 'text-red-600';
  }
  
  switch (condition) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-orange-600';
    case 'damaged': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
