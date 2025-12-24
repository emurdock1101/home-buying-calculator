import { useState } from "react";

import { calculateMetrics } from "./formulas";
import { PROPERTY_INPUTS, FINANCE_INPUTS,DEFAULT_VALUES } from "./data";
export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_VALUES);

  const handleChange = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Home Buying Calculator
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>

            <div className="space-y-4">
              {PROPERTY_INPUTS.map((input) => (
                <div key={input.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    step={input.step}
                    value={inputs[input.name as keyof typeof inputs]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Your Finances</h2>

            <div className="space-y-4">
              {FINANCE_INPUTS.map((input) => (
                <div key={input.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    value={inputs[input.name as keyof typeof inputs]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={input.placeholder}
                  />
                </div>
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
                  <div className="text-sm text-blue-800 space-y-1">
                    <p className="flex justify-between">
                      <span>Mortgage (P&I):</span>
                      <span className="font-semibold">${summary.monthlyBreakdown.mortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Taxes & Insurance:</span>
                      <span className="font-semibold">${(summary.monthlyBreakdown.tax + summary.monthlyBreakdown.insurance).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>HOA Fees:</span>
                      <span className="font-semibold">${summary.monthlyBreakdown.hoa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="font-semibold">${summary.monthlyBreakdown.maintenance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Renovations:</span>
                      <span className="font-semibold">${summary.monthlyBreakdown.renovations.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Utilities:</span>
                      <span className="font-semibold">${summary.monthlyBreakdown.utilities.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
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
                  <div className="text-sm text-purple-800 space-y-1">
                    <p className="flex justify-between">
                      <span>Down Payment:</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Mortgage (P&I):</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.mortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Taxes & Insurance:</span>
                      <span className="font-semibold">${(summary.lifetimeBreakdown.tax + summary.lifetimeBreakdown.insurance).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total HOA Fees:</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.hoa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Maintenance:</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.maintenance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Renovations:</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.renovations.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Utilities:</span>
                      <span className="font-semibold">${summary.lifetimeBreakdown.utilities.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
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
