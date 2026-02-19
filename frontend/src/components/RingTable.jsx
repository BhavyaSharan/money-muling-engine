export default function RingTable({ rings }) {
  if (!rings?.length) return null;

  return (
    <div
      className="
        mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg
        p-5 sm:p-6 lg:p-8
      "
    >
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4 sm:mb-6 tracking-wide">
        Detected Fraud Rings
      </h2>

      {/* Scroll wrapper */}
      <div className="overflow-x-auto -mx-5 sm:-mx-6 lg:mx-0">
        <div className="min-w-[700px] px-5 sm:px-6 lg:px-0">
          <table className="w-full text-xs sm:text-sm text-white/80">
            <thead>
              <tr className="text-left text-white/50 border-b border-white/10">
                <th className="pb-3 font-medium">Ring ID</th>
                <th className="pb-3 font-medium">Pattern</th>
                <th className="pb-3 font-medium">Members</th>
                <th className="pb-3 font-medium">Risk Score</th>
              </tr>
            </thead>

            <tbody>
              {rings.map((r) => (
                <tr
                  key={r.ring_id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition"
                >
                  <td className="py-3 font-semibold text-white whitespace-nowrap">
                    {r.ring_id}
                  </td>

                  <td className="py-3 whitespace-nowrap">
                    <span className="inline-block bg-red-500/15 text-red-400 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-red-500/30">
                      {r.pattern_type}
                    </span>
                  </td>

                  <td className="py-3 text-white/70">
                    {r.member_accounts.join(", ")}
                  </td>

                  <td className="py-3 font-bold text-red-400 whitespace-nowrap">
                    {r.risk_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
