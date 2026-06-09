import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshAccessToken();
        const newAccessToken = data.access;

        localStorage.setItem("access_token", newAccessToken);

        const { store } = await import("../store/store");
        store.dispatch({
          type: "auth/setCredentials",
          payload: {
            accessToken: newAccessToken,
            refreshToken: localStorage.getItem("refresh_token"),
            userRole: localStorage.getItem("user_role"),
          },
        });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_role");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const response = await api.post("/api/account/refresh-tokens/", {
    refresh: refreshToken,
  });
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await api.post("/api/account/register/", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/account/login/`, formData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
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