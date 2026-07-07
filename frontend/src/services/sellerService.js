import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
});

export const createSellerProfile = async(formData) =>{
    const response = await api.post("/api/seller/create-profile/", formData);
    return response.data;
}

export const getSellerProfile = async () => {
  const response = await api.get("/api/seller/get-profile/");
  return {data: response.data};
}

export const updateSellerProfile = async(formData) => {
  const response = await api.patch('/api/seller/update-profile/', formData);
  return response.data
}