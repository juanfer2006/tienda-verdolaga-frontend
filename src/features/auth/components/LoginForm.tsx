'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionExpired = searchParams.get('session_expired');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail('');
    setErrorPassword('');
    setErrorGeneral('');

    let hasErrors = false;

    if (!email.trim()) {
      setErrorEmail('El correo electrónico es obligatorio.');
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorEmail('Ingresa un correo electrónico válido.');
      hasErrors = true;
    }

    if (!password) {
      setErrorPassword('La contraseña es obligatoria.');
      hasErrors = true;
    }

    if (hasErrors) return;

    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      router.push('/');
    } catch (err: any) {
      // Mostrar el error del backend junto al formulario (no en alert)
      setErrorGeneral(err?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-verdolaga-suave w-full max-w-md mx-auto text-left"
      noValidate
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-verdolaga-oscuro">Iniciar Sesión</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Ingresa a tu cuenta para hacer pedidos y gestionar tus compras verdolagas.
        </p>
      </div>

      {sessionExpired && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg">
          Tu sesión ha expirado por seguridad. Por favor, ingresa de nuevo.
        </div>
      )}

      {errorGeneral && (
        <div
          role="alert"
          className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-2"
        >
          <span>⚠️</span>
          <span>{errorGeneral}</span>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorEmail) setErrorEmail('');
          }}
          error={errorEmail}
          required
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorPassword) setErrorPassword('');
          }}
          error={errorPassword}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          className="w-full mt-2"
        >
          Ingresar
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/registro" className="font-bold text-verdolaga-principal hover:underline">
          Regístrate aquí
        </Link>
      </div>
    </form>
  );
};
