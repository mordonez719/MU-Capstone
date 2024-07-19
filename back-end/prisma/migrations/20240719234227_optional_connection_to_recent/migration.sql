-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userID_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("user") ON DELETE SET NULL ON UPDATE CASCADE;
