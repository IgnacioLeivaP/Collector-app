# Collector App

Una aplicación web para coleccionar y gestionar artículos con categorías, filtros y más.

## Configuración con Cloudflare Pages

Este proyecto está configurado para desplegarse en **Cloudflare Pages** en lugar de Netlify.

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- Cuenta en [Cloudflare](https://www.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Instalación local

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build

```bash
npm run build
```

Esto genera los archivos optimizados en la carpeta `dist/`

### Deploy a Cloudflare Pages

#### Opción 1: Desplegar manualmente con Wrangler

```bash
npm run deploy
```

Este comando hace build y despliega directamente a Cloudflare Pages.

#### Opción 2: Desplegar con GitHub Actions (Recomendado)

1. Configura los secrets en tu repositorio GitHub:
   - `CLOUDFLARE_API_TOKEN`: Tu token de API de Cloudflare
   - `CLOUDFLARE_ACCOUNT_ID`: El ID de tu cuenta de Cloudflare

2. El workflow en `.github/workflows/deploy.yml` se ejecutará automáticamente en cada push a `main`

### Configuración de Cloudflare

- **wrangler.toml**: Archivo de configuración para Wrangler
- **public/_routes.json**: Configuración de rutas para SPA (Single Page Application)

## Estructura del proyecto

```
src/
├── components/    # Componentes React reutilizables
├── hooks/         # Custom hooks
├── pages/         # Páginas de la aplicación
├── types/         # Tipos TypeScript
└── utils/         # Utilidades
```

## Stack tecnológico

- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Utilidades CSS
- **React Router DOM** - Enrutamiento
- **Lucide React** - Iconos

## License

MIT
