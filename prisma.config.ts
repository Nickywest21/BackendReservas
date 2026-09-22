import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  // El CLI (migraciones, db pull) usa la conexión directa de Supabase,
  // no el pooler de transacciones. El runtime usa DATABASE_URL.
  datasource: {
    url: env("DIRECT_URL"),
  },
});