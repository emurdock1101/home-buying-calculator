import type { InputConfig, Inputs } from "./types";

export const DEFAULT_VALUES: Inputs = {
  purchasePrice: "450000",
  downPayment: "100000",
  interestRate: "5.3",
  loanTerm: "15",
  propertyTax: "1.1",
  homeInsurance: "0.9",
  hoaFees: "90",
  maintenanceAnnual: "2500",
  renovationsAnnual: "3500",
  utilities: "300",
  annualIncome: "160000",
  monthlyDebts: "0",
  emergencyFund: "18000",
  desiredMonthlyHousing: "4000",
  safetyMultiplier: "10",
};

export const PROPERTY_INPUTS: InputConfig[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price",
    sublabel: `Default: $${DEFAULT_VALUES.purchasePrice}`,
    placeholder: `e.g., ${DEFAULT_VALUES.purchasePrice}`,
    isCurrency: true,
  },
  {
    name: "downPayment",
    label: "Down Payment",
    sublabel: `Default: $${DEFAULT_VALUES.downPayment}`,
    placeholder: `e.g., ${DEFAULT_VALUES.downPayment}`,
    isCurrency: true,
  },
  {
    name: "interestRate",
    label: "Interest Rate (%)",
    sublabel: `Default: ${DEFAULT_VALUES.interestRate}%`,
    step: "0.1",
  },
  {
    name: "loanTerm",
    label: "Loan Term (years)",
    sublabel: `Default: ${DEFAULT_VALUES.loanTerm} years`,
  },
  {
    name: "propertyTax",
    label: "Property Tax Rate (%)",
    sublabel: `Default: ${DEFAULT_VALUES.propertyTax}%`,
    step: "0.1",
  },
  {
    name: "homeInsurance",
    label: "Home Insurance (% of price)",
    sublabel: `Default: ${DEFAULT_VALUES.homeInsurance}%`,
    step: "0.1",
  },
  {
    name: "hoaFees",
    label: "HOA Fees ($/month)",
    sublabel: `Default: $${DEFAULT_VALUES.hoaFees}`,
    placeholder: "0",
    isCurrency: true,
  },
  {
    name: "maintenanceAnnual",
    label: "Maintenance ($/year)",
    sublabel: `e.g. HVAC, filters - Default: $${DEFAULT_VALUES.maintenanceAnnual}`,
    placeholder: `Default: ${DEFAULT_VALUES.maintenanceAnnual}`,
    isCurrency: true,
  },
  {
    name: "renovationsAnnual",
    label: "Renovations ($/year)",
    sublabel: `e.g. Roof, expansions - Default: $${DEFAULT_VALUES.renovationsAnnual}`,
    placeholder: `Default: ${DEFAULT_VALUES.renovationsAnnual}`,
    isCurrency: true,
  },
  {
    name: "utilities",
    label: "Utilities ($/month)",
    sublabel: `Default: $${DEFAULT_VALUES.utilities}`,
    isCurrency: true,
  },
];

export const FINANCE_INPUTS: InputConfig[] = [
  {
    name: "annualIncome",
    label: "Annual Gross Income ($)",
    sublabel: `Default: $${DEFAULT_VALUES.annualIncome}`,
    placeholder: "e.g., 100000",
    isCurrency: true,
  },
  {
    name: "monthlyDebts",
    label: "Other Monthly Debts",
    sublabel: `Car, Student Loans, etc - Default: $${DEFAULT_VALUES.monthlyDebts}`,
    placeholder: "0",
    isCurrency: true,
  },
  {
    name: "emergencyFund",
    label: "Emergency Fund ($)",
    sublabel: `Default: $${DEFAULT_VALUES.emergencyFund}`,
    placeholder: "0",
    isCurrency: true,
  },
  {
    name: "desiredMonthlyHousing",
    label: "Desired Monthly Housing ($)",
    sublabel: `Default: $${DEFAULT_VALUES.desiredMonthlyHousing}`,
    placeholder: "e.g., 4000",
    isCurrency: true,
  },
  {
    name: "safetyMultiplier",
    label: "Safety Multiplier (%)",
    sublabel: "e.g., 10",
    placeholder: "e.g., 10",
  },
];

export const THRESHOLDS = {
  DOWN_PAYMENT: {
    GOOD: 20,
    WARNING: 10,
  },
  FRONT_END_RATIO: {
    GOOD: 28,
    WARNING: 33,
  },
  BACK_END_RATIO: {
    GOOD: 36,
    WARNING: 43,
  },
  PRICE_TO_INCOME: {
    GOOD: 3,
    WARNING: 4,
  },
  EMERGENCY_FUND_MINIMUM: 20000,
};

export const FORMULA_DEFAULTS = {
  interestRate: 7.0,
  loanTerm: 30,
  propertyTax: 1.2,
  homeInsurance: 0.5,
  maintenanceAnnual: 8000,
  renovationsAnnual: 10000,
  utilities: 300,
};
