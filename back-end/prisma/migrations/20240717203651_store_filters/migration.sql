-- AlterTable
ALTER TABLE "User" ADD COLUMN     "caloricRange" INTEGER[] DEFAULT ARRAY[0, 3500]::INTEGER[],
ADD COLUMN     "diets" TEXT[],
ADD COLUMN     "difficulties" TEXT[],
ADD COLUMN     "dishTypes" TEXT[],
ADD COLUMN     "exTypes" TEXT[],
ADD COLUMN     "healths" TEXT[],
ADD COLUMN     "muscles" TEXT[];
