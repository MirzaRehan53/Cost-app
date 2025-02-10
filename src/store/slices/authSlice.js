// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  trialProductCount: 0,
  verificationStatus: "pending", // 'pending' | 'verified' | 'failed'
};

// Async thunks for authentication
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
});

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
});

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    incrementTrialCount: (state) => {
      state.trialProductCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // OTP verification cases
      .addCase(verifyOTP.pending, (state) => {
        state.verificationStatus = "pending";
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.verificationStatus = "verified";
      })

      .addCase(verifyOTP.rejected, (state) => {
        state.verificationStatus = "rejected";
      })

      //Sign up cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Will add Remaining when get apis.
  },
});

export const { logout, incrementTrialCount } = authSlice.actions;
export default authSlice.reducer;
