import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "./prisma.js";
import { crearSalaSchema, crearReservaSchema, idSchema } from "./validation.js";

// Respuesta única para todo lo que no pasa la puerta.
function invalido(res: Response, error: z.ZodError, mensaje = "datos inválidos") {
  const { formErrors, fieldErrors } = z.flattenError(error);
  return res.status(400).json({
    error: mensaje,
    detalles: fieldErrors, // por campo: el frontend y Postman dependen de este nombre
    generales: formErrors, // errores que no son de un campo (ej.: body vacío o que no es un objeto)
  });
}

// GET /api/salas — trae cada sala con sus reservas
export async function listarSalas(_req: Request, res: Response) {
  const salas = await prisma.sala.findMany({
    include: { reservas: true },
    orderBy: { id: "asc" },
    take: 100,
  });
  res.json(salas);
}

// POST /api/salas
export async function crearSala(req: Request, res: Response) {
  const parsed = crearSalaSchema.safeParse(req.body); // A · validar
  if (!parsed.success) return invalido(res, parsed.error);

  const sala = await prisma.sala.create({ data: parsed.data }); // B · ya viene limpio
  res.status(201).json(sala); // C · responder
}

// POST /api/salas/:id/reservas
export async function crearReserva(req: Request, res: Response) {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) return invalido(res, id.error, "id de sala inválido");

  const parsed = crearReservaSchema.safeParse(req.body);
  if (!parsed.success) return invalido(res, parsed.error);

  const sala = await prisma.sala.findUnique({ where: { id: id.data } });
  if (!sala) return res.status(404).json({ error: "sala no encontrada" });

  const reserva = await prisma.reserva.create({
    data: { ...parsed.data, salaId: id.data },
  });
  res.status(201).json(reserva);
}

// DELETE /api/salas/:id
export async function borrarSala(req: Request, res: Response) {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) return invalido(res, id.error, "id de sala inválido");

  try {
    await prisma.sala.delete({ where: { id: id.data } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "sala no encontrada" });
  }
}
