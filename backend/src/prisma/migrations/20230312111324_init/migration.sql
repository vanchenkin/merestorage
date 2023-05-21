-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Cassandra', 'Postgres', 'Sage');

-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('Number', 'Object');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "type" "ResourceType" NOT NULL,
    "credentials" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cron" VARCHAR(255),
    "projectId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "type" "MetricType" NOT NULL,
    "query" JSON NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_unique" ON "Project"("name");

-- CreateIndex
CREATE INDEX "resources_project_id_index" ON "Resource"("projectId");

-- CreateIndex
CREATE INDEX "metrics_project_id_index" ON "Metric"("projectId");

-- CreateIndex
CREATE INDEX "metrics_resource_id_index" ON "Metric"("resourceId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "resources_project_id_foreign" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "metrics_project_id_foreign" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "metrics_resource_id_foreign" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
