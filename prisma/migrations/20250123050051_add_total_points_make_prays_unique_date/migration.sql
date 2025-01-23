/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Pray` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,praysId]` on the table `Pray` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Prays_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Pray_date_key" ON "Pray"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Pray_date_praysId_key" ON "Pray"("date", "praysId");
