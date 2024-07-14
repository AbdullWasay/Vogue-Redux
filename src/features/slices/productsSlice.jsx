import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Asynchronous thunk action to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [], // Store all products here
    filteredProducts: [], // Store filtered products here
    singleProduct: null,
    error: false,
  },
  reducers: {
    filterProducts(state, action) {
      const category = action.payload;
      console.log("All products:", state.allProducts);

      console.log("Filtering products by category:", category);
      if (category === '') {
        // If no category, show all products
        state.filteredProducts = state.allProducts;
      } else {
        // Filter products based on the category
        state.filteredProducts = state.allProducts.filter(
          (product) => product.category === category
        );
      }
      state.error = false;

      // Log the filtered products
      console.log("Filtered products:", state.filteredProducts);
    },
    singleProduct(state, action) {
      try {
        const oneProduct = state.allProducts.find(
          (product) => product.id === action.payload
        );
        state.singleProduct = oneProduct || null; // Handle case where product is not found
      } catch (err) {
        state.error = true;
      }
    },
    sortByPrice(state, action) {
      try {
        const sorted = [...state.filteredProducts].sort((a, b) =>
          action.payload === "Low to High"
            ? a.price - b.price
            : b.price - a.price
        );
        state.filteredProducts = sorted;
      } catch (err) {
        state.error = true;
      }
    },
    addProduct(state, action) {
      state.allProducts.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    updateProducts(state, action) {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload; // Store fetched products
        state.filteredProducts = action.payload; // Initialize filtered products with all products
        state.error = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { filterProducts, singleProduct, sortByPrice, addProduct, updateProducts } = productSlice.actions;
export default productSlice.reducer;
