/*
  Warnings:

  - The `asr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dhuhr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fajr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isha` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maghrib` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tahajjud` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prays" DROP COLUMN "asr",
ADD COLUMN     "asr" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "dhuhr",
ADD COLUMN     "dhuhr" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "fajr",
ADD COLUMN     "fajr" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "isha",
ADD COLUMN     "isha" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "maghrib",
ADD COLUMN     "maghrib" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "tahajjud",
ADD COLUMN     "tahajjud" INTEGER NOT NULL DEFAULT 0;
