import { Asset, AssetCategory } from '../types/assets';

export const ASSET_CATALOG: Record<string, Asset[]> = {
  real_estate: [
    {
      id: 'starter_apartment',
      name: 'Studio Apartment',
      type: 'apartment',
      category: 'real_estate',
      purchasePrice: 150,
      currentValue: 150,
      value: 150, // Add for compatibility
      condition: 'good',
      maintenanceCost: 5,
      yearPurchased: 0,
      depreciationRate: 0.02,
      appreciationRate: 0.04,
      rentalIncome: 8,
      insuranceCost: 2,
      isInsured: false,
      description: 'A small but cozy apartment in the city',
      emoji: '🏠',
      requirements: { minAge: 18, minWealth: 50 }
    },
    {
      id: 'family_home',
      name: 'Family House',
      type: 'house',
      category: 'real_estate',
      purchasePrice: 400,
      currentValue: 400,
      value: 400, // Add for compatibility
      condition: 'good',
      maintenanceCost: 15,
      yearPurchased: 0,
      depreciationRate: 0.01,
      appreciationRate: 0.05,
      rentalIncome: 25,
      insuranceCost: 8,
      isInsured: false,
      description: 'A comfortable suburban home perfect for families',
      emoji: '🏡',
      requirements: { minAge: 25, minWealth: 200, minIncome: 50 }
    },
    {
      id: 'luxury_mansion',
      name: 'Luxury Mansion',
      type: 'mansion',
      category: 'real_estate',
      purchasePrice: 2000,
      currentValue: 2000,
      value: 2000, // Add for compatibility
      condition: 'excellent',
      maintenanceCost: 80,
      yearPurchased: 0,
      depreciationRate: 0,
      appreciationRate: 0.06,
      rentalIncome: 150,
      insuranceCost: 50,
      isInsured: false,
      description: 'An opulent mansion with all the luxury amenities',
      emoji: '🏰',
      requirements: { minAge: 30, minWealth: 1000, minIncome: 200 },
      benefits: { prestigePoints: 50, happinessBonus: 20, socialStatus: 30 }
    }
  ],
  vehicles: [
    {
      id: 'used_car',
      name: 'Used Car',
      type: 'car',
      category: 'vehicles',
      purchasePrice: 15,
      currentValue: 15,
      value: 15, // Add for compatibility
      condition: 'fair',
      maintenanceCost: 3,
      yearPurchased: 0,
      depreciationRate: 0.15,
      appreciationRate: 0,
      insuranceCost: 2,
      isInsured: false,
      description: 'A reliable used car to get you around',
      emoji: '🚗',
      requirements: { minAge: 16, minWealth: 10 }
    },
    {
      id: 'sports_car',
      name: 'Sports Car',
      type: 'car',
      category: 'vehicles',
      purchasePrice: 80,
      currentValue: 80,
      value: 80, // Add for compatibility
      condition: 'excellent',
      maintenanceCost: 8,
      yearPurchased: 0,
      depreciationRate: 0.12,
      appreciationRate: 0,
      insuranceCost: 6,
      isInsured: false,
      description: 'A sleek sports car that turns heads',
      emoji: '🏎️',
      requirements: { minAge: 21, minWealth: 50, minIncome: 30 },
      benefits: { prestigePoints: 15, happinessBonus: 10, socialStatus: 15 }
    },
    {
      id: 'luxury_yacht',
      name: 'Luxury Yacht',
      type: 'yacht',
      category: 'vehicles',
      purchasePrice: 500,
      currentValue: 500,
      value: 500, // Add for compatibility
      condition: 'excellent',
      maintenanceCost: 40,
      yearPurchased: 0,
      depreciationRate: 0.08,
      appreciationRate: 0.02,
      insuranceCost: 25,
      isInsured: false,
      description: 'A magnificent yacht for ocean adventures',
      emoji: '🛥️',
      requirements: { minAge: 30, minWealth: 300, minIncome: 100 },
      benefits: { prestigePoints: 40, happinessBonus: 25, socialStatus: 35 }
    }
  ],
  luxury: [
    {
      id: 'designer_watch',
      name: 'Designer Watch',
      type: 'watch',
      category: 'luxury',
      purchasePrice: 25,
      currentValue: 25,
      value: 25, // Add for compatibility
      condition: 'excellent',
      maintenanceCost: 1,
      yearPurchased: 0,
      depreciationRate: 0.05,
      appreciationRate: 0.08,
      insuranceCost: 2,
      isInsured: false,
      description: 'An elegant timepiece that shows your refined taste',
      emoji: '⌚',
      requirements: { minAge: 18, minWealth: 20 },
      benefits: { prestigePoints: 5, socialStatus: 8 }
    },
    {
      id: 'art_collection',
      name: 'Art Collection',
      type: 'art',
      category: 'luxury',
      purchasePrice: 100,
      currentValue: 100,
      value: 100, // Add for compatibility
      condition: 'excellent',
      maintenanceCost: 5,
      yearPurchased: 0,
      depreciationRate: 0,
      appreciationRate: 0.12,
      insuranceCost: 8,
      isInsured: false,
      description: 'A curated collection of fine art pieces',
      emoji: '🎨',
      requirements: { minAge: 25, minWealth: 80 },
      benefits: { prestigePoints: 20, happinessBonus: 15, socialStatus: 25 }
    }
  ],
  technology: [
    {
      id: 'gaming_setup',
      name: 'Gaming Setup',
      type: 'gaming',
      category: 'technology',
      purchasePrice: 5,
      currentValue: 5,
      value: 5, // Add for compatibility
      condition: 'good',
      maintenanceCost: 1,
      yearPurchased: 0,
      depreciationRate: 0.25,
      appreciationRate: 0,
      insuranceCost: 0.5,
      isInsured: false,
      description: 'High-end gaming computer and accessories',
      emoji: '🎮',
      requirements: { minAge: 12, minWealth: 3 },
      benefits: { happinessBonus: 10 }
    },
    {
      id: 'home_theater',
      name: 'Home Theater',
      type: 'electronics',
      category: 'technology',
      purchasePrice: 20,
      currentValue: 20,
      value: 20, // Add for compatibility
      condition: 'good',
      maintenanceCost: 2,
      yearPurchased: 0,
      depreciationRate: 0.20,
      appreciationRate: 0,
      insuranceCost: 1.5,
      isInsured: false,
      description: 'Premium home entertainment system',
      emoji: '📺',
      requirements: { minAge: 18, minWealth: 15 },
      benefits: { happinessBonus: 8, socialStatus: 5 }
    }
  ]
};

export const ASSET_MARKET_EVENTS = [
  {
    id: 'housing_boom',
    title: 'Housing Market Boom',
    description: 'Real estate prices are soaring across the country!',
    affectedCategories: ['real_estate'],
    valueMultiplier: 1.25,
    duration: 3,
    year: 0
  },
  {
    id: 'tech_crash',
    title: 'Technology Market Crash',
    description: 'Tech stocks and electronics lose significant value.',
    affectedCategories: ['technology'],
    valueMultiplier: 0.7,
    duration: 2,
    year: 0
  },
  {
    id: 'luxury_surge',
    title: 'Luxury Market Surge',
    description: 'High-end luxury items see unprecedented demand.',
    affectedCategories: ['luxury'],
    valueMultiplier: 1.4,
    duration: 2,
    year: 0
  }
];
