import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import type { User } from "./authApi";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string;
        user: User | null;
      }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { accessToken, refreshToken, ...userData } = action.payload;
        state.token = accessToken;
        state.refreshToken = refreshToken || null;
        state.user = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: userData.gender,
          image: userData.image,
        };
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;