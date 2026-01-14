/*
  Warnings:

  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- DropTable
DROP TABLE "subscription";

-- DropEnum
DROP TYPE "SubscriptionPlan";

-- DropEnum
DROP TYPE "SubscriptionStatus";

-- CreateTable
CREATE TABLE "onboarding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prayerKnowledge" TEXT,
    "supportNeeded" TEXT,
    "learnIslam" TEXT,
    "whyHere" JSONB,
    "whereDidYouHearAboutUs" TEXT,
    "locationPermissionGranted" BOOLEAN NOT NULL DEFAULT false,
    "locationCity" TEXT,
    "locationTimezone" TEXT,
    "notificationPermissionGranted" BOOLEAN NOT NULL DEFAULT false,
    "notificationPreset" TEXT,
    "enabledModules" JSONB,
    "defaultHomeTab" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_userId_key" ON "onboarding"("userId");

-- CreateIndex
CREATE INDEX "onboarding_userId_idx" ON "onboarding"("userId");

-- AddForeignKey
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
