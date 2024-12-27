import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [], loading: false };

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
