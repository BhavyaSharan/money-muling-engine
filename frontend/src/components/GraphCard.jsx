import GraphView from "./GraphView";

export default function GraphCard({ data }) {
  if (!data) return null;

  const suspiciousCount = data.summary?.suspicious_accounts_flagged || 0;
  const ringCount = data.summary?.fraud_rings_detected || 0;

  const hasFraud = suspiciousCount > 0;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg
                    p-5 sm:p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 tracking-wide">
            🌐 Transaction Network Visualization
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Interactive graph representation of account money flow
          </p>
        </div>

        {/* Risk Badge */}
        <div className={`px-4 py-2 rounded-xl text-sm font-medium shadow-lg
                        ${hasFraud
                          ? "bg-red-700/40 border border-red-600 text-red-300"
                          : "bg-green-700/40 border border-green-600 text-green-300"
                        }`}>
          {hasFraud ? "🚨 Suspicious Activity Detected" : "✅ No High-Risk Patterns"}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
          Suspicious Accounts: <span className="text-red-400 font-semibold">{suspiciousCount}</span>
        </div>
        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
          Fraud Rings: <span className="text-yellow-400 font-semibold">{ringCount}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Suspicious Account
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
          Normal Account
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          Ring Highlight
        </div>
      </div>

      {/* Interaction Tip */}
      <p className="text-xs text-white/50">
        Hover over nodes to view account details. Drag to reposition network. Zoom to inspect clusters.
      </p>

      {/* Graph Container */}
      <div
        className="rounded-xl overflow-hidden border border-white/5
                   h-[320px] sm:h-[420px] lg:h-[500px]"
      >
        <GraphView data={data} />
      </div>
    </div>
  );
}