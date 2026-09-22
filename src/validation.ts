import { z } from "zod";

// El contrato: qué cuenta como dato válido. Una sola fuente de verdad.

const cuerpoInvalido = { error: "el cuerpo debe ser un objeto JSON" };

export const crearSalaSchema = z.object(
  {
    nombre: z.string().trim().min(2, "el nombre es muy corto").max(80),
    edificio: z.string().trim().min(1, "el edificio es obligatorio").max(60),
    capacidad: z
      .number()
      .int("la capacidad debe ser un número entero")
      .positive("la capacidad debe ser mayor a 0")
      .max(500, "esa capacidad no es realista"),
  },
  cuerpoInvalido,
);

export const crearReservaSchema = z
  .object(
    {
      responsable: z.string().trim().min(3, "¿quién reserva?").max(80),
      motivo: z.string().trim().min(3, "contá para qué").max(200),
      inicio: z.coerce.date(), // acepta texto ISO y lo pasa a fecha
      fin: z.coerce.date(),
    },
    cuerpoInvalido,
  )
  .refine((r) => r.fin > r.inicio, {
    error: "el fin debe ser después del inicio",
    path: ["fin"],
  })
  .refine((r) => r.inicio > new Date(), {
    error: "no podés reservar en el pasado",
    path: ["inicio"],
  });

// Para los :id que vienen en la URL (siempre llegan como texto)
export const idSchema = z.coerce.number().int().positive();
