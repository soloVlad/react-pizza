import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (Url) => {
    const { data } = await axios.get(Url)

    return data;
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "success"
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error"
        state.items = []
      })
  }
})

export const {
  setItems
} = pizzasSlice.actions;

export default pizzasSlice.reducer;