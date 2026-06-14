import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: localStorage.getItem("user_role") || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { accessToken, refreshToken, userRole } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userRole = userRole;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user_role", userRole);
    },
    unsetToken: (state) => {
      state.userRole = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_role");
    },
  },
});

export const { setToken, unsetToken } = authSlice.actions;
export default authSlice.reducer;