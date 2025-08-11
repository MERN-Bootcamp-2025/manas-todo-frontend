// src/redux/slices/taskSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../types';

type TaskState = {
  items: Todo[];
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  filters: { status?: string; priority?: string; title?: string };
};

const initialState: TaskState = {
  items: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  loading: false,
  filters: {},
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },


    setFilters(state, action: PayloadAction<TaskState['filters']>) {
        state.filters = { ...state.filters, ...action.payload }; 
        state.page = 1;
        state.items = [];
        state.totalPages = 1;
    },    

    append(state, action: PayloadAction<{ todos: Todo[]; page: number; totalPages: number }>) {
      const { todos, page, totalPages } = action.payload;

      if (page === 1) {
        state.items = todos;
      } else {
        state.items = [...state.items, ...todos];
      }

      state.page = page;
      state.totalPages = totalPages;
    },

    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setLoading, setFilters, append, reset } = taskSlice.actions;
export default taskSlice.reducer;
