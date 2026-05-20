import type { InputConfig, Inputs } from "./types";

export const DEFAULT_VALUES: Inputs = {
  purchasePrice: "390000",
  downPayment: "117000",
  interestRate: "5.75",
  loanTerm: "15",
  propertyTax: "1.05",
  homeInsurance: "125",
  hoaFees: "75",
  maintenanceAnnual: "2000",
  renovations: "30000",
  utilities: "300",
  annualIncome: "160000",
  monthlyDebts: "0",
  buyingClosingCosts: "12500",
  prepaidEscrow: "4000",
  sellingClosingCosts: "7",
  desiredMonthlyHousing: "4000",
  safetyMultiplier: "2",
  monthlyRent: "3100",
  homeAppreciation: "3",
  forcedAppreciation: "40000",
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
    name: "renovations",
    label: "Renovations (total $)",
    sublabel: `Default: $${DEFAULT_VALUES.renovations} - e.g. Roof, expansions, new kitchen, etc.`,
    placeholder: `Default: ${DEFAULT_VALUES.renovations}`,
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
    name: "desiredMonthlyHousing",
    label: "Desired Monthly Housing Budget ($)",
    sublabel: `Default: $${DEFAULT_VALUES.desiredMonthlyHousing}`,
    placeholder: `Default: $${DEFAULT_VALUES.desiredMonthlyHousing}`,
    isCurrency: true,
  },
];

export const OTHER_INPUTS: InputConfig[] = [
  {
    name: "buyingClosingCosts",
    label: "Buying Closing Fees ($)",
    sublabel: `Default: $${DEFAULT_VALUES.buyingClosingCosts} - sunk fees (origination, title, transfer tax, etc.)`,
    placeholder: `Default: $${DEFAULT_VALUES.buyingClosingCosts}`,
    isCurrency: true,
  },
  {
    name: "prepaidEscrow",
    label: "Prepaid Escrow at Close ($)",
    sublabel: `Default: $${DEFAULT_VALUES.prepaidEscrow} - cash to seed tax/ins escrow; refunded at sale, not sunk`,
    placeholder: `Default: $${DEFAULT_VALUES.prepaidEscrow}`,
    isCurrency: true,
  },
  {
    name: "sellingClosingCosts",
    label: "Selling Closing Costs (%)",
    sublabel: `Default: ${DEFAULT_VALUES.sellingClosingCosts}%`,
    placeholder: `Default: ${DEFAULT_VALUES.sellingClosingCosts}%`,
    step: "0.1",
  },

  {
    name: "homeAppreciation",
    label: "Annual Home Appreciation (%)",
    sublabel: `Default: ${DEFAULT_VALUES.homeAppreciation}%`,
    placeholder: `Default: ${DEFAULT_VALUES.homeAppreciation}%`,
    step: "0.1",
  },
  {
    name: "forcedAppreciation",
    label: "Forced Appreciation ($)",
    sublabel: `Default: $${DEFAULT_VALUES.forcedAppreciation} - one-time value boost from renovations`,
    placeholder: `Default: $${DEFAULT_VALUES.forcedAppreciation}`,
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
};