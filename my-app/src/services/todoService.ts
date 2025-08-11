
import api from '../utils/api';
import type { PaginatedTodos, Todo } from '../types';

export const todoService = {
  async create(todo: Partial<Todo>) {
    const { data } = await api.post('/todo/todos', todo);
    return data;
  },
  async list(params: { page?: number; limit?: number; status?: string; priority?: string; title?: string }) {
    const { data } = await api.get<PaginatedTodos>('/todo/todos', { params });
    return data;
  },
  async get(id: string) {
    const { data } = await api.get(`/todo/todos/${id}`);
    return data;
  },
  async update(id: string, payload: Todo) {
    const { data } = await api.put(`/todo/todos/${id}`, payload);
    return data;
  },
  async patch(id: string, payload: Partial<Todo>) {
    const { data } = await api.patch(`/todo/todos/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    const { data } = await api.delete(`/todo/todos/${id}`);
    return data;
  },


};
 