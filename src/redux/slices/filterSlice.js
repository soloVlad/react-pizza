import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    property: 'rating',
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort.property = action.payload.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    resetFilters: (state) => {
      state.categoryId = initialState.categoryId;
      state.currentPage = initialState.currentPage;
      state.sort = initialState.sort;
    }
  }
})

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;