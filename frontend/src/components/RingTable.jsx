export default function RingTable({ rings }) {
  if (!rings?.length) return null;

  const getRiskColor = (score) => {
    if (score >= 60) return "text-red-500";
    if (score >= 30) return "text-yellow-400";
    return "text-green-400";
  };

  const formatPattern = (pattern) => {
    if (pattern === "cycle") return "Cycle Routing";
    if (pattern === "fan_in") return "Smurfing (Fan-In)";
    if (pattern === "fan_out") return "Smurfing (Fan-Out)";
    if (pattern === "layered_shell") return "Layered Shell";
    return pattern;
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-5 sm:p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-6 tracking-wide">
        🕵️ Fraud Ring Summary
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-white/80 min-w-[850px]">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10">
              <th className="pb-3 font-medium">Ring ID</th>
              <th className="pb-3 font-medium">Pattern Type</th>
              <th className="pb-3 font-medium">Member Count</th>
              <th className="pb-3 font-medium">Risk Score</th>
              <th className="pb-3 font-medium">Member Accounts</th>
            </tr>
          </thead>

          <tbody>
            {rings.map((r) => (
              <tr
                key={r.ring_id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5 transition"
              >
                {/* Ring ID */}
                <td className="py-3 font-semibold text-white whitespace-nowrap">
                  {r.ring_id}
                </td>

                {/* Pattern */}
                <td className="py-3 whitespace-nowrap">
                  <span className="inline-block bg-red-500/15 text-red-400 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-red-500/30">
                    {formatPattern(r.pattern_type)}
                  </span>
                </td>

                {/* Member Count */}
                <td className="py-3 text-white/80 font-medium">
                  {r.member_accounts.length}
                </td>

                {/* Risk Score */}
                <td className={`py-3 font-bold whitespace-nowrap ${getRiskColor(r.risk_score)}`}>
                  {r.risk_score}
                </td>

                {/* Members */}
                <td className="py-3 text-white/60 max-w-[400px]">
                  <div className="truncate">
                    {r.member_accounts.join(", ")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}