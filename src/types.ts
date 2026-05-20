export interface Inputs {
  purchasePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTax: string;
  homeInsurance: string;
  hoaFees: string;
  maintenanceAnnual: string;
  renovations: string;
  utilities: string;
  annualIncome: string;
  monthlyDebts: string;
  desiredMonthlyHousing: string;
  safetyMultiplier: string;
  monthlyRent: string;
  homeAppreciation: string;
  forcedAppreciation: string;
  buyingClosingCosts: string;
  sellingClosingCosts: string;
}

export interface InputConfig {
  name: keyof Inputs;
  label: string;
  sublabel?: string;
  placeholder?: string;
  step?: string;
  isCurrency?: boolean;
}

export interface ChecklistItem {
  label: string;
  value: string;
  description: string;
  status: "good" | "warning" | "bad";
}

export interface Summary {
  totalMonthlyCost: number;
  totalLifetimeCost: number;
  monthlyBreakdown: {
    mortgage: number;
    tax: number;
    insurance: number;
    hoa: number;
    maintenance: number;
    renovations: number;
    utilities: number;
  };
  lifetimeBreakdown: {
    downPayment: number;
    buyingClosingCosts: number;
    sellingClosingCosts: number;
    mortgage: number;
    tax: number;
    insurance: number;
    hoa: number;
    maintenance: number;
    renovations: number;
    utilities: number;
  };
  loanTerm: number;
}

export interface PeriodicCost {
  years: number;
  totalSpent: number;
  principalOwned: number;
  principalPaidOff: number;
  initialDownPayment: number;
  appreciationAmount: number;
  buyingCosts: number;
  sellingCosts: number;
  netCost: number;
  isCheaperThanRent: boolean;
  // Breakdowns
  totalMortgage: number;
  totalMaintenance: number;
  totalUtilsHoa: number;
  totalTaxIns: number;
}

export interface CalculationResults {
  checklist: ChecklistItem[];
  summary: Summary;
  comparisons: {
    periodic: PeriodicCost[];
  };
}
