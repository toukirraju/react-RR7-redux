import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "~/lib/redux/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectToken = createSelector([selectAuth], (auth) => auth.token);

export const selectRefreshToken = createSelector([selectAuth], (auth) => auth.refreshToken);

export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectIsAuthenticated = createSelector([selectToken], (token) => !!token);

