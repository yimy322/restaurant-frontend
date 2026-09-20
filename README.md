# Restaurant Frontend

Sitio web del restaurante La Huaca: Inicio, Menú, Reservas y Contacto, construido en React y conectado a la API de `restaurant-backend`.

## Requisitos

- Node.js 18 o superior
- npm (viene incluido con Node.js)
- El backend (`restaurant-backend`) corriendo en `http://127.0.0.1:8000`

## Instalación y arranque

```bash
cd restaurant-frontend

# Instalar dependencias (lee el package.json, equivalente al requirements.txt de Python)
npm install

# Levantar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en el navegador.

> Asegúrate de tener el backend corriendo en paralelo (`uvicorn app.main:app --reload` desde `restaurant-backend`), ya que el frontend consume sus endpoints para el menú, horarios y reservas.

## Estructura del proyecto

```
restaurant-frontend/
├── public/
│   └── img/
│       └── fondo.jpg              # imágenes estáticas servidas directo (ej: fondo del hero)
├── src/
│   ├── components/
│   │   ├── Header.jsx             # navegación compartida en todas las páginas
│   │   ├── Footer.jsx
│   │   ├── ChatWidget.jsx         # widget flotante del chatbot
│   │   └── DishCard.jsx           # tarjeta reutilizable de un plato
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx               # consume /api/dishes/ y /api/categories/
│   │   ├── Reservas.jsx           # consume /api/reservations/ (POST)
│   │   └── Contacto.jsx           # consume /api/opening-hours/
│   ├── App.jsx                    # layout + rutas (React Router)
│   ├── main.jsx                   # punto de entrada
│   └── index.css                  # estilos globales
├── index.html                     # plantilla HTML base (título, fuentes de Google)
└── package.json                   # dependencias del proyecto
```

## Páginas y funcionalidades

| Página | Ruta | Qué hace |
|---|---|---|
| Inicio | `/` | Hero de bienvenida con llamadas a acción |
| Menú | `/menu` | Lista platos por categoría, con filtro; trae los datos del backend |
| Reservas | `/reservas` | Formulario de reserva; valida contra el horario de atención en el backend |
| Contacto | `/contacto` | Dirección, horario (dinámico desde el backend) y mapa embebido |

En todas las páginas hay un **widget de chat flotante** (`ChatWidget.jsx`), pensado como punto de entrada del chatbot de voz.

## Conexión con el backend

La URL base de la API está definida como constante en cada archivo que la usa:

```js
const API_BASE_URL = "http://127.0.0.1:8000";
```

Al pasar a producción, cambiar esto por la URL real donde se despliegue el backend (idealmente moverlo a una variable de entorno de Vite, `import.meta.env.VITE_API_BASE_URL`).

## Dependencias principales

- **react** / **react-dom** — librería base
- **react-router-dom** — enrutamiento entre páginas (Inicio, Menú, Reservas, Contacto)
- **vite** (dependencia de desarrollo) — servidor de desarrollo y build