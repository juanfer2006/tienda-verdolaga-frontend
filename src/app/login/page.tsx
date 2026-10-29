'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirigir al inicio si ya tiene sesión activa
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div>Cargando formulario...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
