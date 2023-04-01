-- CreateTable
CREATE TABLE "MetricData" (
    "id" SERIAL NOT NULL,
    "metricId" INTEGER NOT NULL,
    "data" JSON NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "metric_data_metric_id_index" ON "MetricData"("metricId");

-- AddForeignKey
ALTER TABLE "MetricData" ADD CONSTRAINT "metric_data_metric_id_foreign" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
