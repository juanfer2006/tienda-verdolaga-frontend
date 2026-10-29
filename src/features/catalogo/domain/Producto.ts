export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogoPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CatalogoResponse {
  pagination: CatalogoPagination;
  data: Producto[];
}
