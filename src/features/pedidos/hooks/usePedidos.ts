'use client';

import { useState, useEffect, useCallback } from 'react';
import { pedidoService } from '../services/pedidoService';
import { Pedido, CreatePedidoRequest } from '../domain/Pedido';

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMisPedidos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await pedidoService.obtenerMisPedidos();
      setPedidos(data);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar tus pedidos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMisPedidos();
  }, [fetchMisPedidos]);

  const crearPedido = async (data: CreatePedidoRequest) => {
    const nuevoPedido = await pedidoService.crear(data);
    setPedidos((prev) => [nuevoPedido, ...prev]);
    return nuevoPedido;
  };

  return {
    pedidos,
    isLoading,
    error,
    recargar: fetchMisPedidos,
    crearPedido,
  };
};
