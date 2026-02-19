export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const items = [
    { label: "Accounts Analyzed", value: summary.total_accounts_analyzed },
    { label: "Suspicious Accounts", value: summary.suspicious_accounts_flagged },
    { label: "Fraud Rings Detected", value: summary.fraud_rings_detected },
    { label: "Processing Time (s)", value: summary.processing_time_seconds },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-5 text-center"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
