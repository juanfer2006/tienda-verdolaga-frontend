import { httpClient } from '../../common/http';
import { CatalogoResponse, Producto } from '../domain/Producto';

export interface GetProductosParams {
  page?: number;
  limit?: number;
  categoria?: string;
}

export const productoService = {
  obtenerTodos: async (params?: GetProductosParams): Promise<CatalogoResponse> => {
    return httpClient<CatalogoResponse>('/api/productos', {
      method: 'GET',
      params: {
        page: params?.page || 1,
        limit: params?.limit || 9,
        categoria: params?.categoria && params.categoria !== 'todos' ? params.categoria : undefined,
      },
    });
  },

  obtenerPorId: async (id: string): Promise<Producto> => {
    return httpClient<Producto>(`/api/productos/${id}`, {
      method: 'GET',
    });
  },

  crear: async (producto: Omit<Producto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Producto> => {
    return httpClient<Producto>('/api/productos', {
      method: 'POST',
      body: JSON.stringify(producto),
    });
  },

  actualizar: async (
    id: string,
    producto: Partial<Omit<Producto, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Producto> => {
    return httpClient<Producto>(`/api/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(producto),
    });
  },

  eliminar: async (id: string): Promise<{ message: string }> => {
    return httpClient<{ message: string }>(`/api/productos/${id}`, {
      method: 'DELETE',
    });
  },
};
