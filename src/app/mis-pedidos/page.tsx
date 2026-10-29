'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usePedidos } from '@/features/pedidos/hooks/usePedidos';

export default function MisPedidosPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { pedidos, isLoading: pedidosLoading, error, recargar } = usePedidos();
  const router = useRouter();

  // Protección de ruta: Si no tiene sesión, redirigir a /login
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=mis-pedidos');
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-verdolaga-oscuro">
            Mis Pedidos Verdolagas
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Historial de artículos y coleccionables pedidos por {user?.nombre}.
          </p>
        </div>
        <Link
          href="/#productos"
          className="inline-flex items-center text-sm font-semibold text-verdolaga-principal hover:underline"
        >
          ← Continuar comprando
        </Link>
      </div>

      {/* Estado Cargando */}
      {pedidosLoading && (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Cargando tus pedidos desde la base de datos...</p>
        </div>
      )}

      {/* Estado Error */}
      {!pedidosLoading && error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center max-w-lg mx-auto">
          <p className="text-sm text-red-700 mb-3">⚠️ {error}</p>
          <button
            type="button"
            onClick={() => recargar()}
            className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Estado Vacío */}
      {!pedidosLoading && !error && pedidos.length === 0 && (
        <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center max-w-md mx-auto shadow-xs">
          <span className="text-5xl block mb-3">🛒</span>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Aún no tienes pedidos</h3>
          <p className="text-sm text-gray-500 mb-6">
            Explora el catálogo de camisetas, accesorios y coleccionables para hacer tu primer pedido.
          </p>
          <Link
            href="/#productos"
            className="px-5 py-2.5 bg-verdolaga-principal text-white text-sm font-bold rounded-lg shadow-sm hover:bg-verdolaga-oscuro transition-colors"
          >
            Ver productos
          </Link>
        </div>
      )}

      {/* Lista de Pedidos */}
      {!pedidosLoading && !error && pedidos.length > 0 && (
        <div className="space-y-4">
          {pedidos.map((pedido) => {
            const fecha = new Date(pedido.createdAt).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const subtotal = pedido.producto ? pedido.producto.precio * pedido.cantidad : 0;

            return (
              <div
                key={pedido.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {pedido.producto?.imagen && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={pedido.producto.imagen}
                        alt={pedido.producto.nombre || 'Producto'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-gray-400">Pedido #{pedido.id.substring(0, 8)} · {fecha}</span>
                    <h3 className="text-base font-bold text-gray-900 mt-0.5">
                      {pedido.producto?.nombre || 'Producto no disponible'}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Cantidad: <strong className="text-gray-900">{pedido.cantidad}</strong>
                      {pedido.notas && ` · Nota: "${pedido.notas}"`}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <span className="text-sm font-extrabold text-verdolaga-oscuro">
                    ${subtotal.toLocaleString('es-CO')}
                  </span>
                  <span className="mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {pedido.estado}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
