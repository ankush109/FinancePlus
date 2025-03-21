import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthState, User } from "@/app/types/authTypes";
import { getUserDetails } from "@/app/hooks/query/useGetUserDetailsQuery";

export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { state: RootState }
>("auth/fetchUserDetails", async (_, { getState, rejectWithValue }) => {
  const token = getState()?.auth.token;
  console.log(token,"token")
  if (!token)  return rejectWithValue("unauthorized");

  try {
    const data = await getUserDetails();
    console.log(data,"data")
    return data.data
;
  } catch (error: any) {

    console.log(error,"in err token")
    return rejectWithValue("unauthorized");
  }
});

const isBrowser = typeof window !== "undefined";

const initialState: AuthState = {
  user: null,
  error: null,
  token: isBrowser ? localStorage.getItem("token") : null,
  isAuthenticated: isBrowser ? !!localStorage.getItem("token") : false,
  loading: false, 
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
      state.loading = false; 
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null; 
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
