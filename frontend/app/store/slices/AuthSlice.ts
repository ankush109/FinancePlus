import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthState, User } from "@/app/types/authTypes";

export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { state: RootState }
>("auth/fetchUserDetails", async (_, { getState, rejectWithValue }) => {
  const token = getState()?.auth.token;
  if (!token) throw new Error("No token found");

  try {
    const res = await fetch("http://localhost:5000/v1/user/user-details", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user details");

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    localStorage.removeItem("token");
    return rejectWithValue("unauthorized");
  }
});

const isBrowser = typeof window !== "undefined";

const initialState: AuthState = {
  user: null,
  error: null,
  token: isBrowser ? localStorage.getItem("token") : null,
  isAuthenticated: isBrowser ? !!localStorage.getItem("token") : false,
  loading: false, // Added loading state
};

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
      state.loading = false; // Reset loading state on logout
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset error state
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
