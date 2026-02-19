import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadCard from "./components/UploadCard";
import SummaryCards from "./components/SummaryCards";
import GraphCard from "./components/GraphCard";
import RingTable from "./components/RingTable";

export default function App() {
  const [result, setResult] = useState(null);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fraud_analysis.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Upload Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-8">
          <UploadCard onResult={setResult} />
        </div>

        {result && (
          <>
            {/* Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-yellow-400 tracking-wide">
                📊 Investigation Summary
              </h2>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-6">
                <SummaryCards summary={result.summary} />
              </div>
            </div>

            {/* Download */}
            <div className="flex justify-end">
              <button
                onClick={downloadJSON}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700
                           text-white px-6 py-3 rounded-xl shadow-lg
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                ⬇️ Download JSON Report
              </button>
            </div>

            {/* Graph */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-8">
              <GraphCard data={result} />
            </div>

            {/* Fraud Rings */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-6 text-yellow-400 tracking-wide">
                🕵️ Detected Fraud Rings
              </h2>
              <RingTable rings={result.fraud_rings} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
