export interface Inputs {
  purchasePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTax: string;
  homeInsurance: string;
  hoaFees: string;
  maintenanceAnnual: string;
  renovationsAnnual: string;
  utilities: string;
  annualIncome: string;
  monthlyDebts: string;
  emergencyFund: string;
  desiredMonthlyHousing: string;
  safetyMultiplier: string;
}

export interface InputConfig {
    name: keyof Inputs;
    label: string;
    placeholder?: string;
    step?: string;
  }

export interface ChecklistItem {
  label: string;
  value: string;
  description: string;
  status: "good" | "warning" | "bad";
}

export interface CalculationResults {
  checklist: ChecklistItem[];
  summary: {
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
      mortgage: number;
      tax: number;
      insurance: number;
      hoa: number;
      maintenance: number;
      renovations: number;
      utilities: number;
    };
    loanTerm: number;
  };
}
