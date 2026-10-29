'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Producto } from '@/features/catalogo/domain/Producto';
import { pedidoService } from '../services/pedidoService';
import { Modal } from '@/features/common/components/Modal';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

interface PedidoModalProps {
  producto: Producto | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PedidoModal: React.FC<PedidoModalProps> = ({
  producto,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [cantidad, setCantidad] = useState<number>(1);
  const [notas, setNotas] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!producto) return null;

  const total = producto.precio * cantidad;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cantidad < 1) {
      setError('La cantidad debe ser al menos 1.');
      return;
    }

    setIsSubmitting(true);
    try {
      await pedidoService.crear({
        productoId: producto.id,
        cantidad,
        notas: notas.trim() || undefined,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al procesar el pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Completar Pedido Verdolaga">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resumen del producto seleccionado */}
        <div className="flex gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl items-center">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 truncate">{producto.nombre}</h4>
            <span className="text-xs font-semibold text-verdolaga-principal bg-verdolaga-suave px-2 py-0.5 rounded-full inline-block mt-0.5">
              ${producto.precio.toLocaleString('es-CO')} c/u
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Campo cantidad */}
        <Input
          label="Cantidad"
          type="number"
          min="1"
          max="20"
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
          required
        />

        {/* Campo notas */}
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="notas" className="text-sm font-semibold text-gray-800">
            Notas de entrega (Opcional)
          </label>
          <textarea
            id="notas"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-verdolaga-principal/30 focus:border-verdolaga-principal"
            placeholder="Ej: Dejar en portería, talla L si es camiseta..."
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
        </div>

        {/* Resumen total */}
        <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm">
          <span className="text-gray-600">Total a pagar:</span>
          <span className="text-lg font-extrabold text-verdolaga-oscuro">
            ${total.toLocaleString('es-CO')}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-1/2"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-1/2"
          >
            Confirmar Pedido
          </Button>
        </div>
      </form>
    </Modal>
  );
};
