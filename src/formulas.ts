import { THRESHOLDS, FORMULA_DEFAULTS } from "./data";

export interface Inputs {
  purchasePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTax: string;
  homeInsurance: string;
  hoaFees: string;
  maintenance: string;
  utilities: string;
  annualIncome: string;
  emergencyFund: string;
}

export interface ChecklistItem {
  label: string;
  value: string;
  description: string;
  status: "good" | "warning" | "bad";
}

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

export function calculateMetrics(inputs: Inputs): ChecklistItem[] {
  const price = parseFloat(inputs.purchasePrice) || 0;
  const down = parseFloat(inputs.downPayment) || 0;
  const rate = parseFloat(inputs.interestRate) || FORMULA_DEFAULTS.interestRate;
  const term = parseFloat(inputs.loanTerm) || FORMULA_DEFAULTS.loanTerm;
  const taxRate = parseFloat(inputs.propertyTax) || FORMULA_DEFAULTS.propertyTax;
  const insRate = parseFloat(inputs.homeInsurance) || FORMULA_DEFAULTS.homeInsurance;
  const hoa = parseFloat(inputs.hoaFees) || 0;
  const maintRate = parseFloat(inputs.maintenance) || FORMULA_DEFAULTS.maintenance;
  const utils = parseFloat(inputs.utilities) || FORMULA_DEFAULTS.utilities;
  const income = parseFloat(inputs.annualIncome) || 0;
  const emergency = parseFloat(inputs.emergencyFund) || 0;

  // Validation
  if (price === 0 || down === 0 || income === 0) {
    return [];
  }

  const loanAmount = price - down;
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  // Monthly mortgage payment (principal + interest)
  const mortgagePayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Other monthly costs
  const monthlyTax = (price * taxRate / 100) / 12;
  const monthlyInsurance = (price * insRate / 100) / 12;
  const monthlyMaintenance = (price * maintRate / 100) / 12;

  // Total monthly housing cost
  const totalMonthly =
    mortgagePayment +
    monthlyTax +
    monthlyInsurance +
    hoa +
    monthlyMaintenance +
    utils;

  const monthlyIncome = income / 12;
  const downPaymentPercent = (down / price) * 100;

  // Calculate metrics
  const frontEndRatio = (totalMonthly / monthlyIncome) * 100;
  const backEndRatio = (totalMonthly / monthlyIncome) * 100;
  const priceToIncome = price / income;
  const recommendedEmergency = totalMonthly * THRESHOLDS.EMERGENCY_FUND_MONTHS;

  // Build checklist
  const checklist: ChecklistItem[] = [];

  // Down Payment
  checklist.push({
    label: "Down Payment",
    value: `${downPaymentPercent.toFixed(1)}% ($${down.toLocaleString()})`,
    description:
      downPaymentPercent >= THRESHOLDS.DOWN_PAYMENT.GOOD
        ? `Excellent! ${THRESHOLDS.DOWN_PAYMENT.GOOD}%+ avoids PMI`
        : downPaymentPercent >= THRESHOLDS.DOWN_PAYMENT.WARNING
        ? "Good, but PMI may apply"
        : "Low down payment - expect PMI and higher costs",
    status: getStatus(
      downPaymentPercent,
      THRESHOLDS.DOWN_PAYMENT.GOOD,
      THRESHOLDS.DOWN_PAYMENT.WARNING,
      ">="
    ),
  });

  // Front-end ratio (housing costs only)
  checklist.push({
    label: "Front-End Ratio",
    value: `${frontEndRatio.toFixed(1)}%`,
    description:
      frontEndRatio <= THRESHOLDS.FRONT_END_RATIO.GOOD
        ? "Housing costs are well within recommended limits"
        : frontEndRatio <= THRESHOLDS.FRONT_END_RATIO.WARNING
        ? "Housing costs are slightly high but manageable"
        : "Housing costs are too high relative to income",
    status: getStatus(
      frontEndRatio,
      THRESHOLDS.FRONT_END_RATIO.GOOD,
      THRESHOLDS.FRONT_END_RATIO.WARNING,
      "<="
    ),
  });

  // Back-end ratio (all debts)
  checklist.push({
    label: "Back-End Ratio (DTI)",
    value: `${backEndRatio.toFixed(1)}%`,
    description:
      backEndRatio <= THRESHOLDS.BACK_END_RATIO.GOOD
        ? "Total debt is manageable"
        : backEndRatio <= THRESHOLDS.BACK_END_RATIO.WARNING
        ? "Total debt is on the higher side"
        : "Total debt exceeds recommended levels",
    status: getStatus(
      backEndRatio,
      THRESHOLDS.BACK_END_RATIO.GOOD,
      THRESHOLDS.BACK_END_RATIO.WARNING,
      "<="
    ),
  });

  // Price to income ratio
  checklist.push({
    label: "Price-to-Income Ratio",
    value: `${priceToIncome.toFixed(1)}x`,
    description:
      priceToIncome <= THRESHOLDS.PRICE_TO_INCOME.GOOD
        ? "Home price is conservative relative to income"
        : priceToIncome <= THRESHOLDS.PRICE_TO_INCOME.WARNING
        ? "Home price is reasonable but stretching"
        : "Home price is very high relative to income",
    status: getStatus(
      priceToIncome,
      THRESHOLDS.PRICE_TO_INCOME.GOOD,
      THRESHOLDS.PRICE_TO_INCOME.WARNING,
      "<="
    ),
  });

  // Monthly payment
  checklist.push({
    label: "Total Monthly Payment",
    value: `$${totalMonthly.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`,
    description: `Includes mortgage ($${mortgagePayment.toFixed(
      0
    )}), taxes, insurance, HOA, maintenance, utilities`,
    status: getStatus(
      frontEndRatio,
      THRESHOLDS.FRONT_END_RATIO.GOOD,
      THRESHOLDS.FRONT_END_RATIO.WARNING,
      "<="
    ),
  });

  // Emergency fund
  checklist.push({
    label: "Emergency Fund",
    value: `$${emergency.toLocaleString()}`,
    description:
      emergency >= recommendedEmergency
        ? `Great! You have ${THRESHOLDS.EMERGENCY_FUND_MONTHS}+ months of housing costs covered`
        : emergency >=
          recommendedEmergency / THRESHOLDS.EMERGENCY_FUND_WARNING_THRESHOLD
        ? `You have ~${(emergency / totalMonthly).toFixed(
            1
          )} months covered. Aim for ${
            THRESHOLDS.EMERGENCY_FUND_MONTHS
          } months ($${recommendedEmergency.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })})`
        : `Build emergency fund to at least $${recommendedEmergency.toLocaleString(
            undefined,
            { maximumFractionDigits: 0 }
          )} (${THRESHOLDS.EMERGENCY_FUND_MONTHS} months)`,
    status: getStatus(
      emergency,
      recommendedEmergency,
      recommendedEmergency / THRESHOLDS.EMERGENCY_FUND_WARNING_THRESHOLD,
      ">="
    ),
  });

  return checklist;
}