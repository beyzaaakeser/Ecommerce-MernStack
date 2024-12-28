import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { user: {}, isAuth: false, loading: false };

export const register = createAsyncThunk(
  'register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include', // Bu ayarı koruyoruz
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue('Network error occurred');
    }
  }
);

export const login = createAsyncThunk(
  'login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include', // Bu ayarı koruyoruz
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result?.token);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue('Network error occurred');
    }
  }
);

export const profile = createAsyncThunk(
  'profile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/me', {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Profile fetch failed');
      }

      const result = await response.json();
      console.log(result); // Burada yanıtı kontrol edin
      return result;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return rejectWithValue('Network error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
