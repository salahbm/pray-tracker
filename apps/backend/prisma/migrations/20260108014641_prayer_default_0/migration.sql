/*
  Warnings:

  - Made the column `fajr` on table `prayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dhuhr` on table `prayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `asr` on table `prayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maghrib` on table `prayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isha` on table `prayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nafl` on table `prayer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "prayer" ALTER COLUMN "fajr" SET NOT NULL,
ALTER COLUMN "fajr" SET DEFAULT 0,
ALTER COLUMN "dhuhr" SET NOT NULL,
ALTER COLUMN "dhuhr" SET DEFAULT 0,
ALTER COLUMN "asr" SET NOT NULL,
ALTER COLUMN "asr" SET DEFAULT 0,
ALTER COLUMN "maghrib" SET NOT NULL,
ALTER COLUMN "maghrib" SET DEFAULT 0,
ALTER COLUMN "isha" SET NOT NULL,
ALTER COLUMN "isha" SET DEFAULT 0,
ALTER COLUMN "nafl" SET NOT NULL,
ALTER COLUMN "nafl" SET DEFAULT 0;
