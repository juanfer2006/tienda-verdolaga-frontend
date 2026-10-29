import { httpClient } from '../../common/http';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../domain/User';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return httpClient<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return httpClient<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  guardarSesion: (authResponse: AuthResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tienda_verdolaga_token', authResponse.token);
      localStorage.setItem('tienda_verdolaga_user', JSON.stringify(authResponse.user));
      // Disparar evento para sincronizar Navbar u otros componentes en tiempo real
      window.dispatchEvent(new Event('auth_change'));
    }
  },

  obtenerUsuarioActual: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('tienda_verdolaga_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  obtenerToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('tienda_verdolaga_token');
  },

  cerrarSesion: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tienda_verdolaga_token');
      localStorage.removeItem('tienda_verdolaga_user');
      window.dispatchEvent(new Event('auth_change'));
      window.location.href = '/login';
    }
  },
};
