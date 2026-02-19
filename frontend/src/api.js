import axios from "axios";

// 🔁 Change this if backend is hosted later
const API_URL = "http://127.0.0.1:8000/upload-csv";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
