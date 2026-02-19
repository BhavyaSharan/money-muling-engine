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
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-5 sm:p-8">
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-1">
        Upload Transaction Dataset
      </h2>

      <p className="text-xs sm:text-sm text-white/60 mb-5">
        CSV format as specified in the problem statement
      </p>

      {/* Upload area */}
      <label
        className="flex flex-col items-center justify-center w-full
                   rounded-xl border border-dashed border-white/20
                   bg-black/40 hover:bg-black/60 transition
                   px-4 py-6 text-center cursor-pointer"
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />

        <p className="text-sm text-white/70 break-all">
          {file ? (
            <>
              📄 <span className="font-medium text-white">{file.name}</span>
            </>
          ) : (
            "Tap to select a CSV file"
          )}
        </p>
      </label>

      {/* Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-5 w-full
                   bg-gradient-to-r from-red-600 to-red-800
                   hover:from-red-500 hover:to-red-700
                   text-white py-3 rounded-xl font-medium
                   shadow-lg transition-all
                   active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Analyze"}
      </button>
    </div>
  );
}
