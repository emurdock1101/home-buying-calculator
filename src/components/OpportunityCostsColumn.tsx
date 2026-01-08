import type {
  CalculationResults,
  Inputs,
  PeriodicCost,
  Summary,
} from "../types";

export const OpportunityCostsColumn = ({
  results,
  inputs,
}: {
  results: CalculationResults | null;
  inputs: Inputs;
}) => {
  const periodicCosts: PeriodicCost[] = results?.comparisons.periodic || [];
  const summary: Summary | undefined = results?.summary;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Opportunity Costs</h2>

      {summary && results && (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-green-900 font-bold text-lg mb-1">
              Total Spent & Equity
            </h3>
            <p className="text-[10px] text-green-800 mb-2 italic">
              Green highlight = Cheaper option.
            </p>
            <div className="space-y-3">
              {periodicCosts.map((p) => {
                const rentTotal =
                  (parseFloat(inputs.monthlyRent) || 2600) * 12 * p.years;
                return (
                  <div
                    key={p.years}
                    className="border-b border-green-100 pb-2 last:border-0 last:pb-0"
                  >
                    <p className="font-bold text-green-800 text-sm">
                      {p.years} Year Comparison
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div
                        className={`p-2 rounded ${
                          !p.isCheaperThanRent
                            ? "bg-green-200 border border-green-400"
                            : "bg-white border border-gray-100"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase text-gray-500">
                          Rent Total
                        </p>
                        <p className="text-sm font-semibold">
                          $
                          {rentTotal.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div
                        className={`p-2 rounded ${
                          p.isCheaperThanRent
                            ? "bg-green-200 border border-green-400"
                            : "bg-white border border-gray-100"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase text-gray-500">
                          Net Cost (Sunk)
                        </p>
                        <p className="text-sm font-semibold">
                          $
                          {p.netCost.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <div className="flex flex-col mt-1 space-y-0.5">
                          <p className="text-[10px] text-green-700 font-bold">
                            Equity: $
                            {p.principalOwned.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-[10px] text-green-600">
                            - Principal Paid: $
                            {p.principalPaidOff.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-[10px] text-green-600">
                            - Down Payment: $
                            {p.initialDownPayment.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-[10px] text-green-600">
                            - Appreciation: $
                            {p.appreciationAmount.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>

                          <div className="pt-1 mt-1 border-t border-gray-100">
                            <p className="text-[10px] text-gray-500 font-bold">
                              Total Spent: $
                              {p.totalSpent.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Down Payment: $
                              {p.initialDownPayment.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Buying Costs: $
                              {p.buyingCosts.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Selling Costs: $
                              {p.sellingCosts.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Mortgage (P&I): $
                              {p.totalMortgage.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Maint + Repairs: $
                              {p.totalMaintenance.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Utilities + HOA: $
                              {p.totalUtilsHoa.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              - Tax + Insurance: $
                              {p.totalTaxIns.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
