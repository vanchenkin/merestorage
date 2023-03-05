-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('Number', 'Object');

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cron" VARCHAR(255),
    "projectId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "type" "MetricType" NOT NULL,
    "query" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "metrics_project_id_index" ON "Metric"("projectId");

-- CreateIndex
CREATE INDEX "metrics_resource_id_index" ON "Metric"("resourceId");

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "metrics_project_id_foreign" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "metrics_resource_id_foreign" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
