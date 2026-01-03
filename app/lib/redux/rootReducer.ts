import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import authReducer from "~/features/auth/authSlice";
import productsReducer from "~/features/products/productsSlice";
import { baseApi } from "./baseApi";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? new CookieStorage(Cookies, {
        expiration: {
          default: 365 * 86400,
        },
        setCookieOptions: {
          path: "/",
          secure: true,
        },
      })
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);