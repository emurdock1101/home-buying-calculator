import { THRESHOLDS } from "./data";
import type {
  Inputs,
  ChecklistItem,
  CalculationResults,
  PeriodicCost,
} from "./types";

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

function calculatePrincipalPaid(
  loanAmount: number,
  monthlyRate: number,
  monthlyPayment: number,
  months: number
): number {
  if (monthlyRate === 0) return Math.min(loanAmount, monthlyPayment * months);

  let balance = loanAmount;
  let totalPrincipalPaid = 0;

  // Use the actual number of months, capped at the loan term
  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const principal = Math.min(balance, monthlyPayment - interest);
    if (principal <= 0) break;
    balance -= principal;
    totalPrincipalPaid += principal;
  }
  return totalPrincipalPaid;
}

export function calculateMetrics(inputs: Inputs): CalculationResults | null {
  const price = parseFloat(inputs.purchasePrice);
  const down = parseFloat(inputs.downPayment);
  const rate = parseFloat(inputs.interestRate);
  const term = parseFloat(inputs.loanTerm);
  const taxRate = parseFloat(inputs.propertyTax);
  const insRate = parseFloat(inputs.homeInsurance);
  const hoa = parseFloat(inputs.hoaFees);
  const maintenanceAnnual = parseFloat(inputs.maintenanceAnnual);
  const renovationsTotal = parseFloat(inputs.renovations);
  const forcedAppreciation = parseFloat(inputs.forcedAppreciation);
  const utils = parseFloat(inputs.utilities);
  const income = parseFloat(inputs.annualIncome);
  const debts = parseFloat(inputs.monthlyDebts);
  const buyingClosingCosts = parseFloat(inputs.buyingClosingCosts);
  const prepaidEscrow = parseFloat(inputs.prepaidEscrow);
  const sellingClosingCostsRate =
    parseFloat(inputs.sellingClosingCosts) / PERCENT_DIVISOR;
  const desiredHousing = parseFloat(inputs.desiredMonthlyHousing);
  const safetyMultiplier =
    parseFloat(inputs.safetyMultiplier) / PERCENT_DIVISOR + 1;
  const monthlyRent = parseFloat(inputs.monthlyRent);
  const homeAppreciation = parseFloat(inputs.homeAppreciation) / PERCENT_DIVISOR;

  // Validation
  if (price === 0 || down === 0 || income === 0) {
    return null;
  }

  const loanAmount = price - down;
  const monthlyRate = rate / PERCENT_DIVISOR / MONTHS_IN_YEAR;
  const numPayments = term * MONTHS_IN_YEAR;

  // Raw monthly mortgage payment (principal + interest) for principal calculation
  const rawMortgagePayment =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;

  // Monthly mortgage payment with safety multiplier
  const mortgagePayment = rawMortgagePayment * safetyMultiplier;

  const monthlyTax =
    ((price * taxRate) / PERCENT_DIVISOR / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyInsurance = insRate * safetyMultiplier;
  const monthlyMaintenance =
    (maintenanceAnnual / MONTHS_IN_YEAR) * safetyMultiplier;
  const monthlyRenovations =
    (renovationsTotal / (term * MONTHS_IN_YEAR)) * safetyMultiplier;
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
  const backEndRatio =
    ((totalMonthly + debts) / monthlyIncome) * PERCENT_DIVISOR;
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

  const finalHomeValue =
    price * Math.pow(1 + homeAppreciation, term) + forcedAppreciation;
  const totalLifetimeCost =
    down +
    buyingClosingCosts +
    calculateLifetime(totalMonthly, term) +
    finalHomeValue * sellingClosingCostsRate;

  const intervals = [2, 3, 4, 5, 7, 10, 12, 15];

  const periodic: PeriodicCost[] = intervals.map((years) => {
    const months = years * MONTHS_IN_YEAR;
    const appreciationAmount = price * (Math.pow(1 + homeAppreciation, years) - 1);

    const principalPaidOff = calculatePrincipalPaid(
      loanAmount,
      monthlyRate,
      rawMortgagePayment,
      Math.min(months, numPayments)
    );
    const principalOwned =
      down +
      principalPaidOff +
      appreciationAmount +
      forcedAppreciation +
      prepaidEscrow;

    const totalMortgage = mortgagePayment * months;
    const totalMaintenance = (monthlyMaintenance + monthlyRenovations) * months;
    const totalUtilsHoa = (monthlyUtils + monthlyHoa) * months;
    const totalTaxIns = (monthlyTax + monthlyInsurance) * months;

    const currentPrice = price + appreciationAmount + forcedAppreciation;
    const sellingCosts = currentPrice * sellingClosingCostsRate;

    const totalSpent =
      down +
      buyingClosingCosts +
      prepaidEscrow +
      totalMonthly * months +
      sellingCosts;
    const netCost = totalSpent - principalOwned;

    // Rent unrecoverable: rentTotal
    const rentTotal = monthlyRent * MONTHS_IN_YEAR * years;

    return {
      years,
      totalSpent,
      principalOwned,
      principalPaidOff,
      initialDownPayment: down,
      appreciationAmount,
      forcedAppreciationAmount: forcedAppreciation,
      buyingCosts: buyingClosingCosts,
      prepaidEscrow,
      sellingCosts,
      netCost,
      isCheaperThanRent: netCost < rentTotal,
      totalMortgage,
      totalMaintenance,
      totalUtilsHoa,
      totalTaxIns,
    };
  });

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
        buyingClosingCosts,
        sellingClosingCosts: finalHomeValue * sellingClosingCostsRate,
        mortgage: calculateLifetime(mortgagePayment, term),
        tax: calculateLifetime(monthlyTax, term),
        insurance: calculateLifetime(monthlyInsurance, term),
        hoa: calculateLifetime(monthlyHoa, term),
        maintenance: calculateLifetime(monthlyMaintenance, term),
        renovations: calculateLifetime(monthlyRenovations, term),
        utilities: calculateLifetime(monthlyUtils, term),
      },
    },
    comparisons: {
      periodic,
    },
  };
}
