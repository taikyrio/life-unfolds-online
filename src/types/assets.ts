
import { Asset as CoreAsset } from './core';

export interface Asset extends CoreAsset {
  category: AssetCategory;
  condition: AssetCondition;
  maintenanceCost: number;
  yearPurchased: number;
  depreciationRate: number;
  rentalIncome?: number;
  insuranceCost?: number;
  isInsured: boolean;
  description: string;
  emoji: string;
  requirements?: AssetRequirements;
  benefits?: AssetBenefits;
  lastMaintenanceYear?: number;
  // Include both currentValue and value for compatibility
  currentValue: number;
  purchasePrice: number;
}

export interface AssetRequirements {
  minAge?: number;
  minWealth?: number;
  minIncome?: number;
  license?: string;
  creditScore?: number;
}

export interface AssetBenefits {
  prestigePoints?: number;
  happinessBonus?: number;
  healthBonus?: number;
  incomeMultiplier?: number;
  socialStatus?: number;
}

export type AssetType = 
  | 'house' | 'apartment' | 'mansion' | 'vacation_home'
  | 'car' | 'motorcycle' | 'boat' | 'plane' | 'yacht'
  | 'jewelry' | 'art' | 'watch' | 'designer_items'
  | 'stocks' | 'bonds' | 'crypto' | 'business'
  | 'electronics' | 'computers' | 'gaming' | 'gadgets';

export type AssetCategory = 'real_estate' | 'vehicles' | 'luxury' | 'investments' | 'technology' | 'collectibles';

export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';

export interface AssetMarketEvent {
  id: string;
  title: string;
  description: string;
  affectedCategories: AssetCategory[];
  valueMultiplier: number;
  duration: number;
  year: number;
}

export interface AssetTransaction {
  id: string;
  assetId: string;
  type: 'purchase' | 'sale' | 'maintenance' | 'insurance' | 'rental_income';
  amount: number;
  year: number;
  description: string;
}
