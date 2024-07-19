/*
  Warnings:

  - Added the required column `difficulty` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "muscle" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;
