import type { InputConfig, Inputs } from "./types";

export const DEFAULT_VALUES: Inputs = {
  purchasePrice: "450000",
  downPayment: "95000",
  interestRate: "5.3",
  loanTerm: "12",
  propertyTax: "2.0",
  homeInsurance: "0.5",
  hoaFees: "130",
  maintenanceAnnual: "8000",
  renovationsAnnual: "10000",
  utilities: "300",
  annualIncome: "160000",
  monthlyDebts: "0",
  emergencyFund: "20000",
  desiredMonthlyHousing: "4000",
};

export const PROPERTY_INPUTS: InputConfig[] = [
    {
      name: "purchasePrice",
      label: `Purchase Price - Default: ${DEFAULT_VALUES.purchasePrice}`,
      placeholder: `e.g., ${DEFAULT_VALUES.purchasePrice}`,
    },
    {
      name: "downPayment",
      label: `Down Payment - Default: ${DEFAULT_VALUES.downPayment}`,
      placeholder: `e.g., ${DEFAULT_VALUES.downPayment}`,
    },
    {
      name: "interestRate",
      label: `Interest Rate (%) - Default: ${DEFAULT_VALUES.interestRate}%`,
      step: "0.1",
    },
    { name: "loanTerm", label: `Loan Term (years) - Default: ${DEFAULT_VALUES.loanTerm}` },
    {
      name: "propertyTax",
      label: `Property Tax Rate (%) - Default: ${DEFAULT_VALUES.propertyTax}%`,
      step: "0.1",
    },
    {
      name: "homeInsurance",
      label: "Home Insurance (% of price) - Default: 0.5%",
      step: "0.1",
    },
    { name: "hoaFees", label: `HOA Fees ($/month) - Default: ${DEFAULT_VALUES.hoaFees}`, placeholder: "0" },
    {
      name: "maintenanceAnnual",
      label: `Maintenance ($/year) - e.g. HVAC, filters, water heater - Default: ${DEFAULT_VALUES.maintenanceAnnual}`,
      placeholder: `Default: ${DEFAULT_VALUES.maintenanceAnnual}`,
    },
    {
      name: "renovationsAnnual",
      label: `Renovations ($/year) - e.g. Roof, driveway, expansions - Default: ${DEFAULT_VALUES.renovationsAnnual}`,
      placeholder: `Default: ${DEFAULT_VALUES.renovationsAnnual}`,
    },
    { name: "utilities", label: `Utilities ($/month) - Default: ${DEFAULT_VALUES.utilities}` },
  ];
  
  export const FINANCE_INPUTS: InputConfig[] = [
    {
      name: "annualIncome",
      label: "Annual Gross Income *",
      placeholder: "e.g., 100000",
    },
    { name: "emergencyFund", label: "Emergency Fund ($)", placeholder: "0" },
    {
      name: "desiredMonthlyHousing",
      label: "Desired Total Monthly Housing Cost ($)",
      placeholder: "e.g., 4000",
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