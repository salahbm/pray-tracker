/*
  Warnings:

  - The `asr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dhuhr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fajr` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isha` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maghrib` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tahajjud` column on the `Prays` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `date` on the `Prays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Prays_date_key";

-- AlterTable
ALTER TABLE "Prays" DROP COLUMN "asr",
ADD COLUMN     "asr" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dhuhr",
ADD COLUMN     "dhuhr" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "fajr",
ADD COLUMN     "fajr" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "isha",
ADD COLUMN     "isha" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "maghrib",
ADD COLUMN     "maghrib" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "tahajjud",
ADD COLUMN     "tahajjud" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Prays_userId_date_key" ON "Prays"("userId", "date");
