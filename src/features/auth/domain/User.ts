export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
