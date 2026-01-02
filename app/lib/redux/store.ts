import { configureStore } from "@reduxjs/toolkit";
import { 
  persistStore, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from "redux-persist";
import { persistedReducer } from "./rootReducer";
import { productsApi } from "~/features/products/productsApi";
import { authApi } from "~/features/auth/authApi";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;