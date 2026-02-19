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
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        Upload Transaction Dataset
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        CSV format as specified in problem statement
      </p>

      <div className="flex gap-4 items-center">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {loading ? "Processing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}
