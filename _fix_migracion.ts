import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({ connectionString: process.env.DIRECT_URL });

await client.connect();

await client.query(
  `DELETE FROM "_prisma_migrations" WHERE migration_name = '20260922074549_agregar_datos_contacto_reserva'`
);

await client.end();

console.log("registro de migración reemplazado");