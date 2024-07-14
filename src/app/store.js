import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import cartReducer from "../features/slices/cartSlice";
import productsReducer from "../features/slices/productsSlice";
import slideReducer from "../features/slices/sliderSlice";

export const store = configureStore({
  reducer: {
    slider: slideReducer,
    products: productsReducer,
    cart: cartReducer,
    user: authReducer,
  },
});
