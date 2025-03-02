/*
  Warnings:

  - You are about to drop the column `tahajjud` on the `Prays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prays" DROP COLUMN "tahajjud",
ADD COLUMN     "nafl" INTEGER NOT NULL DEFAULT 0;
