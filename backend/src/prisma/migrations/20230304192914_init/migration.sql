-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Cassandra', 'Postgres', 'Sage');

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
    "credentials" VARCHAR(2057) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_unique" ON "Project"("name");

-- CreateIndex
CREATE INDEX "resources_project_id_index" ON "Resource"("projectId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "resources_project_id_foreign" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
