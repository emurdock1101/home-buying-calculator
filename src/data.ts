import type { InputConfig, Inputs } from "./types";

export const DEFAULT_VALUES: Inputs = {
  purchasePrice: "420000",
  downPayment: "130000",
  interestRate: "5.3",
  loanTerm: "15",
  propertyTax: "1.05",
  homeInsurance: "125",
  hoaFees: "70",
  maintenanceAnnual: "2500",
  renovationsAnnual: "3000",
  utilities: "300",
  annualIncome: "160000",
  monthlyDebts: "0",
  emergencyFund: "18000",
  closingCosts: "2.5",
  desiredMonthlyHousing: "4000",
  safetyMultiplier: "2",
  monthlyRent: "2600",
  homeAppreciation: "2",
};

export const PROPERTY_INPUTS: InputConfig[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price",
    sublabel: `Default: $${DEFAULT_VALUES.purchasePrice}`,
    placeholder: `Default: $${DEFAULT_VALUES.purchasePrice}`,
    isCurrency: true,
  },
  {
    name: "downPayment",
    label: "Down Payment",
    sublabel: `Default: $${DEFAULT_VALUES.downPayment}`,
    placeholder: `Default: $${DEFAULT_VALUES.downPayment}`,
    isCurrency: true,
  },
  {
    name: "closingCosts",
    label: "Closing Costs (%)",
    sublabel: `Default: ${DEFAULT_VALUES.closingCosts}%`,
    placeholder: `Default: ${DEFAULT_VALUES.closingCosts}%`,
    step: "0.1",
  },
  {
    name: "interestRate",
    label: "Interest Rate (%)",
    sublabel: `Default: ${DEFAULT_VALUES.interestRate}%`,
    placeholder: `Default: ${DEFAULT_VALUES.interestRate}%`,
    step: "0.1",
  },
  {
    name: "loanTerm",
    label: "Loan Term (years)",
    sublabel: `Default: ${DEFAULT_VALUES.loanTerm} years`,
    placeholder: `Default: ${DEFAULT_VALUES.loanTerm} years`,
  },
  {
    name: "propertyTax",
    label: "Property Tax Rate (%)",
    sublabel: `Default: ${DEFAULT_VALUES.propertyTax}%`,
    placeholder: `Default: ${DEFAULT_VALUES.propertyTax}%`,
    step: "0.1",
  },
  {
    name: "homeInsurance",
    label: "Home Insurance ($/month)",
    sublabel: `Default: $${DEFAULT_VALUES.homeInsurance}`,
    placeholder: `Default: $${DEFAULT_VALUES.homeInsurance}`,
    isCurrency: true,
  },
  {
    name: "hoaFees",
    label: "HOA Fees ($/month)",
    sublabel: `Default: $${DEFAULT_VALUES.hoaFees}`,
    placeholder: `Default: $${DEFAULT_VALUES.hoaFees}`,
    isCurrency: true,
  },
  {
    name: "maintenanceAnnual",
    label: "Maintenance ($/year)",
    sublabel: `Default: $${DEFAULT_VALUES.maintenanceAnnual} - e.g. HVAC, filters, water heater, etc.`,
    placeholder: `Default: ${DEFAULT_VALUES.maintenanceAnnual}`,
    isCurrency: true,
  },
  {
    name: "renovationsAnnual",
    label: "Renovations ($/year)",
    sublabel: `Default: $${DEFAULT_VALUES.renovationsAnnual} - e.g. Roof, expansions, new kitchen, etc.`,
    placeholder: `Default: ${DEFAULT_VALUES.renovationsAnnual}`,
    isCurrency: true,
  },
  {
    name: "utilities",
    label: "Utilities ($/month)",
    sublabel: `Default: $${DEFAULT_VALUES.utilities}`,
    placeholder: `Default: $${DEFAULT_VALUES.utilities}`,
    isCurrency: true,
  },
];

export const FINANCE_INPUTS: InputConfig[] = [
  {
    name: "annualIncome",
    label: "Annual Gross Income ($)",
    sublabel: `Default: $${DEFAULT_VALUES.annualIncome}`,
    placeholder: `Default: $${DEFAULT_VALUES.annualIncome}`,
    isCurrency: true,
  },
  {
    name: "monthlyDebts",
    label: "Other Monthly Debts",
    sublabel: `Default: $${DEFAULT_VALUES.monthlyDebts} - e.g. Car, Student Loans, etc.`,
    placeholder: `Default: $${DEFAULT_VALUES.monthlyDebts}`,
    isCurrency: true,
  },
  {
    name: "emergencyFund",
    label: "Emergency Fund ($)",
    sublabel: `Default: $${DEFAULT_VALUES.emergencyFund}`,
    placeholder: `Default: $${DEFAULT_VALUES.emergencyFund}`,
    isCurrency: true,
  },
  {
    name: "desiredMonthlyHousing",
    label: "Desired Monthly Housing ($)",
    sublabel: `Default: $${DEFAULT_VALUES.desiredMonthlyHousing}`,
    placeholder: `Default: $${DEFAULT_VALUES.desiredMonthlyHousing}`,
    isCurrency: true,
  },
  {
    name: "monthlyRent",
    label: "Potential Monthly Rent ($)",
    sublabel: `Default: $${DEFAULT_VALUES.monthlyRent}`,
    placeholder: `Default: $${DEFAULT_VALUES.monthlyRent}`,
    isCurrency: true,
  },
  {
    name: "safetyMultiplier",
    label: "Safety Multiplier (%)",
    sublabel: `Default: ${DEFAULT_VALUES.safetyMultiplier}% - multiply all costs by this extra buffer for safety`,
    placeholder: `Default: ${DEFAULT_VALUES.safetyMultiplier}%`,
  },
  {
    name: "homeAppreciation",
    label: "Annual Home Appreciation (%)",
    sublabel: `Default: ${DEFAULT_VALUES.homeAppreciation}%`,
    placeholder: `Default: ${DEFAULT_VALUES.homeAppreciation}%`,
    step: "0.1",
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