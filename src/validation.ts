import { z } from "zod";

// El contrato: qué cuenta como dato válido. Una sola fuente de verdad.

const cuerpoInvalido = { error: "el cuerpo debe ser un objeto JSON" };

export const HORARIOS_DISPONIBLES = ["08:00 - 10:00", "11:00 - 13:00", "15:00 - 17:00"];

function hoyLocalIso(): string {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

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
      people: z
        .number()
        .int("las personas deben ser un número entero")
        .positive("la cantidad de personas debe ser mayor a 0")
        .max(500, "esa cantidad no es realista"),
      email: z
        .string()
        .trim()
        .email("correo inválido")
        .max(120, "el correo es muy largo"),
      phone: z
        .string()
        .trim()
        .regex(/^\d{8}$/, "el teléfono debe tener 8 dígitos"),
      fecha: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "fecha inválida (usa AAAA-MM-DD)"),
      horario: z.enum(HORARIOS_DISPONIBLES, "horario no disponible"),
    },
    cuerpoInvalido,
  )
  .refine((r) => r.fecha >= hoyLocalIso(), {
    error: "no podés reservar en el pasado",
    path: ["fecha"],
  });

// Para los :id que vienen en la URL (siempre llegan como texto)
export const idSchema = z.coerce.number().int().positive();
