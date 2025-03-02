/*
  Warnings:

  - You are about to drop the column `jamaatPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `onTimePrayers` on the `PrayerStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrayerStats" DROP COLUMN "jamaatPrayers",
DROP COLUMN "onTimePrayers",
ADD COLUMN     "duhaCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "earlyFajrPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "eidPrayersCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "jamaatCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "jumuahCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastTenNightsPrayers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "masjidVisits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "onTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ramadanPerfectDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ramadanPrayerCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tahajjudCount" INTEGER NOT NULL DEFAULT 0;
