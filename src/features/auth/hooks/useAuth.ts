'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import { User, LoginRequest, RegisterRequest } from '../domain/User';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Sincronizar estado inicial y escuchar cambios de sesión
  const sincronizarUsuario = useCallback(() => {
    const usuarioGuardado = authService.obtenerUsuarioActual();
    setUser(usuarioGuardado);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    sincronizarUsuario();

    const handleAuthChange = () => sincronizarUsuario();
    window.addEventListener('auth_change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth_change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [sincronizarUsuario]);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      authService.guardarSesion(response);
      setUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      authService.guardarSesion(response);
      setUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.cerrarSesion();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isLoading,
    login,
    register,
    logout,
  };
};
