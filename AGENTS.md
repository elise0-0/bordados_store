# Bordados Tienda — Contexto del Proyecto

## Qué es
Tienda online de bordados (anime, películas, música) en playeras y sudaderas.
Catálogo público, compra requiere cuenta.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express (ES Modules, no CommonJS)
- ORM: Prisma 7 (schema en `server/prisma/schema.prisma`)
- DB: PostgreSQL en Docker local → Supabase en producción
- Auth: JWT propio (bcrypt + jsonwebtoken), no Supabase Auth todavía

## Estructura
- `client/` — React por features (pages, components, context, hooks)
- `server/src/modules/<nombre>/` — cada dominio agrupa su controller, service,
  routes y validation (Zod). Ej: `modules/auth/auth.controller.js`
- `server/src/middlewares/` — auth, error handler, validación
- `server/src/utils/` — ApiError, asyncHandler, logger

## Convenciones de código
- Los controllers SOLO manejan req/res, nunca lógica de negocio
- Toda la lógica de negocio vive en services/
- Todo controller se envuelve en `asyncHandler` (nunca try/catch repetido)
- Los errores se lanzan con `ApiError` y los captura `error.middleware.js`
- Validación de inputs con Zod, en `<modulo>.validation.js`
- Nombres de archivo en camelCase, componentes React en PascalCase

## Seguridad (no negociable)
- Nunca contraseñas en texto plano — bcrypt siempre
- Nunca secretos hardcodeados — todo vía `.env`
- Rutas de checkout/carrito/orders requieren JWT válido (middleware `auth.middleware.js`)
- Validar TODO input de usuario antes de tocar la base de datos

## Estado actual del proyecto
- [x] Estructura de carpetas (monorepo client/server)
- [x] Docker + Postgres 16 corriendo local
- [x] Schema de Prisma completo (User, Product, ProductVariant, Cart, Order, etc.)
- [x] Migración inicial aplicada
- [x] Seed script con datos de prueba
- [ ] Módulo de auth (registro/login/JWT) ← estamos aquí
- [ ] Módulo de products (catálogo público)
- [ ] Módulo de cart
- [ ] Módulo de orders
- [ ] Frontend conectado a la API

## Para agentes: reglas de trabajo
- No cambies la estructura de carpetas sin preguntar
- No agregues dependencias nuevas sin justificar por qué
- Sigue el patrón controller → service → prisma que ya existe en cualquier módulo terminado como referencia