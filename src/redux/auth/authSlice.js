import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";
import { REHYDRATE } from "redux-persist";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        name: action.payload.name || "",
        email: action.payload.email || "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        if (action.payload?.auth?.token) {
          state.token = action.payload.auth.token;
          state.user = action.payload.auth.user || { name: null, email: null };
          state.isLoggedIn = !!action.payload.auth.token;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        state.token = payload.token || payload.accessToken || null;
        state.user = {
          name: payload.user?.name || payload.name || "",
          email: payload.user?.email || payload.email || "",
        };
        state.isLoggedIn = !!state.token;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload;
        state.user = {
          name: payload.user?.name || payload.name || "",
          email: payload.user?.email || payload.email || "",
        };
        state.token = payload.token || payload.accessToken || null;
        state.isLoggedIn = !!state.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const payload = action.payload;
        // Keep existing user data or use payload
        if (payload?.user) {
          state.user = payload.user;
        }
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        // If token expired, clear auth state
        if (action.payload === "Token expired") {
          state.user = { name: null, email: null };
          state.token = null;
          state.isLoggedIn = false;
        }
        state.isRefreshing = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
