import { useState } from "react";

import { calculateMetrics } from "./formulas";
import { DEFAULT_VALUES } from "./data";
import { InputsColumn } from "./components/InputsColumn";
import { SummaryColumn } from "./components/SummaryColumn";

import type { CalculationResults } from "./types";
import { OpportunityCostsColumn } from "./components/OpportunityCostsColumn";

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_VALUES);

  const results: CalculationResults | null = calculateMetrics(inputs);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          <span
            style={{
              fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
              background:
                "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              paddingBottom: "0.1em",
              lineHeight: "1.2",
            }}
          >
            Home Buying Calculator
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <InputsColumn inputs={inputs} setInputs={setInputs} />
          <SummaryColumn results={results} />
          <OpportunityCostsColumn results={results} inputs={inputs} />
        </div>
      </div>
    </div>
  );
}
