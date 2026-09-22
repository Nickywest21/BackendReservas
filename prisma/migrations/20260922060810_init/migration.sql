-- CreateTable
CREATE TABLE "salas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edificio" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "salas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" SERIAL NOT NULL,
    "salaId" INTEGER NOT NULL,
    "responsable" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reservas_salaId_idx" ON "reservas"("salaId");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
