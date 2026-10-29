# Tienda Verdolaga Frontend

Este repositorio contiene la parte cliente de Tienda Verdolaga, una tienda de productos deportivos con catálogo, autenticación, pedidos y panel administrativo para usuarios con rol `ADMIN`.

El frontend consume la API REST del backend y se encarga de:

- mostrar el catálogo de productos,
- permitir registro e inicio de sesión,
- guardar la sesión del usuario en el navegador,
- gestionar pedidos del cliente,
- restringir accesos al panel de administración según el rol.

## Enlaces del proyecto

- Frontend desplegado en Vercel: https://tienda-verdolaga-frontend.vercel.app/
- Backend desplegado en Render: https://tienda-verdolaga-backend.onrender.com
- Repositorio frontend: https://github.com/juanfer2006/tienda-verdolaga-frontend.git
- Repositorio backend: https://github.com/juanfer2006/tienda-verdolaga-backend.git

## Stack principal

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Cliente HTTP centralizado para la API

## Requisitos previos

- Node.js 18 o superior
- npm
- backend levantado o desplegado

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_HOST=http://localhost:4000
```

Si el backend corre en otro host o puerto, cambia este valor. El frontend lo usa para construir las peticiones a `/api/...`.

## Instalación y ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Crea el archivo `.env.local` con la URL del backend.

3. Asegúrate de que el backend esté levantado y con la base de datos conectada.

4. Inicia la aplicación:

```bash
npm run dev
```

5. Abre la app en el navegador:

```bash
http://localhost:3000
```

## Credenciales de prueba

Estas credenciales fueron creadas por el seed del backend y sirven para probar login, permisos y rutas protegidas:

| Rol | Correo | Contraseña |
| :--- | :--- | :--- |
| Administrador | `admin@tiendaverdolaga.com` | `Verdolaga2026*` |
| Usuario normal | `hincha@gmail.com` | `Verdolaga2026*` |

> Importante: el frontend no crea ni valida usuarios por sí solo; toda la autenticación real se hace en el backend con JWT.

## Cómo funciona el login en este frontend

1. El usuario llena el formulario de login.
2. El formulario valida el correo y la contraseña antes de enviar.
3. Se llama a `authService.login(...)` desde `src/features/auth/services/authService.ts`.
4. Esa función hace una petición `POST` a `/api/auth/login` con el cliente HTTP centralizado.
5. El backend responde con un token JWT y los datos del usuario.
6. El frontend guarda esa información en `localStorage`.
7. El estado global de autenticación se actualiza con `useAuth`.
8. Si la respuesta es exitosa, la navegación cambia según el rol del usuario.

## Dónde se guarda el token y por qué es importante

El token se guarda en `localStorage` con la clave `tienda_verdolaga_token`.

Ejemplo:

```ts
localStorage.setItem('tienda_verdolaga_token', authResponse.token);
localStorage.setItem('tienda_verdolaga_user', JSON.stringify(authResponse.user));
```

Luego se reutiliza en el cliente HTTP para enviarlo como `Authorization: Bearer <token>` en cada petición protegida.

### Riesgos y decisiones

- XSS: si un atacante logra inyectar JavaScript en la app, podría leer el `localStorage` y robar el token.
- CSRF: es menor en esta implementación porque no se usa cookie HttpOnly, pero sigue relacionado con ataques de XSS.
- En un entorno más seguro, se recomienda usar cookies `HttpOnly` con `SameSite` y protección CSRF. Para la entrega se usó `localStorage` por simplicidad y por la arquitectura del proyecto.

## 401 vs 403 en este proyecto

### 401 Unauthorized

Se presenta cuando el usuario no tiene un token válido, el token expiró o no se envía en la petición.

Ejemplos:

- intenta entrar sin sesión,
- token vencido,
- token corrupto o eliminado del navegador.

Cuando ocurre, el frontend limpia la sesión y redirige a `/login?session_expired=true`.

### 403 Forbidden

Se presenta cuando el usuario sí tiene sesión, pero no tiene permisos para esa acción.

Ejemplos:

- un cliente intenta entrar a `/admin`,
- un usuario normal intenta borrar un producto,
- un usuario sin rol `ADMIN` intenta ejecutar una acción reservada para administradores.

## Protección de rutas y panel administrativo

- `/mis-pedidos`: solo usuarios autenticados.
- `/admin`: solo usuarios con rol `ADMIN`.
- si un usuario normal intenta escribir la URL manualmente, la app lo redirige o deniega el acceso.

La protección real se hace en el backend con 401/403 y en el frontend con redirecciones para mejorar la experiencia.

## Reflexión sobre el uso de IA

La IA fue útil para acelerar tareas repetitivas como:

- estructurar la organización por features,
- sugerir servicios y hooks,
- revisar errores y mejorar la lógica de autenticación.

Sin embargo, la decisión final y la validación de permisos, seguridad y flujo real siempre debieron hacerse por un humano. La IA fue apoyo, no sustituto del criterio técnico.

## Despliegues y enlaces

### Frontend

- Vercel: https://tienda-verdolaga-frontend.vercel.app/

### Backend

- Render: https://tienda-verdolaga-backend.onrender.com

## Evidencia de Network


<img width="1852" height="898" alt="image" src="https://github.com/user-attachments/assets/18c20f1b-748e-4c1d-ba34-b51ea282d9d4" />


La imagen debe mostrar una petición autenticada al backend con `Authorization: Bearer ...` y la respuesta `200 OK` tras iniciar sesión correctamente.

## Resultado esperado

Este frontend está listo para:

- iniciar sesión con usuarios reales del backend,
- consumir el catálogo desde la API,
- mostrar información según el rol del usuario,
- proteger rutas administrativas,
- manejar correctamente 401 y 403,
- mantener la sesión en el navegador entre recargas.

## Mensaje sugerido de commit

```bash
docs: readme completo con decisiones tecnicas y guia de ejecucion
```

