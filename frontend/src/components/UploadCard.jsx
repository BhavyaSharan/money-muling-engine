import { useState } from "react";
import { uploadCSV } from "../api";

export default function UploadCard({ onResult, onError, setLoading }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      onError?.("Please select a CSV file before analyzing.");
      return;
    }

    try {
      setLoading?.(true);
      const data = await uploadCSV(file);
      onResult?.(data);
    } catch (err) {
      onError?.(
        err.response?.data?.detail || "Upload failed. Please try again."
      );
    } finally {
      setLoading?.(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
    } else {
      onError?.("Only CSV files are allowed.");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg p-6 sm:p-8">

      <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">
        📂 Upload Transaction Dataset
      </h2>

      <p className="text-xs sm:text-sm text-white/60 mb-6">
        Upload a CSV file with the required transaction schema.
      </p>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center
          rounded-xl border-2 border-dashed
          transition-all duration-300
          px-6 py-10 text-center cursor-pointer
          ${
            dragging
              ? "border-red-500 bg-red-500/10"
              : "border-white/20 bg-black/40 hover:bg-black/60"
          }
        `}
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />

        <label htmlFor="fileInput" className="cursor-pointer">
          {file ? (
            <div className="text-sm text-white break-all">
              📄 <span className="font-semibold">{file.name}</span>
            </div>
          ) : (
            <div className="text-sm text-white/70">
              Drag & drop a CSV file here<br />
              <span className="text-white/50 text-xs">
                or click to browse
              </span>
            </div>
          )}
        </label>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleUpload}
        className="
          mt-6 w-full
          bg-gradient-to-r from-red-600 to-red-800
          hover:from-red-500 hover:to-red-700
          text-white py-3 rounded-xl font-semibold
          shadow-lg transition-all duration-300
          active:scale-95
        "
      >
        🔎 Analyze Network
      </button>
    </div>
  );
}