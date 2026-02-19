export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const items = [
    { label: "Accounts Analyzed", value: summary.total_accounts_analyzed },
    { label: "Suspicious Accounts", value: summary.suspicious_accounts_flagged },
    { label: "Fraud Rings Detected", value: summary.fraud_rings_detected },
    { label: "Processing Time (s)", value: summary.processing_time_seconds },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-6
                     text-center transition-all duration-300 hover:scale-[1.03] hover:bg-white/10"
        >
          <p className="text-sm text-yellow-400 tracking-wide">
            {item.label}
          </p>

          <p className="text-3xl font-extrabold text-white mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
