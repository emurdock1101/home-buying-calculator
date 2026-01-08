import type { Dispatch, SetStateAction } from "react";
import { PROPERTY_INPUTS, FINANCE_INPUTS, OTHER_INPUTS } from "../data";
import type { Inputs, InputConfig } from "../types";

interface InputFieldProps {
  config: InputConfig;
  value: string;
  onChange: (field: string, value: string) => void;
  formatCurrency: (value: string) => string;
}

function InputField({
  config,
  value,
  onChange,
  formatCurrency,
}: InputFieldProps) {
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

export const InputsColumn = ({
  inputs,
  setInputs,
}: {
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
}) => {
  const handleChange = (field: string, value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    setInputs((prev: Inputs) => {
      const newInputs = { ...prev, [field]: numericValue };

      return newInputs;
    });
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

  return (
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

      <h2 className="text-xl font-semibold mt-6 mb-4">Other Considerations</h2>

      <div className="space-y-4">
        {OTHER_INPUTS.map((input) => (
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
  );
};
