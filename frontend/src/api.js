import axios from "axios";

// 🔥 Auto-switch between local and production
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_BASE}/upload-csv`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};