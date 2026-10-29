import { httpClient } from '../../common/http';
import { Pedido, CreatePedidoRequest } from '../domain/Pedido';

export const pedidoService = {
  crear: async (data: CreatePedidoRequest): Promise<Pedido> => {
    return httpClient<Pedido>('/api/pedidos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  obtenerMisPedidos: async (): Promise<Pedido[]> => {
    return httpClient<Pedido[]>('/api/pedidos/mias', {
      method: 'GET',
    });
  },

  obtenerTodos: async (): Promise<Pedido[]> => {
    return httpClient<Pedido[]>('/api/pedidos', {
      method: 'GET',
    });
  },
};
