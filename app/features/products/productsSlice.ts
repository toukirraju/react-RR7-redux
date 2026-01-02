import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

