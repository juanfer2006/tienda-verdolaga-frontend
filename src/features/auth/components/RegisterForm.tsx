'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';

export const RegisterForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNombre('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirm('');
    setErrorGeneral('');

    let hasErrors = false;

    // Validación de Nombre
    if (!nombre.trim()) {
      setErrorNombre('El nombre completo es obligatorio.');
      hasErrors = true;
    } else if (nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres.');
      hasErrors = true;
    }

    // Validación de Email
    if (!email.trim()) {
      setErrorEmail('El correo electrónico es obligatorio.');
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorEmail('Ingresa un correo electrónico válido.');
      hasErrors = true;
    }

    // Validación de Contraseña
    if (!password) {
      setErrorPassword('La contraseña es obligatoria.');
      hasErrors = true;
    } else if (password.length < 6) {
      setErrorPassword('La contraseña debe tener mínimo 6 caracteres.');
      hasErrors = true;
    }

    // Confirmación de Contraseña
    if (password !== confirmPassword) {
      setErrorConfirm('Las contraseñas no coinciden.');
      hasErrors = true;
    }

    if (hasErrors) return;

    setIsSubmitting(true);
    try {
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
        telefono: telefono.trim() || undefined,
      });
      router.push('/');
    } catch (err: any) {
      // Si el backend responde 409 (Email repetido), mostrarlo junto al campo correspondiente
      if (err?.status === 409) {
        setErrorEmail('Este correo electrónico ya se encuentra registrado.');
      } else {
        setErrorGeneral(err?.message || 'Error al completar el registro.');
      }
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
        <h2 className="text-2xl font-extrabold text-verdolaga-oscuro">Crear Cuenta</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Únete a Tienda Verdolaga y lleva tu pasión verde y blanca a donde vayas.
        </p>
      </div>

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
          label="Nombre Completo"
          type="text"
          name="nombre"
          placeholder="Juan Fernando Castañeda"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            if (errorNombre) setErrorNombre('');
          }}
          error={errorNombre}
          required
        />

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
          label="Teléfono (Opcional)"
          type="tel"
          name="telefono"
          placeholder="3001234567"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorPassword) setErrorPassword('');
          }}
          error={errorPassword}
          required
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errorConfirm) setErrorConfirm('');
          }}
          error={errorConfirm}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          className="w-full mt-2"
        >
          Registrarme
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="font-bold text-verdolaga-principal hover:underline">
          Inicia sesión
        </Link>
      </div>
    </form>
  );
};
