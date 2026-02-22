export default function HomePage() {
  return (
    <div className="space-y-12 animate-fadeIn">

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          Financial Fraud Detection Engine
        </h1>

        <p className="text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed">
          An intelligent system designed to uncover <span className="text-yellow-400 font-semibold">money mule networks</span>
          hidden within large-scale transaction data using advanced graph-based analysis.
        </p>
      </section>

      {/* Core Problem */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            🚨 The Problem
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Financial institutions lose billions due to money muling operations where illicit funds
            are moved through multiple accounts to evade detection. Traditional rule-based systems
            fail to capture complex transactional relationships.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            💡 Our Solution
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            We model transactions as networks and apply structural pattern analysis to automatically
            detect organized fraud behaviors that are otherwise invisible in flat transaction logs.
          </p>
        </div>
      </section>

      {/* Detection Techniques */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center text-yellow-400">
          🧠 Fraud Patterns Detected
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Cycle */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-red-400">
              🔁 Cycle Detection
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Identifies circular money flows where funds return to the original sender,
              indicating attempts to legitimize illicit money.
            </p>
          </div>

          {/* Smurfing */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-red-400">
              🧩 Smurfing
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Detects the division of large illicit sums into smaller transactions across
              multiple accounts to avoid regulatory thresholds.
            </p>
          </div>

          {/* Layered Shell */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3 text-red-400">
              🕸️ Layered Shell Networks
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Exposes complex multi-hop account structures designed to obscure the true
              origin and destination of funds.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-6">
        <p className="text-zinc-400 mb-4">
          Ready to analyze transaction data and uncover hidden fraud?
        </p>
        <span className="inline-block bg-gradient-to-r from-yellow-500 to-red-600 text-black font-semibold px-8 py-3 rounded-xl shadow-lg">
          👉 Switch to <span className="font-extrabold">Summarise</span> to Begin Detection
        </span>
      </section>

    </div>
  );
}