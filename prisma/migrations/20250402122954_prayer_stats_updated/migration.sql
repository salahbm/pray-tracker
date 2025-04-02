/*
  Warnings:

  - You are about to drop the column `badgesUnlocked` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `lastTenNightsPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `qadhaPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `voluntaryPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `xpPoints` on the `PrayerStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrayerStats" DROP COLUMN "badgesUnlocked",
DROP COLUMN "lastTenNightsPrayers",
DROP COLUMN "qadhaPrayers",
DROP COLUMN "voluntaryPrayers",
DROP COLUMN "xpPoints",
ADD COLUMN     "naflStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "naflStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "naflStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "naflStrike50" INTEGER NOT NULL DEFAULT 0;
