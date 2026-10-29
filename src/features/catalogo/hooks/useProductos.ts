'use client';

import { useState, useEffect, useCallback } from 'react';
import { productoService, GetProductosParams } from '../services/productoService';
import { Producto, CatalogoPagination } from '../domain/Producto';

interface UseProductosState {
  productos: Producto[];
  pagination: CatalogoPagination | null;
  isLoading: boolean;
  error: string | null;
}

export const useProductos = (params?: GetProductosParams) => {
  const [state, setState] = useState<UseProductosState>({
    productos: [],
    pagination: null,
    isLoading: true,
    error: null,
  });

  const page = params?.page || 1;
  const limit = params?.limit || 9;
  const categoria = params?.categoria;

  const fetchProductos = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await productoService.obtenerTodos({
        page,
        limit,
        categoria,
      });

      setState({
        productos: response.data,
        pagination: response.pagination,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      setState({
        productos: [],
        pagination: null,
        isLoading: false,
        error: err?.message || 'Error al cargar los productos desde el servidor.',
      });
    }
  }, [page, limit, categoria]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return {
    ...state,
    recargar: fetchProductos,
  };
};
