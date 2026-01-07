-- AlterTable
ALTER TABLE "inquiry" ALTER COLUMN "email" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");
