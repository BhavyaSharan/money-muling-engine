export default function AccountExplanation({ accountId, data }) {
  if (!data) {
    return (
      <div>
        <h3 className="text-yellow-400 font-semibold mb-2">
          Account {accountId}
        </h3>
        <p className="text-white/60 text-sm">
          No suspicious activity detected for this account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-yellow-400 font-semibold text-lg">
        Account {accountId}
      </h3>

      <div className="text-sm text-white/80 space-y-1">
        <p>
          <span className="text-white/60">Suspicion Score:</span>{" "}
          <span className="font-semibold">{data.suspicion_score}</span>
        </p>

        <p>
          <span className="text-white/60">Confidence:</span>{" "}
          <span
            className={`font-semibold ${
              data.confidence_level === "High"
                ? "text-red-400"
                : data.confidence_level === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {data.confidence_level}
          </span>
        </p>

        <p>
          <span className="text-white/60">Detected Patterns:</span>
        </p>

        <ul className="list-disc ml-5 text-white/80">
          {data.detected_patterns?.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <p>
          <span className="text-white/60">Ring ID:</span>{" "}
          {data.ring_id || "—"}
        </p>
      </div>
    </div>
  );
}