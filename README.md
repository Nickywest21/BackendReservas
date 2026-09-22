# Reserva de Labs — Backend

API REST para administrar **salas de laboratorio** y sus **reservas**. Construida con Express y TypeScript, valida todo lo que entra con Zod y persiste los datos en PostgreSQL (Supabase) a través de Prisma.

> Proyecto 1 · Programación Web · Universidad Rafael Landívar

## Stack

- **Node.js** + **TypeScript** (ejecutado con [`tsx`](https://github.com/privatenumber/tsx))
- **Express 5**
- **Prisma 7** (con [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql))
- **Zod 4** — validación de entrada y de variables de entorno
- **PostgreSQL** (Supabase)
- **cors**, **dotenv**

## Modelo de datos

Relación **1—N** entre `Sala` y `Reserva`:

```prisma
model Sala {
  id        Int       @id @default(autoincrement())
  nombre    String
  edificio  String
  capacidad Int
  reservas  Reserva[]
}

model Reserva {
  id          Int      @id @default(autoincrement())
  salaId      Int
  responsable String
  motivo      String
  people      Int
  email       String
  phone       String
  fecha       String
  horario     String
  sala        Sala     @relation(fields: [salaId], references: [id], onDelete: Cascade)
}
```

Borrar una sala borra en cascada sus reservas (`onDelete: Cascade`).

## Endpoints

| Método | Ruta                          | Descripción                                             |
|--------|-------------------------------|----------------------------------------------------------|
| GET    | `/api/salas`                  | Lista las salas (hasta 100) con sus reservas incluidas    |
| POST   | `/api/salas`                  | Crea una sala (`nombre`, `edificio`, `capacidad`)         |
| POST   | `/api/salas/:id/reservas`     | Crea una reserva para la sala `:id`                       |
| DELETE | `/api/salas/:id`              | Elimina una sala (y sus reservas)                         |

### Validación

Cada `POST` pasa primero por un schema de Zod (`src/validation.ts`) antes de tocar la base de datos:

- **`crearSalaSchema`**: `nombre` (2–80), `edificio` (1–60), `capacidad` (entero, 1–500).
- **`crearReservaSchema`**: `responsable`, `motivo`, `people` (entero positivo), `email`, `phone` (8 dígitos), `fecha` (`AAAA-MM-DD`, no puede ser pasada) y `horario` (uno de los horarios disponibles). Además, `crearReserva` rechaza la solicitud si `people` supera la `capacidad` de la sala.
- Los `:id` de la URL se validan como enteros positivos con `idSchema`.

Cuando algo no pasa la validación, la API responde `400` con este formato:

```json
{
  "error": "datos inválidos",
  "detalles": { "campo": ["mensaje de error"] },
  "generales": []
}
```

## Variables de entorno

Se validan al arrancar (`src/env.ts`); si falta alguna, el servidor no levanta.

```dotenv
# Conexión por el pooler (puerto 6543) — la que usa la app
DATABASE_URL=""

# Conexión directa (puerto 5432) — la que usan las migraciones
DIRECT_URL=""

PORT=3010
```

Copiá `.env.example` como `.env` y completá los valores reales de tu proyecto de Supabase.

## Cómo correrlo

```bash
npm install
npx prisma migrate dev   # crea/actualiza las tablas en Supabase
npm run dev               # levanta la API en http://localhost:3010
```

## Estructura

```
├── prisma/
│   └── schema.prisma
├── src/
│   ├── env.ts               # valida las variables de entorno
│   ├── prisma.ts            # cliente de Prisma con adapter-pg
│   ├── salas.controller.ts  # controladores del CRUD
│   ├── server.ts            # rutas y arranque del servidor
│   └── validation.ts        # schemas de Zod
├── .env.example
└── package.json
```