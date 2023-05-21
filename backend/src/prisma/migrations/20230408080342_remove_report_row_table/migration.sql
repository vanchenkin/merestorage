/*
  Warnings:

  - You are about to drop the `ReportRow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rows` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportRow" DROP CONSTRAINT "report_row_report_id_foreign";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "rows" JSON NOT NULL;

-- DropTable
DROP TABLE "ReportRow";

-- DropEnum
DROP TYPE "ReportRowType";
