
export interface HealthInsurance {
  provider: string;
  monthlyPremium: number;
  deductible: number;
  coveragePercentage: number;
  maxCoverage: number;
  coverage: number;
  active: boolean;
}

export interface HealthCondition {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  treatable: boolean;
  description: string;
}
