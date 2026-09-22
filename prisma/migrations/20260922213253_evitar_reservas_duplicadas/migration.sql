/*
  Warnings:

  - A unique constraint covering the columns `[salaId,fecha,horario]` on the table `reservas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reservas_salaId_fecha_horario_key" ON "reservas"("salaId", "fecha", "horario");
