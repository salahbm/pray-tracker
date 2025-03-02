/*
  Warnings:

  - You are about to drop the column `achievedAt` on the `Award` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Award` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Award` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Award" DROP COLUMN "achievedAt",
DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "PrayerStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalPrayers" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "daysWithAllPrayers" INTEGER NOT NULL DEFAULT 0,
    "onTimePrayers" INTEGER NOT NULL DEFAULT 0,
    "jamaatPrayers" INTEGER NOT NULL DEFAULT 0,
    "sunnahPrayers" INTEGER NOT NULL DEFAULT 0,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SunnahPrays" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prayedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SunnahPrays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dhikr" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dhikr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuranReading" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuranReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCommunity" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "menteeCount" INTEGER NOT NULL DEFAULT 0,
    "circleMembers" INTEGER NOT NULL DEFAULT 0,
    "learningSessions" INTEGER NOT NULL DEFAULT 0,
    "helpedUsers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCommunity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrayerStats_userId_key" ON "PrayerStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCommunity_awardId_key" ON "UserCommunity"("awardId");

-- AddForeignKey
ALTER TABLE "PrayerStats" ADD CONSTRAINT "PrayerStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SunnahPrays" ADD CONSTRAINT "SunnahPrays_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dhikr" ADD CONSTRAINT "Dhikr_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuranReading" ADD CONSTRAINT "QuranReading_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunity" ADD CONSTRAINT "UserCommunity_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;
