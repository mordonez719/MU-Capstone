-- AlterTable
ALTER TABLE "User" ALTER COLUMN "difficulties" SET DEFAULT ARRAY['Any']::TEXT[],
ALTER COLUMN "exSearches" SET DEFAULT ARRAY['Any']::TEXT[],
ALTER COLUMN "exTypes" SET DEFAULT ARRAY['Any']::TEXT[],
ALTER COLUMN "muscles" SET DEFAULT ARRAY['Any']::TEXT[];
