-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prays" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Prays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pray" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fajr" INTEGER NOT NULL DEFAULT 0,
    "dhuhr" INTEGER NOT NULL DEFAULT 0,
    "asr" INTEGER NOT NULL DEFAULT 0,
    "maghrib" INTEGER NOT NULL DEFAULT 0,
    "isha" INTEGER NOT NULL DEFAULT 0,
    "tahajjud" INTEGER NOT NULL DEFAULT 0,
    "praysId" TEXT NOT NULL,

    CONSTRAINT "Pray_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Prays" ADD CONSTRAINT "Prays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pray" ADD CONSTRAINT "Pray_praysId_fkey" FOREIGN KEY ("praysId") REFERENCES "Prays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
