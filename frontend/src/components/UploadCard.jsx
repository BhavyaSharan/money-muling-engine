import { useState } from "react";
import { uploadCSV } from "../api";

export default function UploadCard({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file");

    setLoading(true);
    try {
      const data = await uploadCSV(file);
      onResult(data);
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-yellow-400 mb-2 tracking-wide">
        Upload Transaction Dataset
      </h2>

      <p className="text-sm text-white/60 mb-6">
        CSV format as specified in the problem statement
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <label className="w-full cursor-pointer rounded-xl border border-dashed border-white/20
                          bg-black/40 hover:bg-black/60 transition p-4 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <p className="text-sm text-white/70">
            {file ? (
              <>
                📄 <span className="font-medium text-white">{file.name}</span>
              </>
            ) : (
              "Click to select a CSV file"
            )}
          </p>
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-800
                     hover:from-red-500 hover:to-red-700
                     text-white px-8 py-3 rounded-xl shadow-lg
                     transition-all duration-300 hover:scale-105 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}
