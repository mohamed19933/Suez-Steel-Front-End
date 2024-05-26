import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./rtkQuery/authService";
import authSlice from "./rtk/authSlice";

const Store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export default Store;
