import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "~/features/auth/authSlice";
import productsReducer from "~/features/products/productsSlice";
import { productsApi } from "~/features/products/productsApi";
import { authApi } from "~/features/auth/authApi";

// 1. Create a dummy storage for the Server Side
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
  
  // 2. Select storage based on environment (Browser vs Server)
  const storage = typeof window !== "undefined" 
    ? createWebStorage("local") 
    : createNoopStorage();
  
  const persistConfig = {
    key: "root",
    storage, // Use the environment-aware storage
    whitelist: ["auth", "theme"],
  };

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);