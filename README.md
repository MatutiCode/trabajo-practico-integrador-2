# Trabajo Práctico Integrador N° II

Frontend en React + Vite + Tailwind CSS del **Sistema de Gestión de Blog Personal con Autenticación** (Trabajo Práctico Integrador N° I).

## Backend utilizado

Repositorio del backend (TP Integrador N° I): https://github.com/MatutiCode/trabajo-practico-integrador-1

El backend debe tener:

- CORS habilitado para `http://localhost:5173` con `credentials: true`.
- El endpoint `POST /api/auth/logout`, que limpia la cookie `token`.

## Cómo levantar el proyecto

1. Levantar el backend del TP Integrador N° I (por defecto en `http://localhost:3000`):

```bash
git clone https://github.com/MatutiCode/trabajo-practico-integrador-1.git
cd trabajo-practico-integrador-1
npm install
npm run dev
```

(Completar el archivo `.env` según `.env.example`.)

2. En otra terminal, clonar este repositorio e instalar las dependencias:

```bash
git clone https://github.com/MatutiCode/trabajo-practico-integrador-2.git
cd trabajo-practico-integrador-2
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir `http://localhost:5173`.

Si el backend corre en otro puerto, cambiar `API_URL` en `src/config.js`.

## Tecnologías

React, Vite, react-router y Tailwind CSS v4. Las peticiones se hacen solo con `fetch` (con `credentials: "include"`).

## Estructura

```
src/
├── components/   Navbar.jsx
├── hooks/        useFetch.js, useForm.js
├── pages/        HomePage.jsx, LoginPage.jsx, RegisterPage.jsx
├── router/       AppRouter.jsx, PrivateRoutes.jsx, PublicRoutes.jsx
├── helpers/      auth.js, errors.js
├── config.js
├── App.jsx
├── index.css
└── main.jsx
```
