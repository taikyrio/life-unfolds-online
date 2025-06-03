
import { Character, RealEstateProperty } from '../types/game';

export interface PropertyListing {
  id: string;
  type: 'house' | 'apartment' | 'condo' | 'mansion' | 'commercial';
  address: string;
  price: number;
  monthlyRent?: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  neighborhood: string;
  condition: 'poor' | 'fair' | 'good' | 'excellent';
  amenities: string[];
  description: string;
  downPaymentRequired: number;
  monthlyMortgage: number;
  propertyTax: number;
  appreciationRate: number;
}

export interface RentalProperty {
  id: string;
  address: string;
  monthlyRent: number;
  deposit: number;
  leaseLength: number;
  amenities: string[];
  neighborhood: string;
  condition: 'poor' | 'fair' | 'good' | 'excellent';
}

export const propertyListings: PropertyListing[] = [
  {
    id: 'starter_apartment',
    type: 'apartment',
    address: '123 Oak Street, Apt 2B',
    price: 150,
    monthlyRent: 800,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    yearBuilt: 1990,
    neighborhood: 'Downtown',
    condition: 'fair',
    amenities: ['Parking', 'Laundry'],
    description: 'Cozy starter apartment perfect for young professionals',
    downPaymentRequired: 30,
    monthlyMortgage: 1200,
    propertyTax: 150,
    appreciationRate: 0.03
  },
  {
    id: 'family_house',
    type: 'house',
    address: '456 Maple Avenue',
    price: 350,
    monthlyRent: 2200,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 2005,
    neighborhood: 'Suburbs',
    condition: 'good',
    amenities: ['Garage', 'Yard', 'Modern Kitchen'],
    description: 'Beautiful family home in quiet suburban neighborhood',
    downPaymentRequired: 70,
    monthlyMortgage: 2800,
    propertyTax: 400,
    appreciationRate: 0.04
  },
  {
    id: 'luxury_condo',
    type: 'condo',
    address: '789 High Street, Penthouse',
    price: 800,
    monthlyRent: 4500,
    bedrooms: 2,
    bathrooms: 3,
    squareFeet: 1400,
    yearBuilt: 2018,
    neighborhood: 'Financial District',
    condition: 'excellent',
    amenities: ['Concierge', 'Gym', 'Pool', 'City View'],
    description: 'Luxury penthouse with stunning city views',
    downPaymentRequired: 160,
    monthlyMortgage: 6200,
    propertyTax: 800,
    appreciationRate: 0.06
  },
  {
    id: 'mansion',
    type: 'mansion',
    address: '1 Elite Drive',
    price: 2500,
    monthlyRent: 12000,
    bedrooms: 6,
    bathrooms: 5,
    squareFeet: 8000,
    yearBuilt: 2015,
    neighborhood: 'Elite Hills',
    condition: 'excellent',
    amenities: ['Pool', 'Tennis Court', 'Wine Cellar', 'Home Theater', 'Chef Kitchen'],
    description: 'Magnificent mansion for the ultra-wealthy',
    downPaymentRequired: 500,
    monthlyMortgage: 18000,
    propertyTax: 2000,
    appreciationRate: 0.08
  },
  {
    id: 'commercial_building',
    type: 'commercial',
    address: '100 Business Plaza',
    price: 1200,
    monthlyRent: 8000,
    bedrooms: 0,
    bathrooms: 4,
    squareFeet: 5000,
    yearBuilt: 2010,
    neighborhood: 'Business District',
    condition: 'good',
    amenities: ['Parking Lot', 'Conference Rooms', 'Security'],
    description: 'Prime commercial real estate investment opportunity',
    downPaymentRequired: 240,
    monthlyMortgage: 9500,
    propertyTax: 1200,
    appreciationRate: 0.05
  }
];

export const rentalProperties: RentalProperty[] = [
  {
    id: 'budget_studio',
    address: '100 Student Housing',
    monthlyRent: 600,
    deposit: 600,
    leaseLength: 12,
    amenities: ['WiFi', 'Furnished'],
    neighborhood: 'University Area',
    condition: 'fair'
  },
  {
    id: 'nice_apartment',
    address: '200 Pleasant Street',
    monthlyRent: 1400,
    deposit: 1400,
    leaseLength: 12,
    amenities: ['Pool', 'Gym', 'Parking'],
    neighborhood: 'Midtown',
    condition: 'good'
  },
  {
    id: 'luxury_rental',
    address: '300 Prestige Tower',
    monthlyRent: 3500,
    deposit: 7000,
    leaseLength: 12,
    amenities: ['Concierge', 'Valet', 'Spa', 'Rooftop'],
    neighborhood: 'Uptown',
    condition: 'excellent'
  }
];

export const getAffordableProperties = (character: Character): PropertyListing[] => {
  return propertyListings.filter(property => {
    const canAffordDownPayment = character.wealth >= property.downPaymentRequired;
    const monthlyIncome = character.salary || 0;
    const canAffordMortgage = monthlyIncome >= property.monthlyMortgage * 0.3; // 30% rule
    
    return canAffordDownPayment && canAffordMortgage;
  });
};

export const getAffordableRentals = (character: Character): RentalProperty[] => {
  const monthlyIncome = character.salary || 0;
  return rentalProperties.filter(rental => 
    monthlyIncome >= rental.monthlyRent * 0.3
  );
};

export const purchaseProperty = (
  character: Character,
  property: PropertyListing
): { success: boolean; result: string; effects: any } => {
  if (character.wealth < property.downPaymentRequired) {
    return {
      success: false,
      result: 'You don\'t have enough money for the down payment.',
      effects: {}
    };
  }
  
  const newProperty: RealEstateProperty = {
    id: property.id,
    type: property.type,
    address: property.address,
    purchasePrice: property.price,
    currentValue: property.price,
    monthlyPayment: property.monthlyMortgage,
    owned: true,
    mortgage: {
      remaining: property.price - property.downPaymentRequired,
      monthlyPayment: property.monthlyMortgage,
      interestRate: 0.045
    }
  };
  
  return {
    success: true,
    result: `Congratulations! You bought ${property.address}!`,
    effects: {
      wealth: -property.downPaymentRequired,
      happiness: 25,
      newProperty: newProperty
    }
  };
};

export const rentProperty = (
  character: Character,
  rental: RentalProperty
): { success: boolean; result: string; effects: any } => {
  const totalUpfront = rental.monthlyRent + rental.deposit;
  
  if (character.wealth < totalUpfront) {
    return {
      success: false,
      result: 'You don\'t have enough money for rent and deposit.',
      effects: {}
    };
  }
  
  return {
    success: true,
    result: `You rented ${rental.address}!`,
    effects: {
      wealth: -totalUpfront,
      happiness: 15,
      housing: rental.address
    }
  };
};

export const calculatePropertyAppreciation = (property: RealEstateProperty, years: number): number => {
  const listing = propertyListings.find(l => l.id === property.id);
  const appreciationRate = listing?.appreciationRate || 0.03;
  return property.purchasePrice * Math.pow(1 + appreciationRate, years);
};
