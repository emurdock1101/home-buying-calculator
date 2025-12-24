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
  monthlyDebts: string;
  emergencyFund: string;
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
