/*
  Warnings:

  - You are about to drop the column `lastTahajjudDate` on the `PrayerStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrayerStats" DROP COLUMN "lastTahajjudDate",
ADD COLUMN     "lastNaflDate" TIMESTAMP(3),
ADD COLUMN     "totalXP" INTEGER NOT NULL DEFAULT 0;
