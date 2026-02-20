export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const {
    total_accounts_analyzed,
    suspicious_accounts_flagged,
    fraud_rings_detected,
    processing_time_seconds,
  } = summary;

  const hasFraud =
    suspicious_accounts_flagged > 0 || fraud_rings_detected > 0;

  const cards = [
    {
      label: "Accounts Analyzed",
      value: total_accounts_analyzed,
      accent: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      icon: "👥",
    },
    {
      label: "Suspicious Accounts",
      value: suspicious_accounts_flagged,
      accent:
        suspicious_accounts_flagged > 0
          ? "text-red-400"
          : "text-green-400",
      bg:
        suspicious_accounts_flagged > 0
          ? "bg-red-500/10 border-red-500/20"
          : "bg-green-500/10 border-green-500/20",
      icon: "⚠️",
    },
    {
      label: "Fraud Rings Detected",
      value: fraud_rings_detected,
      accent:
        fraud_rings_detected > 0
          ? "text-yellow-400"
          : "text-green-400",
      bg:
        fraud_rings_detected > 0
          ? "bg-yellow-500/10 border-yellow-500/20"
          : "bg-green-500/10 border-green-500/20",
      icon: "🕵️",
    },
    {
      label: "Processing Time (s)",
      value: processing_time_seconds,
      accent: "text-white",
      bg: "bg-white/5 border-white/10",
      icon: "⏱️",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Optional Global Alert Glow */}
      {hasFraud && (
        <div className="text-sm text-red-400 bg-red-900/30 border border-red-600/40 p-3 rounded-xl shadow-md">
          🚨 Suspicious financial activity detected in uploaded dataset.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`
              rounded-2xl border ${card.bg}
              backdrop-blur-xl shadow-lg
              p-5 text-center
              transition-all duration-300
              sm:hover:scale-[1.04]
            `}
          >
            <div className="text-xl mb-2">{card.icon}</div>

            <p className="text-xs sm:text-sm text-white/70 tracking-wide">
              {card.label}
            </p>

            <p
              className={`text-2xl sm:text-3xl font-extrabold mt-2 ${card.accent}`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}