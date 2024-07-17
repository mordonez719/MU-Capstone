/*
  Warnings:

  - You are about to drop the column `caloricRange` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "caloricRange",
ADD COLUMN     "caloricMax" INTEGER[],
ADD COLUMN     "caloricMin" INTEGER[];
