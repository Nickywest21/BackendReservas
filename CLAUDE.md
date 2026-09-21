# Reglas del proyecto — Reserva de Labs

Reglas que cualquiera (persona o IA) debe respetar al tocar este repo.

## Entrada

- El servidor no confía en lo que llega. Todo `POST` y todo `:id` pasa por `safeParse`
  antes de tocar Prisma.
- Si no valida: `400` con `{ error, detalles }`. Nunca se llama a la base con datos sin validar.
- La validación del cliente es para la experiencia de usuario, no es una barrera. No sustituye a la del servidor.
- Los schemas viven en `src/validation.ts`. Si una regla cambia, cambia ahí y también en el schema del frontend.

## Secretos

- Las credenciales van en `.env`, nunca escritas dentro del código.
- El `.env` no se sube. El `.env.example` sí, con los nombres y sin los valores.
- La config se valida al arrancar en `src/env.ts`. Si falta una variable, el server no arranca.

## Si se filtra una clave

1. Rotar la contraseña en Supabase (Settings → Database) antes que nada.
2. Actualizar el `.env` local de cada quien.
3. Recién ahí `git rm --cached .env` y commit. Borrar el archivo no basta: Git guarda el historial.

## Versiones

- Zod 4: se usa `z.flattenError(error)` y `z.url()`, no `error.flatten()` ni `z.string().url()`.
