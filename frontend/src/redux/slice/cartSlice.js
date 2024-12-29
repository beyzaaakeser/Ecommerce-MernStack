import { createSlice } from '@reduxjs/toolkit';

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemCart = state.carts.find(
        (cart) => cart.id === action.payload.id
      );

      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id == action.payload.id) {
            let tempQuantity = item.quantity + action.payload.quantity;
            return { ...item, quantity: tempQuantity };
          } else {
            return item;
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },
    removeFromCart: (state, action) => {
        
    },
    clearCart: (state, action) => {

    },
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
