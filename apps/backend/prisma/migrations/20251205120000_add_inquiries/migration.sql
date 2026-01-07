-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "InquirySenderRole" AS ENUM ('USER', 'OWNER');

-- CreateTable
CREATE TABLE "inquiry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiry_message" (
    "id" TEXT NOT NULL,
    "inquiryId" TEXT NOT NULL,
    "senderRole" "InquirySenderRole" NOT NULL,
    "body" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiry_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inquiry_userId_idx" ON "inquiry"("userId");

-- CreateIndex
CREATE INDEX "inquiry_message_inquiryId_idx" ON "inquiry_message"("inquiryId");

-- AddForeignKey
ALTER TABLE "inquiry" ADD CONSTRAINT "inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiry_message" ADD CONSTRAINT "inquiry_message_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "inquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiry_message" ADD CONSTRAINT "inquiry_message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
