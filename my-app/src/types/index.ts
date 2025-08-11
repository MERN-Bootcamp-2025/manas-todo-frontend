
export type Role = 'Admin' | 'User';

export type TodoStatus = 'Todo' | 'In Progress' | 'On Hold' | 'Done' | 'Will Not Do';
export type TodoPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  email: string;
  role: Role;
  invited_by?: any;
  name?: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Todo {
  todo_id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  expected_completion_at?: string | null;
  user: { user_id: string } | string | null;
  created_at: string;
  updated_at: string;
  is_deleted?: boolean;
}

export interface PaginatedTodos {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  todos: Todo[];
}
