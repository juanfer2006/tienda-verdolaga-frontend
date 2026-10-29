import { API_BASE_URL } from './config';

export class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export const httpClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { params, headers = {}, ...customConfig } = options;

  // 1. Construir URL con parámetros query si existen
  let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // 2. Preparar headers e inyectar automáticamente el Bearer token si existe
  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('tienda_verdolaga_token');
    if (token) {
      reqHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // 3. Ejecutar petición fetch
  const response = await fetch(url, {
    ...customConfig,
    headers: reqHeaders,
  });

  // 4. Manejo centralizado del 401 Unauthorized
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tienda_verdolaga_token');
      localStorage.removeItem('tienda_verdolaga_user');

      // Si no estamos ya en la página de login, redirigir
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?session_expired=true';
      }
    }
    throw new HttpError(401, 'Sesión expirada o no autorizada. Inicia sesión nuevamente.');
  }

  // 5. Procesar respuesta
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || `Error en la petición: ${response.statusText}`;
    throw new HttpError(response.status, errorMessage, data);
  }

  return data as T;
};
