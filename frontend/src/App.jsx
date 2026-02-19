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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <UploadCard onResult={setResult} />
        </div>

        {result && (
          <>
            {/* Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                📊 Investigation Summary
              </h2>
              <SummaryCards summary={result.summary} />
            </div>

            {/* Download */}
            <div className="flex justify-end">
              <button
                onClick={downloadJSON}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 transition transform text-white px-6 py-2.5 rounded-xl shadow-md"
              >
                ⬇️ Download JSON Report
              </button>
            </div>

            {/* Graph */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <GraphCard data={result} />
            </div>

            {/* Fraud Rings */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
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
