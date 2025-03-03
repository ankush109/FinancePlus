// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { AuthState, User } from "@/app/types/authTypes";

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk<User, void, { state: RootState }>(
  "auth/fetchUserDetails",
  async (_, { getState }) => {
    const token = getState()?.auth.token;
    if (!token) throw new Error("No token found");

    const res = await fetch("http://localhost:5000/v1/user/user-details", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user details");

    const data = await res.json();
    console.log(data,"data inm slice")
    return data.data;
  }
);

// Initial state
const isBrowser = typeof window !== "undefined";
const initialState: AuthState = {
  user: null,
  token: isBrowser ? localStorage.getItem("token") : null, // ✅ Only access localStorage in the browser
  isAuthenticated: isBrowser ? !!localStorage.getItem("token") : false,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
