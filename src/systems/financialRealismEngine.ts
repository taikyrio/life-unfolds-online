import { Character } from '../types/character';
import { Investment, Loan } from '../types/core';
import { Asset } from '../types/assets';

interface MarketConditions {
  stockMarket: number; // -100 to 100 (crash to boom)
  realEstate: number;
  economy: number;
  inflation: number;
  interestRates: number;
}

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface FinancialOpportunity {
  id: string;
  type: 'investment' | 'business' | 'real_estate' | 'side_hustle';
  title: string;
  description: string;
  cost: number;
  potentialReturn: number;
  risk: 'low' | 'medium' | 'high';
  requirements: {
    minWealth?: number;
    minAge?: number;
    education?: string;
    skills?: string[];
  };
}

export class FinancialRealismEngine {
  private marketConditions: MarketConditions;
  private taxBrackets: TaxBracket[];
  private opportunities: FinancialOpportunity[];

  constructor() {
    this.marketConditions = {
      stockMarket: 20,
      realEstate: 15,
      economy: 10,
      inflation: 3.2,
      interestRates: 5.5
    };

    this.taxBrackets = [
      { min: 0, max: 12000, rate: 0 },
      { min: 12000, max: 40000, rate: 0.12 },
      { min: 40000, max: 85000, rate: 0.22 },
      { min: 85000, max: 200000, rate: 0.24 },
      { min: 200000, max: 500000, rate: 0.32 },
      { min: 500000, max: Infinity, rate: 0.37 }
    ];

    this.opportunities = this.initializeOpportunities();
  }

  private initializeOpportunities(): FinancialOpportunity[] {
    return [
      {
        id: 'index_fund',
        type: 'investment',
        title: 'Index Fund Investment',
        description: 'Invest in a diversified stock market index fund',
        cost: 1000,
        potentialReturn: 0.08,
        risk: 'low',
        requirements: { minWealth: 1000 }
      },
      {
        id: 'rental_property',
        type: 'real_estate',
        title: 'Rental Property',
        description: 'Purchase a property to rent out for passive income',
        cost: 80000,
        potentialReturn: 0.12,
        risk: 'medium',
        requirements: { minWealth: 20000, minAge: 25 }
      },
      {
        id: 'small_business',
        type: 'business',
        title: 'Small Business',
        description: 'Start your own small business',
        cost: 25000,
        potentialReturn: 0.25,
        risk: 'high',
        requirements: { minWealth: 30000, minAge: 21 }
      },
      {
        id: 'cryptocurrency',
        type: 'investment',
        title: 'Cryptocurrency',
        description: 'Invest in digital currencies',
        cost: 500,
        potentialReturn: 0.30,
        risk: 'high',
        requirements: { minWealth: 500, minAge: 18 }
      },
      {
        id: 'freelance_work',
        type: 'side_hustle',
        title: 'Freelance Work',
        description: 'Take on freelance projects in your spare time',
        cost: 0,
        potentialReturn: 0.15,
        risk: 'low',
        requirements: { minAge: 16 }
      }
    ];
  }

  public processYearlyFinances(character: Character): {
    character: Character;
    events: string[];
    taxesPaid: number;
    netWorth: number;
  } {
    const events: string[] = [];
    let updatedCharacter = { ...character };

    // Calculate annual income
    const annualIncome = this.calculateAnnualIncome(character);
    
    // Calculate and pay taxes
    const taxesPaid = this.calculateTaxes(annualIncome);
    const afterTaxIncome = annualIncome - taxesPaid;
    
    // Update character wealth with after-tax income
    updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + afterTaxIncome);
    
    events.push(`Annual income: $${annualIncome.toLocaleString()}`);
    events.push(`Taxes paid: $${taxesPaid.toLocaleString()}`);

    // Process investments
    const investmentResults = this.processInvestments(character);
    updatedCharacter.wealth += investmentResults.totalGains;
    events.push(...investmentResults.events);

    // Process loans
    const loanResults = this.processLoans(character);
    updatedCharacter.wealth -= loanResults.totalPayments;
    events.push(...loanResults.events);

    // Calculate living expenses
    const livingExpenses = this.calculateLivingExpenses(character);
    updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - livingExpenses);
    events.push(`Living expenses: $${livingExpenses.toLocaleString()}`);

    // Update market conditions
    this.updateMarketConditions();

    // Calculate net worth
    const netWorth = this.calculateNetWorth(updatedCharacter);

    return {
      character: updatedCharacter,
      events,
      taxesPaid,
      netWorth
    };
  }

  private calculateAnnualIncome(character: Character): number {
    let income = character.salary || 0;
    
    // Add investment income
    if (character.assets) {
      for (const asset of character.assets) {
        if (asset.category === 'investments') {
          income += asset.value * 0.05; // 5% dividend yield
        } else if (asset.category === 'real_estate') {
          income += asset.value * 0.08; // 8% rental yield
        }
      }
    }

    return income;
  }

  private calculateTaxes(income: number): number {
    let taxes = 0;
    let remainingIncome = income;

    for (const bracket of this.taxBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInThisBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );

      taxes += taxableInThisBracket * bracket.rate;
      remainingIncome -= taxableInThisBracket;
    }

    return Math.round(taxes);
  }

  private processInvestments(character: Character): {
    totalGains: number;
    events: string[];
  } {
    const events: string[] = [];
    let totalGains = 0;

    if (!character.assets) return { totalGains, events };

    for (const asset of character.assets) {
      if (asset.category === 'investments') {
        const assetType = asset.type as string;
        const marketPerformance = this.getMarketPerformance(assetType);
        const gain = asset.value * marketPerformance;
        
        asset.currentValue = (asset.currentValue || asset.value) + gain;
        totalGains += gain;

        if (Math.abs(gain) > asset.value * 0.1) { // Significant change
          const direction = gain > 0 ? 'gained' : 'lost';
          events.push(`Your ${asset.name} ${direction} $${Math.abs(gain).toLocaleString()}`);
        }
      }
    }

    return { totalGains, events };
  }

  private getMarketPerformance(assetType: string): number {
    const baseReturns = {
      'stocks': 0.10,
      'bonds': 0.04,
      'real_estate': 0.07,
      'crypto': 0.15
    };

    const volatility = {
      'stocks': 0.20,
      'bonds': 0.05,
      'real_estate': 0.10,
      'crypto': 0.50
    };

    const baseReturn = baseReturns[assetType as keyof typeof baseReturns] || 0.05;
    const vol = volatility[assetType as keyof typeof volatility] || 0.15;

    // Apply market conditions
    const marketMultiplier = 1 + (this.marketConditions.stockMarket / 100);
    const randomFactor = (Math.random() - 0.5) * vol * 2;

    return (baseReturn * marketMultiplier) + randomFactor;
  }

  private processLoans(character: Character): {
    totalPayments: number;
    events: string[];
  } {
    const events: string[] = [];
    let totalPayments = 0;

    // Simulate loan payments (this would need loan tracking in character)
    if (character.debts && character.debts > 0) {
      const monthlyPayment = character.debts * 0.01; // 1% of debt per month
      const annualPayment = monthlyPayment * 12;
      
      totalPayments = annualPayment;
      character.debts = Math.max(0, character.debts - (annualPayment * 0.7)); // 70% goes to principal
      
      events.push(`Loan payments: $${annualPayment.toLocaleString()}`);
      
      if (character.debts <= 0) {
        events.push(`Congratulations! You paid off all your debts!`);
      }
    }

    return { totalPayments, events };
  }

  private calculateLivingExpenses(character: Character): number {
    // Base living expenses scale with wealth and age
    let expenses = 15000; // Base annual expenses

    // Age-based expenses
    if (character.age < 25) {
      expenses *= 0.8; // Young adults spend less
    } else if (character.age > 50) {
      expenses *= 1.3; // Older adults have higher expenses
    }

    // Wealth-based lifestyle inflation
    const wealthMultiplier = Math.min(2.0, 1 + (character.wealth / 100000) * 0.5);
    expenses *= wealthMultiplier;

    // Health-based expenses
    if (character.health < 50) {
      expenses += 5000; // Medical expenses
    }

    // Family expenses
    const familySize = character.familyMembers?.length || 0;
    expenses += familySize * 2000;

    return Math.round(expenses);
  }

  private updateMarketConditions(): void {
    // Simulate market volatility
    this.marketConditions.stockMarket += (Math.random() - 0.5) * 20;
    this.marketConditions.stockMarket = Math.max(-80, Math.min(80, this.marketConditions.stockMarket));

    this.marketConditions.realEstate += (Math.random() - 0.5) * 10;
    this.marketConditions.realEstate = Math.max(-50, Math.min(50, this.marketConditions.realEstate));

    this.marketConditions.inflation = Math.max(0, this.marketConditions.inflation + (Math.random() - 0.5) * 2);
    this.marketConditions.interestRates = Math.max(0, this.marketConditions.interestRates + (Math.random() - 0.5) * 1);
  }

  private calculateNetWorth(character: Character): number {
    let netWorth = character.wealth;

    // Add asset values
    if (character.assets) {
      netWorth += character.assets.reduce((sum, asset) => sum + (asset.currentValue || asset.value), 0);
    }

    // Subtract debts
    if (character.debts) {
      netWorth -= character.debts;
    }

    return netWorth;
  }

  public getAvailableOpportunities(character: Character): FinancialOpportunity[] {
    return this.opportunities.filter(opp => {
      if (opp.requirements.minWealth && character.wealth < opp.requirements.minWealth) {
        return false;
      }
      if (opp.requirements.minAge && character.age < opp.requirements.minAge) {
        return false;
      }
      if (opp.requirements.education && character.educationLevel !== opp.requirements.education) {
        return false;
      }
      return true;
    });
  }

  public investInOpportunity(character: Character, opportunityId: string, amount: number): {
    character: Character;
    success: boolean;
    message: string;
  } {
    const opportunity = this.opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) {
      return { character, success: false, message: 'Investment opportunity not found.' };
    }

    if (character.wealth < amount) {
      return { character, success: false, message: 'Insufficient funds for this investment.' };
    }

    const updatedCharacter = { ...character };
    updatedCharacter.wealth -= amount;

    // Create new asset
    const newAsset: Asset = {
      id: `${opportunityId}_${Date.now()}`,
      name: opportunity.title,
      type: opportunity.type as any,
      category: 'investments',
      currentValue: amount,
      value: amount,
      purchasePrice: amount,
      condition: 'excellent',
      maintenanceCost: 0,
      yearPurchased: character.age,
      depreciationRate: 0,
      appreciationRate: opportunity.potentialReturn,
      isInsured: false,
      description: opportunity.description,
      emoji: '📈'
    };

    if (!updatedCharacter.assets) {
      updatedCharacter.assets = [];
    }
    updatedCharacter.assets.push(newAsset);

    return {
      character: updatedCharacter,
      success: true,
      message: `Successfully invested $${amount.toLocaleString()} in ${opportunity.title}.`
    };
  }

  public getMarketSummary(): {
    conditions: MarketConditions;
    outlook: string;
    recommendations: string[];
  } {
    const outlook = this.getMarketOutlook();
    const recommendations = this.getInvestmentRecommendations();

    return {
      conditions: this.marketConditions,
      outlook,
      recommendations
    };
  }

  private getMarketOutlook(): string {
    const avgMarket = (this.marketConditions.stockMarket + this.marketConditions.realEstate) / 2;
    
    if (avgMarket > 30) return 'Bull Market - Strong growth expected';
    if (avgMarket > 10) return 'Growing Market - Moderate growth expected';
    if (avgMarket > -10) return 'Stable Market - Steady performance expected';
    if (avgMarket > -30) return 'Bear Market - Declining performance expected';
    return 'Market Crash - Significant losses expected';
  }

  private getInvestmentRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.marketConditions.stockMarket < -20) {
      recommendations.push('Consider buying stocks at discounted prices');
    }
    if (this.marketConditions.interestRates > 6) {
      recommendations.push('High interest rates favor bonds and savings');
    }
    if (this.marketConditions.inflation > 5) {
      recommendations.push('Consider real estate and commodities to hedge against inflation');
    }
    if (this.marketConditions.realEstate > 20) {
      recommendations.push('Real estate market is overheated - consider taking profits');
    }

    return recommendations.length > 0 ? recommendations : ['Maintain diversified portfolio'];
  }
}

export const financialEngine = new FinancialRealismEngine();
