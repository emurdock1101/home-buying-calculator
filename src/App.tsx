import { useState } from "react";

import { calculateMetrics } from "./formulas";
import { PROPERTY_INPUTS, FINANCE_INPUTS, DEFAULT_VALUES } from "./data";
import type { InputConfig } from "./types";

interface InputFieldProps {
  config: InputConfig;
  value: string;
  onChange: (field: string, value: string) => void;
  formatCurrency: (value: string) => string;
}

function InputField({ config, value, onChange, formatCurrency }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {config.label}
      </label>
      {config.sublabel && (
        <p className="text-xs text-gray-500 mb-1">{config.sublabel}</p>
      )}
      <input
        type={config.isCurrency ? "text" : "number"}
        step={config.step}
        value={config.isCurrency ? formatCurrency(value) : value}
        onChange={(e) => onChange(config.name, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder={config.placeholder}
      />
    </div>
  );
}

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_VALUES);

  const handleChange = (field: string, value: string) => {
    // If it's a currency field, we might receive the formatted string
    // We want to store just the numeric value in the state
    const numericValue = value.replace(/[^0-9.]/g, "");
    setInputs((prev) => ({ ...prev, [field]: numericValue }));
  };

  const formatCurrencyInput = (value: string) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const results = calculateMetrics(inputs);
  const checklist = results?.checklist || [];
  const summary = results?.summary;

  const getStatusColor = (status: "good" | "warning" | "bad") => {
    switch (status) {
      case "good":
        return "bg-green-100 border-green-500";
      case "warning":
        return "bg-yellow-100 border-yellow-500";
      case "bad":
        return "bg-red-100 border-red-500";
    }
  };

  const getStatusIcon = (status: "good" | "warning" | "bad") => {
    switch (status) {
      case "good":
        return "✓";
      case "warning":
        return "⚠";
      case "bad":
        return "✗";
    }
  };

  const renderBreakdownList = (items: { label: string; value: number }[]) => (
    <div className="space-y-1">
      {items.map((item, idx) => (
        <p key={idx} className="flex justify-between">
          <span>{item.label}:</span>
          <span className="font-semibold">
            ${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </p>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          <span
            style={{
              fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
              background: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              paddingBottom: "0.2em",
              lineHeight: "1.2"
            }}
          >
            Home Buying Calculator
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>

            <div className="space-y-4">
              {PROPERTY_INPUTS.map((input) => (
                <InputField
                  key={input.name}
                  config={input}
                  value={inputs[input.name as keyof typeof inputs]}
                  onChange={handleChange}
                  formatCurrency={formatCurrencyInput}
                />
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Your Finances</h2>

            <div className="space-y-4">
              {FINANCE_INPUTS.map((input) => (
                <InputField
                  key={input.name}
                  config={input}
                  value={inputs[input.name as keyof typeof inputs]}
                  onChange={handleChange}
                  formatCurrency={formatCurrencyInput}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Financial Summary
            </h2>

            {summary ? (
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-900 font-bold text-lg mb-1">Total Monthly Cost</h3>
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    ${summary.totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-blue-800">
                    {renderBreakdownList([
                      { label: "Mortgage (P&I)", value: summary.monthlyBreakdown.mortgage },
                      { label: "Taxes & Insurance", value: summary.monthlyBreakdown.tax + summary.monthlyBreakdown.insurance },
                      { label: "HOA Fees", value: summary.monthlyBreakdown.hoa },
                      { label: "Maintenance", value: summary.monthlyBreakdown.maintenance },
                      { label: "Renovations", value: summary.monthlyBreakdown.renovations },
                      { label: "Utilities", value: summary.monthlyBreakdown.utilities },
                    ])}
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="text-purple-900 font-bold text-lg mb-1">Total Lifetime Cost</h3>
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    ${summary.totalLifetimeCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-xs text-purple-800 mb-3 italic">
                    Estimated total spent over {summary.loanTerm} years
                  </p>
                  <div className="text-sm text-purple-800">
                    {renderBreakdownList([
                      { label: "Down Payment", value: summary.lifetimeBreakdown.downPayment },
                      { label: "Total Mortgage (P&I)", value: summary.lifetimeBreakdown.mortgage },
                      { label: "Total Taxes & Insurance", value: summary.lifetimeBreakdown.tax + summary.lifetimeBreakdown.insurance },
                      { label: "Total HOA Fees", value: summary.lifetimeBreakdown.hoa },
                      { label: "Total Maintenance", value: summary.lifetimeBreakdown.maintenance },
                      { label: "Total Renovations", value: summary.lifetimeBreakdown.renovations },
                      { label: "Total Utilities", value: summary.lifetimeBreakdown.utilities },
                    ])}
                  </div>
                </div>
              </div>
            ) : null}

            <h2 className="text-xl font-semibold mb-4">
              Affordability Checklist
            </h2>

            <div className="space-y-3">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 p-4 rounded ${getStatusColor(
                    item.status
                  )}`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {getStatusIcon(item.status)}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">{item.value}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {checklist.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                Enter required fields to see your affordability assessment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
