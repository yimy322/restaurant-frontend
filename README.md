# Restaurant Frontend

Sitio web del restaurante La Huaca: Inicio, Menú, Reservas, Contacto y Panel de administración, construido en React y conectado a la API de `restaurant-backend`. Incluye un widget de chat flotante que embebe un asistente de voz (Streamlit) conectado también a la misma API.

## Requisitos

- Node.js 18 o superior
- npm (viene incluido con Node.js)
- El backend (`restaurant-backend`) corriendo (local o desplegado)
- El asistente de voz (`streamlit_app.py`) corriendo (local o desplegado), si se quiere probar el chat

## Instalación y arranque

```bash
cd restaurant-frontend

# Instalar dependencias (lee el package.json, equivalente al requirements.txt de Python)
npm install

# Levantar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en el navegador.

> Asegúrate de tener el backend corriendo en paralelo (`uvicorn app.main:app --reload` desde `restaurant-backend`), ya que el frontend consume sus endpoints para el menú, horarios, reservas y autenticación de administrador.

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (no se versiona, ya está en `.gitignore`):

```dotenv
VITE_API_BASE_URL=http://localhost:8000
VITE_STREAMLIT_URL=http://localhost:8501
```

- **`VITE_API_BASE_URL`**: URL del backend (`restaurant-backend`). En producción, apunta a la URL real donde esté desplegado (ej. Render).
- **`VITE_STREAMLIT_URL`**: URL del asistente de voz (Streamlit). En producción, apunta a la app publicada en Streamlit Cloud.

> Después de crear o modificar `.env.local`, reinicia `npm run dev` — Vite solo lee las variables de entorno al arrancar el proceso.

## Estructura del proyecto

```
restaurant-frontend/
├── public/
│   └── img/
│       └── fondo.jpg              # imágenes estáticas servidas directo (ej: fondo del hero)
├── src/
│   ├── assets/                    # imágenes e iconos importados por componentes
│   ├── components/
│   │   ├── Header.jsx             # navegación compartida en todas las páginas
│   │   ├── Footer.jsx
│   │   ├── ChatWidget.jsx         # widget flotante que embebe el asistente de voz (iframe a Streamlit)
│   │   ├── DishCard.jsx           # tarjeta reutilizable de un plato
│   │   └── RequireAuth.jsx        # guarda de ruta: redirige a /admin/login si no hay sesión
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx               # consume /api/dishes/ y /api/categories/
│   │   ├── Reservas.jsx           # consume /api/reservations/ (POST)
│   │   ├── Contacto.jsx           # consume /api/opening-hours/
│   │   └── admin/
│   │       ├── Login.jsx          # consume /api/auth/login
│   │       ├── AdminHome.jsx      # panel principal de administración
│   │       ├── AdminDishes.jsx    # CRUD de platos + subida de imagen
│   │       ├── AdminCategories.jsx # CRUD de categorías
│   │       └── AdminReservations.jsx # listado y cambio de estado de reservas
│   ├── utils/
│   │   └── api.js                 # API_BASE_URL centralizado + authFetch, isAuthenticated, logout
│   ├── App.jsx                    # layout + rutas (React Router)
│   ├── App.css
│   ├── main.jsx                   # punto de entrada
│   └── index.css                  # estilos globales
├── index.html                     # plantilla HTML base (título, fuentes de Google)
├── .env.local                     # variables de entorno locales (no se versiona)
└── package.json                   # dependencias del proyecto
```

## Páginas y funcionalidades

### Públicas

| Página | Ruta | Qué hace |
|---|---|---|
| Inicio | `/` | Hero de bienvenida con llamadas a acción |
| Menú | `/menu` | Lista platos por categoría, con filtro; trae los datos del backend |
| Reservas | `/reservas` | Formulario de reserva; valida contra el horario de atención en el backend |
| Contacto | `/contacto` | Dirección, horario (dinámico desde el backend) y mapa embebido |

En todas las páginas públicas hay un **widget de chat flotante** (`ChatWidget.jsx`) que embebe el asistente de voz (Streamlit) en un iframe, con opción de abrirlo en pestaña completa.

### Administración

| Página | Ruta | Qué hace |
|---|---|---|
| Login | `/admin/login` | Autenticación de administrador contra `/api/auth/login` |
| Panel principal | `/admin` | Punto de entrada al panel de administración |
| Gestionar platos | `/admin/dishes` | CRUD de platos y subida de imágenes |
| Gestionar categorías | `/admin/categories` | CRUD de categorías |
| Gestionar reservas | `/admin/reservations` | Listado de reservas y cambio de estado (pending/confirmed/cancelled) |

Las rutas de administración están protegidas por `RequireAuth.jsx`, que redirige a `/admin/login` si no hay un token válido guardado (`localStorage`).

## Conexión con el backend

La URL base de la API está centralizada en `src/utils/api.js`, leída desde una variable de entorno de Vite:

```js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
```

Todos los componentes que necesitan llamar al backend importan esta constante (o el helper `authFetch`, que además adjunta el token de administrador) desde `utils/api.js`, en vez de definir su propia URL. Esto evita tener la URL del backend repetida y desincronizada en varios archivos.

Para apuntar a un backend distinto (por ejemplo, uno desplegado en Render), basta con cambiar `VITE_API_BASE_URL` en `.env.local` (o en las variables de entorno del proveedor de hosting) y reiniciar/redeployar — no hace falta tocar código.

## Conexión con el asistente de voz

De la misma forma, `ChatWidget.jsx` lee la URL del asistente de voz desde `VITE_STREAMLIT_URL` en vez de tenerla hardcodeada, tanto para el iframe embebido como para el enlace de "abrir en pestaña completa".

## Dependencias principales

- **react** / **react-dom** — librería base
- **react-router-dom** — enrutamiento entre páginas (Inicio, Menú, Reservas, Contacto, Admin)
- **vite** (dependencia de desarrollo) — servidor de desarrollo y build
