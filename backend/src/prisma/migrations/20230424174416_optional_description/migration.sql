-- AlterTable
ALTER TABLE "Metric" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "description" DROP NOT NULL;
