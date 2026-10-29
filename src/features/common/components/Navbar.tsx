'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: {
    nombre: string;
    role: string;
  } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-verdolaga-principal text-white shadow-verdolaga-suave">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          Tienda Verdolaga
        </Link>

        {/* Botón menú hamburguesa (móvil) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-white hover:bg-verdolaga-oscuro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
          aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <span className="text-2xl leading-none">✕</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>

        {/* Enlaces de escritorio */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white hover:bg-verdolaga-oscuro px-3 py-1.5 rounded-md transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#productos"
            className="text-sm font-medium text-white/90 hover:text-white hover:bg-verdolaga-oscuro px-3 py-1.5 rounded-md transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/#categorias"
            className="text-sm font-medium text-white/90 hover:text-white hover:bg-verdolaga-oscuro px-3 py-1.5 rounded-md transition-colors"
          >
            Categorías
          </Link>

          {/* Rutas condicionales según sesión */}
          {user ? (
            <div className="flex items-center gap-4 pl-2 border-l border-white/20">
              <Link
                href="/mis-pedidos"
                className="text-sm font-medium text-white/90 hover:text-white hover:bg-verdolaga-oscuro px-3 py-1.5 rounded-md transition-colors"
              >
                Mis Pedidos
              </Link>
              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-sm font-bold bg-white text-verdolaga-oscuro hover:bg-gray-100 px-3 py-1.5 rounded-md shadow-sm transition-colors"
                >
                  Administración
                </Link>
              )}
              <span className="text-xs text-white/80 max-w-[120px] truncate">
                Hola, {user.nombre.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs font-semibold bg-red-600/90 hover:bg-red-700 text-white px-2.5 py-1 rounded-md transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-white/20">
              <Link
                href="/login"
                className="text-sm font-semibold bg-white text-verdolaga-oscuro hover:bg-gray-100 px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="text-sm font-medium border border-white/60 text-white hover:bg-white/10 px-3.5 py-1.5 rounded-lg transition-all"
              >
                Registrarme
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-verdolaga-oscuro border-t border-white/10 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <Link
            href="/"
            onClick={closeMenu}
            className="block text-base font-medium text-white hover:bg-verdolaga-principal px-3 py-2 rounded-md transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#productos"
            onClick={closeMenu}
            className="block text-base font-medium text-white hover:bg-verdolaga-principal px-3 py-2 rounded-md transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/#categorias"
            onClick={closeMenu}
            className="block text-base font-medium text-white hover:bg-verdolaga-principal px-3 py-2 rounded-md transition-colors"
          >
            Categorías
          </Link>

          {user ? (
            <>
              <Link
                href="/mis-pedidos"
                onClick={closeMenu}
                className="block text-base font-medium text-white hover:bg-verdolaga-principal px-3 py-2 rounded-md transition-colors"
              >
                Mis Pedidos
              </Link>
              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="block text-base font-bold bg-white text-verdolaga-oscuro px-3 py-2 rounded-md transition-colors"
                >
                  Panel de Administración
                </Link>
              )}
              <div className="pt-3 border-t border-white/20 flex items-center justify-between px-3">
                <span className="text-sm text-white/90">
                  {user.nombre} ({user.role})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    if (onLogout) onLogout();
                  }}
                  className="text-xs font-semibold bg-red-600 text-white px-3 py-1.5 rounded-md"
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3 border-t border-white/20 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="text-center text-sm font-semibold bg-white text-verdolaga-oscuro py-2 rounded-md"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                onClick={closeMenu}
                className="text-center text-sm font-medium border border-white text-white py-2 rounded-md"
              >
                Registrarme
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
