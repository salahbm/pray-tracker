/*
  Warnings:

  - You are about to drop the column `daysWithAllPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `duhaCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `eidPrayersCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `jamaatCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `jumuahCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `masjidVisits` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `ramadanPerfectDays` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `ramadanPrayerCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `sunnahPrayers` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the column `tahajjudCount` on the `PrayerStats` table. All the data in the column will be lost.
  - You are about to drop the `Dhikr` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuranReading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SunnahPrays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCommunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dhikr" DROP CONSTRAINT "Dhikr_awardId_fkey";

-- DropForeignKey
ALTER TABLE "QuranReading" DROP CONSTRAINT "QuranReading_awardId_fkey";

-- DropForeignKey
ALTER TABLE "SunnahPrays" DROP CONSTRAINT "SunnahPrays_awardId_fkey";

-- DropForeignKey
ALTER TABLE "UserCommunity" DROP CONSTRAINT "UserCommunity_awardId_fkey";

-- AlterTable
ALTER TABLE "PrayerStats" DROP COLUMN "daysWithAllPrayers",
DROP COLUMN "duhaCount",
DROP COLUMN "eidPrayersCount",
DROP COLUMN "jamaatCount",
DROP COLUMN "jumuahCount",
DROP COLUMN "masjidVisits",
DROP COLUMN "ramadanPerfectDays",
DROP COLUMN "ramadanPrayerCount",
DROP COLUMN "sunnahPrayers",
DROP COLUMN "tahajjudCount",
ADD COLUMN     "asrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "asrStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "asrStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "asrStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "asrStrike50" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "badgesUnlocked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "consistencyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "dhuhrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "dhuhrStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dhuhrStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dhuhrStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dhuhrStrike50" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fajrStrike50" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isTodayStreakBroken" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ishaOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ishaStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ishaStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ishaStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ishaStrike50" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActiveDay" TIMESTAMP(3),
ADD COLUMN     "lastFajrTime" TIMESTAMP(3),
ADD COLUMN     "lastTahajjudDate" TIMESTAMP(3),
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "maghribOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "maghribStrike10" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maghribStrike100" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maghribStrike150" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maghribStrike50" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "missedPrayerStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "missedPrayers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "naflCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "qadhaPrayers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "voluntaryPrayers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xpPoints" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Dhikr";

-- DropTable
DROP TABLE "QuranReading";

-- DropTable
DROP TABLE "SunnahPrays";

-- DropTable
DROP TABLE "UserCommunity";
