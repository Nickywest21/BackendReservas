/*
  Warnings:

  - Added the required column `email` to the `reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
