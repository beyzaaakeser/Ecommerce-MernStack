import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  adminProducts: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk('products', async () => {
  const response = await fetch(`http://localhost:4000/products`);
  const data = await response.json();
  return data;
});

export const getSearchProducts = createAsyncThunk(
  'products',
  async (params) => {
    let link;

    if (params.category) {
      link = `http://localhost:4000/products?keyword=${
        params.keyword || ''
      }&rating[gte]=${params.rating || 0}&price[gte]=${
        params.price.min || 0
      }&price[lte]=${params.price.max || 30000}&category=${params.category}`;
    } else {
      link = `http://localhost:4000/products?keyword=${
        params.keyword || ''
      }&rating[gte]=${params.rating || 0}&price[gte]=${
        params.price.min || 0
      }&price[lte]=${params.price.max || 30000}`;
    }

    // const response = await fetch(link);
    const response = await fetch(link);
    const data = await response.json();
    return data;
  }
);

export const getProductDetail = createAsyncThunk('product', async (id) => {
  const response = await fetch(`http://localhost:4000/products/${id}`);
  return await response.json();
});

export const getAdminProducts = createAsyncThunk('admin', async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:4000/admin/products`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return await response.json();
});

export const addAdminProducts = createAsyncThunk('adminadd', async (data) => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `http://localhost:4000/product/new`,
    requestOptions
  );
  return await response.json();
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = action.payload;
    });
    builder.addCase(addAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.adminProducts = [...state.products, action.payload];
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
