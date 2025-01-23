/*
  Warnings:

  - You are about to drop the `Pray` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date]` on the table `Prays` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Prays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pray" DROP CONSTRAINT "Pray_praysId_fkey";

-- AlterTable
ALTER TABLE "Prays" ADD COLUMN     "asr" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "dhuhr" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajr" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isha" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maghrib" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tahajjud" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Pray";

-- CreateIndex
CREATE UNIQUE INDEX "Prays_date_key" ON "Prays"("date");
