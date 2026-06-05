import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const registerUser = async (formData) => {
  const response = await api.post("/api/account/register/", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await api.post("/api/account/login/", formData);
  return { data: response.data, status: response.status };
};

export const getSellerProfile = async () => {
  const token = localStorage.getItem("access_token");
  const response = await api.get("/api/seller/get-profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data, status: response.status };
};

export const updateSellerProfile = async (formData) => {
  const token = localStorage.getItem("access_token");
  const response = await api.patch("/api/seller/update-profile/", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data, status: response.status };
};

export const deleteSeller = async () => {
  const token = localStorage.getItem("access_token");
  const response = await api.delete("/api/seller/delete-seller/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data, status: response.status };
};