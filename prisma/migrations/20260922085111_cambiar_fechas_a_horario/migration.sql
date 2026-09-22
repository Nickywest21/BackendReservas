/*
  Warnings:

  - You are about to drop the column `fin` on the `reservas` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `reservas` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservas" DROP COLUMN "fin",
DROP COLUMN "inicio",
ADD COLUMN     "fecha" TEXT NOT NULL,
ADD COLUMN     "horario" TEXT NOT NULL;
