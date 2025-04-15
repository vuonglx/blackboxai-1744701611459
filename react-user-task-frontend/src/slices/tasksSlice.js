import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API fetch
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          { id: 1, title: 'Design homepage', description: 'Create wireframes and mockups', status: 'To Do' },
          { id: 2, title: 'Fix bugs', description: 'Resolve all critical bugs', status: 'In Progress' },
          { id: 3, title: 'Code review', description: 'Review pull requests', status: 'Review' },
          { id: 4, title: 'Deploy app', description: 'Deploy to production', status: 'Done' },
        ]),
      500
    )
  );
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    filters: {
      search: '',
      status: '',
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
    addTask(state, action) {
      state.list.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.list.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    updateTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.list.find(t => t.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPage, addTask, updateTask, deleteTask, updateTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
