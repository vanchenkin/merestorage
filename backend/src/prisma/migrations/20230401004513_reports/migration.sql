-- CreateEnum
CREATE TYPE "ReportRowType" AS ENUM ('Number', 'Chart');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportRow" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "type" "ReportRowType" NOT NULL,
    "query" JSON NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "report_project_id_index" ON "Report"("projectId");

-- CreateIndex
CREATE INDEX "report_row_report_id_index" ON "ReportRow"("reportId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "report_project_id_foreign" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReportRow" ADD CONSTRAINT "report_row_report_id_foreign" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
