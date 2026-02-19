export default function RingTable({ rings }) {
  if (!rings?.length) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Detected Fraud Rings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Ring ID</th>
              <th className="pb-2">Pattern</th>
              <th className="pb-2">Members</th>
              <th className="pb-2">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {rings.map((r) => (
              <tr key={r.ring_id} className="border-b last:border-0">
                <td className="py-2 font-medium">{r.ring_id}</td>
                <td className="py-2">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                    {r.pattern_type}
                  </span>
                </td>
                <td className="py-2">{r.member_accounts.join(", ")}</td>
                <td className="py-2 font-semibold">{r.risk_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
