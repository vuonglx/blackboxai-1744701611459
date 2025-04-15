import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API fetch
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', department: 'Sales' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive', department: 'Marketing' },
        ]),
      500
    )
  );
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    filters: {
      search: '',
      role: '',
      status: '',
      department: '',
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // reset page on filter change
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    addUser(state, action) {
      state.list.push(action.payload);
    },
    updateUser(state, action) {
      const index = state.list.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteUser(state, action) {
      state.list = state.list.filter(u => u.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPage, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
