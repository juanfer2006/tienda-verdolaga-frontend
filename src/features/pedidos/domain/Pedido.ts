import { Producto } from '../../catalogo/domain/Producto';
import { User } from '../../auth/domain/User';

export type EstadoPedido = 'PENDIENTE' | 'CONFIRMADO' | 'EN_CAMINO' | 'ENTREGADO' | 'CANCELADO';

export interface Pedido {
  id: string;
  userId: string;
  productoId: string;
  cantidad: number;
  notas?: string | null;
  estado: EstadoPedido;
  createdAt: string;
  updatedAt: string;
  producto?: Producto;
  user?: Partial<User>;
}

export interface CreatePedidoRequest {
  productoId: string;
  cantidad?: number;
  notas?: string;
}
