-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "photo" TEXT,
    "locale" TEXT DEFAULT 'en',
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "deviceToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prays" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fajr" INTEGER NOT NULL DEFAULT 0,
    "dhuhr" INTEGER NOT NULL DEFAULT 0,
    "asr" INTEGER NOT NULL DEFAULT 0,
    "maghrib" INTEGER NOT NULL DEFAULT 0,
    "isha" INTEGER NOT NULL DEFAULT 0,
    "nafl" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "scheduledChange" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "status" "FriendStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pro" (
    "id" TEXT NOT NULL,
    "isProVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalPrayers" INTEGER NOT NULL DEFAULT 0,
    "missedPrayers" INTEGER NOT NULL DEFAULT 0,
    "naflCount" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "fajrStreak" INTEGER NOT NULL DEFAULT 0,
    "isTodayStreakBroken" BOOLEAN NOT NULL DEFAULT false,
    "onTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "earlyFajrPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fajrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dhuhrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "asrOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maghribOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ishaOnTimePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fajrStrike10" INTEGER NOT NULL DEFAULT 0,
    "fajrStrike50" INTEGER NOT NULL DEFAULT 0,
    "fajrStrike100" INTEGER NOT NULL DEFAULT 0,
    "fajrStrike150" INTEGER NOT NULL DEFAULT 0,
    "dhuhrStrike10" INTEGER NOT NULL DEFAULT 0,
    "dhuhrStrike50" INTEGER NOT NULL DEFAULT 0,
    "dhuhrStrike100" INTEGER NOT NULL DEFAULT 0,
    "dhuhrStrike150" INTEGER NOT NULL DEFAULT 0,
    "asrStrike10" INTEGER NOT NULL DEFAULT 0,
    "asrStrike50" INTEGER NOT NULL DEFAULT 0,
    "asrStrike100" INTEGER NOT NULL DEFAULT 0,
    "asrStrike150" INTEGER NOT NULL DEFAULT 0,
    "maghribStrike10" INTEGER NOT NULL DEFAULT 0,
    "maghribStrike50" INTEGER NOT NULL DEFAULT 0,
    "maghribStrike100" INTEGER NOT NULL DEFAULT 0,
    "maghribStrike150" INTEGER NOT NULL DEFAULT 0,
    "ishaStrike10" INTEGER NOT NULL DEFAULT 0,
    "ishaStrike50" INTEGER NOT NULL DEFAULT 0,
    "ishaStrike100" INTEGER NOT NULL DEFAULT 0,
    "ishaStrike150" INTEGER NOT NULL DEFAULT 0,
    "naflStrike10" INTEGER NOT NULL DEFAULT 0,
    "naflStrike50" INTEGER NOT NULL DEFAULT 0,
    "naflStrike100" INTEGER NOT NULL DEFAULT 0,
    "naflStrike150" INTEGER NOT NULL DEFAULT 0,
    "consistencyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastActiveDay" TIMESTAMP(3),
    "lastFajrTime" TIMESTAMP(3),
    "lastNaflDate" TIMESTAMP(3),
    "missedPrayerStreak" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseId_key" ON "User"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Prays_userId_date_key" ON "Prays"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerId_key" ON "Customer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriptionId_key" ON "Subscription"("subscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_customerId_idx" ON "Subscription"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_friendId_key" ON "Friend"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "Award_userId_title_key" ON "Award"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "PrayerStats_userId_key" ON "PrayerStats"("userId");

-- AddForeignKey
ALTER TABLE "Prays" ADD CONSTRAINT "Prays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrayerStats" ADD CONSTRAINT "PrayerStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
