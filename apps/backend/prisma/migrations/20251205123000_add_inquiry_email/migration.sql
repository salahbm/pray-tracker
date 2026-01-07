-- AlterTable
ALTER TABLE "inquiry" ALTER COLUMN "userId" DROP NOT NULL;

-- Add email column
ALTER TABLE "inquiry" ADD COLUMN "email" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "inquiry_email_idx" ON "inquiry"("email");
