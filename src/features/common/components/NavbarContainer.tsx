'use client';

import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Navbar } from './Navbar';

export const NavbarContainer: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar
      user={user ? { nombre: user.nombre, role: user.role } : null}
      onLogout={logout}
    />
  );
};
