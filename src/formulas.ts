import { THRESHOLDS, FORMULA_DEFAULTS } from "./data";
import type { Inputs, ChecklistItem, CalculationResults } from "./types";

const MONTHS_IN_YEAR = 12;
const PERCENT_DIVISOR = 100;

function getStatus(
  value: number,
  good: number,
  warning: number,
  operator: ">=" | "<="
): "good" | "warning" | "bad" {
  if (operator === ">=") {
    return value >= good ? "good" : value >= warning ? "warning" : "bad";
  } else {
    return value <= good ? "good" : value <= warning ? "warning" : "bad";
  }
}

function getDescription(
  status: "good" | "warning" | "bad",
  descriptions: [string, string, string]
): string {
  const [good, warning, bad] = descriptions;
  if (status === "good") return good;
  if (status === "warning") return warning;
  return bad;
}

function calculateLifetime(monthlyAmount: number, termYears: number): number {
  return monthlyAmount * MONTHS_IN_YEAR * termYears;
}

export function calculateMetrics(inputs: Inputs): CalculationResults | null {
  const price = parseFloat(inputs.purchasePrice) || 0;
  const down = parseFloat(inputs.downPayment) || 0;
  const rate = parseFloat(inputs.interestRate) || FORMULA_DEFAULTS.interestRate;
  const term = parseFloat(inputs.loanTerm) || FORMULA_DEFAULTS.loanTerm;
  const taxRate = parseFloat(inputs.propertyTax) || FORMULA_DEFAULTS.propertyTax;
  const insRate = parseFloat(inputs.homeInsurance) || FORMULA_DEFAULTS.homeInsurance;
  const hoa = parseFloat(inputs.hoaFees) || 0;
  const maintenanceAnnual = parseFloat(inputs.maintenanceAnnual) || FORMULA_DEFAULTS.maintenanceAnnual;
  const renovationsAnnual = parseFloat(inputs.renovationsAnnual) || FORMULA_DEFAULTS.renovationsAnnual;
  const utils = parseFloat(inputs.utilities) || FORMULA_DEFAULTS.utilities;
  const income = parseFloat(inputs.annualIncome) || 0;
  const debts = parseFloat(inputs.monthlyDebts) || 0;
  const emergency = parseFloat(inputs.emergencyFund) || 0;
  const desiredHousing = parseFloat(inputs.desiredMonthlyHousing) || 4000;
  const safetyMultiplier = (parseFloat(inputs.safetyMultiplier) || 0) / PERCENT_DIVISOR + 1;

  // Validation
  if (price === 0 || down === 0 || income === 0) {
    return null;
  }

  const loanAmount = price - down;
  const monthlyRate = rate / PERCENT_DIVISOR / MONTHS_IN_YEAR;
  const numPayments = term * MONTHS_IN_YEAR;

  // Monthly mortgage payment (principal + interest)
  const mortgagePayment =
    ((loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)) * safetyMultiplier;

  const monthlyTax = ((price * taxRate / PERCENT_DIVISOR) / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyInsurance = ((price * insRate / PERCENT_DIVISOR) / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyMaintenance = (maintenanceAnnual / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyRenovations = (renovationsAnnual / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyHoa = hoa * safetyMultiplier;
  const monthlyUtils = utils * safetyMultiplier;

  // Total monthly housing cost
  const totalMonthly =
    mortgagePayment +
    monthlyTax +
    monthlyInsurance +
    monthlyHoa +
    monthlyMaintenance +
    monthlyRenovations +
    monthlyUtils;

  const monthlyIncome = income / MONTHS_IN_YEAR;
  const downPaymentPercent = (down / price) * PERCENT_DIVISOR;

  // Calculate metrics
  const frontEndRatio = (totalMonthly / monthlyIncome) * PERCENT_DIVISOR;
  const backEndRatio = ((totalMonthly + debts) / monthlyIncome) * PERCENT_DIVISOR;
  const priceToIncome = price / income;

  // Build checklist
  const checklist: ChecklistItem[] = [];

  // Down Payment
  const downPaymentStatus = getStatus(
    downPaymentPercent,
    THRESHOLDS.DOWN_PAYMENT.GOOD,
    THRESHOLDS.DOWN_PAYMENT.WARNING,
    ">="
  );
  checklist.push({
    label: "Down Payment",
    value: `${downPaymentPercent.toFixed(1)}% ($${down.toLocaleString()})`,
    description: getDescription(downPaymentStatus, [
      `Excellent! ${THRESHOLDS.DOWN_PAYMENT.GOOD}%+ avoids PMI`,
      "Good, but PMI may apply",
      "Low down payment - expect PMI and higher costs",
    ]),
    status: downPaymentStatus,
  });

  // Housing budget assessment
  const desiredMonthlyWarningBuffer = desiredHousing + 250;
  const desiredMonthlyCriticalBuffer = desiredHousing + 500;
  const housingBudgetStatus = getStatus(
    totalMonthly,
    desiredMonthlyWarningBuffer,
    desiredMonthlyCriticalBuffer,
    "<="
  );
  checklist.push({
    label: "Monthly Housing Budget",
    value: `$${totalMonthly.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })} vs $${desiredHousing.toLocaleString()} goal`,
    description: getDescription(housingBudgetStatus, [
      "Total monthly costs are within your desired budget range",
      `Costs are slightly over budget (+$250-$500)`,
      `Costs exceed your desired budget by more than $500`,
    ]),
    status: housingBudgetStatus,
  });

  // Back-end ratio (all debts)
  const backEndStatus = getStatus(
    backEndRatio,
    THRESHOLDS.BACK_END_RATIO.GOOD,
    THRESHOLDS.BACK_END_RATIO.WARNING,
    "<="
  );
  checklist.push({
    label: "Back-End Ratio (DTI)",
    value: `${backEndRatio.toFixed(1)}%`,
    description: getDescription(backEndStatus, [
      "Total debt is manageable",
      "Total debt is on the higher side",
      "Total debt exceeds recommended levels",
    ]),
    status: backEndStatus,
  });

  // Price to income ratio
  const priceToIncomeStatus = getStatus(
    priceToIncome,
    THRESHOLDS.PRICE_TO_INCOME.GOOD,
    THRESHOLDS.PRICE_TO_INCOME.WARNING,
    "<="
  );
  checklist.push({
    label: "Price-to-Income Ratio",
    value: `${priceToIncome.toFixed(1)}x`,
    description: getDescription(priceToIncomeStatus, [
      "Home price is conservative relative to income",
      "Home price is reasonable but stretching",
      "Home price is very high relative to income",
    ]),
    status: priceToIncomeStatus,
  });

  // Front-end ratio (housing costs only)
  const frontEndStatus = getStatus(
    frontEndRatio,
    THRESHOLDS.FRONT_END_RATIO.GOOD,
    THRESHOLDS.FRONT_END_RATIO.WARNING,
    "<="
  );
  checklist.push({
    label: "Front-End Ratio",
    value: `${frontEndRatio.toFixed(1)}%`,
    description: getDescription(frontEndStatus, [
      "Housing costs are well within recommended percentage of income",
      "Housing costs are slightly high relative to income",
      "Housing costs exceed recommended percentage of income",
    ]),
    status: frontEndStatus,
  });

  // Emergency fund
  const emergencyStatus = getStatus(
    emergency,
    THRESHOLDS.EMERGENCY_FUND_MINIMUM,
    THRESHOLDS.EMERGENCY_FUND_MINIMUM / 2,
    ">="
  );
  checklist.push({
    label: "Emergency Fund",
    value: `$${emergency.toLocaleString()}`,
    description: getDescription(emergencyStatus, [
      `Excellent! You have met the recommended $${THRESHOLDS.EMERGENCY_FUND_MINIMUM.toLocaleString()} reserve`,
      `Getting there, but aim for at least $${THRESHOLDS.EMERGENCY_FUND_MINIMUM.toLocaleString()}`,
      `Your emergency fund is low. Target at least $${THRESHOLDS.EMERGENCY_FUND_MINIMUM.toLocaleString()} for safety`,
    ]),
    status: emergencyStatus,
  });

  const totalLifetimeCost = down + calculateLifetime(totalMonthly, term);

  return {
    checklist,
    summary: {
      totalMonthlyCost: totalMonthly,
      totalLifetimeCost,
      loanTerm: term,
      monthlyBreakdown: {
        mortgage: mortgagePayment,
        tax: monthlyTax,
        insurance: monthlyInsurance,
        hoa: monthlyHoa,
        maintenance: monthlyMaintenance,
        renovations: monthlyRenovations,
        utilities: monthlyUtils,
      },
      lifetimeBreakdown: {
        downPayment: down,
        mortgage: calculateLifetime(mortgagePayment, term),
        tax: calculateLifetime(monthlyTax, term),
        insurance: calculateLifetime(monthlyInsurance, term),
        hoa: calculateLifetime(monthlyHoa, term),
        maintenance: calculateLifetime(monthlyMaintenance, term),
        renovations: calculateLifetime(monthlyRenovations, term),
        utilities: calculateLifetime(monthlyUtils, term),
      },
    },
  };
}
