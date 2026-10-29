# Tienda Verdolaga Frontend

Este repositorio contiene la parte cliente de Tienda Verdolaga, una tienda de ropa con catálogo, autenticación, pedidos y panel administrativo para usuarios con rol `ADMIN`.

El frontend consume la API del backend del proyecto y se encarga de:

- mostrar el catálogo de productos,
- permitir registro e inicio de sesión,
- guardar la sesión del usuario en el navegador,
- gestionar pedidos del cliente,
- restringir accesos al panel de administración según el rol.

## Stack principal

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Fetch nativo para consumo de la API

## Requisitos previos

Antes de levantar este frontend, asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- el backend de Tienda Verdolaga corriendo localmente

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con la URL del backend:

```env
NEXT_PUBLIC_API_HOST=http://localhost:4000
```

Si tu backend corre en otro puerto o host, cambia ese valor. El frontend lo usa para construir las peticiones a `/api/...`.

## Instalación y ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Configura el archivo `.env.local` como se indicó arriba.

3. Asegúrate de que el backend esté levantado y con sus seeds ejecutados (si corresponde al repositorio del backend).

4. Inicia la app en modo desarrollo:

```bash
npm run dev
```

5. Abre la aplicación en el navegador:

```bash
http://localhost:3000
```

## Credenciales de prueba

Para pruebas rápidas, el proyecto usa estas cuentas de ejemplo:

- Administrador: `admin@tiendaverdolaga.com`
- Cliente: `hincha@gmail.com`

> El acceso exacto y la contraseña deben coincidir con las credenciales definidas en el backend, ya que este frontend no crea usuarios ni valida credenciales por sí solo; solo envía la petición al backend y reacciona a la respuesta.

## Cómo funciona el login en este frontend

El flujo real es el siguiente:

1. El usuario llena el formulario del login en [src/features/auth/components/LoginForm.tsx](src/features/auth/components/LoginForm.tsx).
2. El formulario valida formato de correo y contraseña antes de enviar.
3. Se llama a `authService.login(...)` desde [src/features/auth/services/authService.ts](src/features/auth/services/authService.ts).
4. Esa función hace una petición `POST` a `/api/auth/login` usando el cliente HTTP centralizado.
5. La respuesta del backend incluye un token JWT y la información del usuario.
6. El frontend guarda ambos datos en `localStorage` mediante `guardarSesion(...)`.
7. El estado global de autenticación se actualiza con `useAuth`, que re-renderiza la UI según si el usuario está autenticado o no.
8. Si la respuesta es exitosa, el usuario queda logueado y la navegación cambia para mostrar opciones como "Mis Pedidos" o "Administración" según su rol.

## Dónde se guarda el token y por qué es importante

El token se guarda en `localStorage` con la clave `tienda_verdolaga_token`.

Esto se hace en [src/features/auth/services/authService.ts](src/features/auth/services/authService.ts):

```ts
localStorage.setItem('tienda_verdolaga_token', authResponse.token);
localStorage.setItem('tienda_verdolaga_user', JSON.stringify(authResponse.user));
```

Y luego se reutiliza en [src/features/common/http.ts](src/features/common/http.ts) para adjuntarlo a cada petición con el header `Authorization`.

### Riesgos y decisiones

- XSS: si un atacante logra inyectar JavaScript en la app, puede leer `localStorage` y robar el token.
- CSRF: como el token no se envía en cookies con `SameSite` ni se maneja mediante cookies HttpOnly, el riesgo clásico de CSRF es menor que en un flujo basado en cookies, pero sigue existiendo si la app se ve comprometida por XSS.
- En un entorno más seguro, una estrategia sólida suele usar cookies HttpOnly con políticas CSRF reforzadas, pero este proyecto usa almacenamiento local por simplicidad de implementación del frontend y por la arquitectura del backend que devuelve un token JWT.

## 401 vs 403 en este proyecto

### 401 Unauthorized

Se presenta cuando el usuario no tiene un token válido o este expiró.

En [src/features/common/http.ts](src/features/common/http.ts) se detecta este caso y se ejecuta lo siguiente:

- se limpia la sesión en `localStorage`,
- se redirige a `/login?session_expired=true`.

Esto suele ocurrir cuando:

- el usuario intenta acceder a un recurso protegido sin iniciar sesión,
- el token venció,
- el token fue eliminado o es inválido.

### 403 Forbidden

Se presenta cuando el usuario tiene sesión, pero no tiene permisos para una acción o una ruta.

Ejemplos reales aquí:

- un usuario normal intenta entrar a `/admin`,
- un cliente intenta eliminar un producto desde la pantalla de administración,
- un usuario sin rol `ADMIN` intenta realizar una acción restringida por el backend.

La protección de rutas se hace en [src/app/admin/page.tsx](src/app/admin/page.tsx): si el usuario no existe o no es `ADMIN`, se redirige.

## Panel de administración y protección de rutas

El panel administrativo solo está disponible para usuarios con rol `ADMIN`.

La lógica se implementa con `useAuth()` y una validación en la vista de administración:

- si no hay usuario, redirige al login,
- si el usuario existe pero no es administrador, redirige al home,
- si tiene permisos, permite crear, editar o eliminar productos.

## Reflexión sobre el uso de IA

La inteligencia artificial fue útil como apoyo para acelerar tareas repetitivas y mejorar la organización del código, como:

- sugerir estructura modular para componentes y servicios,
- ayudar a mantener una lógica de autenticación más clara,
- acelerar la revisión de errores y la organización del proyecto.

Sin embargo, la IA no reemplaza la comprensión del negocio ni la validación del flujo real. En este proyecto fue valiosa como herramienta complementaria, pero la decisión final y la verificación de comportamientos sensibles (seguridad, permisos, redirecciones y manejo de errores) debieron hacerse con criterio humano.

## Despliegues y enlaces

### Backend

- Render: [agregar enlace de Render]

### Frontend

- Vercel: [agregar enlace de Vercel]

### Capturas de Network

- [Agregar captura de login exitoso]
- [Agregar captura de 401/403]
- [Agregar captura del request con Authorization]

> Estas secciones pueden completarse con las evidencias finales de la entrega para dejar un README completamente documentado y listo para presentación.

## Resultado esperado

Este frontend está listo para:

- iniciar sesión con usuarios reales del backend,
- interactuar con el catálogo,
- mostrar información según el rol del usuario,
- proteger rutas administrativas,
- consumir la API con token JWT de forma centralizada.

## Mensaje de commit sugerido

```bash
docs: readme completo con decisiones tecnicas y guia de ejecucion
```
