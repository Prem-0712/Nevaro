import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: localStorage.getItem("user_role") || null,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  isAuthenticated: !!localStorage.getItem("access_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, userRole } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userRole = userRole;
      state.isAuthenticated = true;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_role", userRole);
    },
    logout: (state) => {
      state.userRole = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_role");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;