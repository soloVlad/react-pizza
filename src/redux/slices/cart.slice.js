import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice += action.payload.price;
    },
    minusItem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => {
        if (item.id === action.payload) {
          state.totalPrice -= item.price;
          return false;
        }
        return true;
      });
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
})

export const {
  addItem,
  minusItem,
  removeItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;