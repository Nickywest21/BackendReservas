import "dotenv/config";
import { z } from "zod";

// Las llaves del proyecto. Si falta una, el server no arranca.
const envSchema = z.object({
  DATABASE_URL: z.url("DATABASE_URL falta o no es una URL válida"),
  DIRECT_URL: z.url("DIRECT_URL falta o no es una URL válida"),
  PORT: z.coerce.number().int().positive().default(3010),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("✕ Configuración inválida. Revisá tu .env:");
  console.error(z.flattenError(parsed.error).fieldErrors);
  process.exit(1); // mejor no arrancar que arrancar a medias
}

export const env = parsed.data;
