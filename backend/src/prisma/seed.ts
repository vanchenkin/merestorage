import { MetricType, PrismaClient, ResourceType } from "@prisma/client";
import { encrypt } from "../common/utils/encrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    const project = await prisma.project.create({
        data: { name: faker.random.word() },
    });

    const resource = await prisma.resource.create({
        data: {
            name: "Postgres",
            type: ResourceType.Postgres,
            credentials: encrypt({
                url: "postgresql://root:root@127.0.0.1:5432/merestorage",
            }),
            projectId: project.id,
        },
    });

    const metricTableCount = await prisma.metric.create({
        data: {
            name: "tableCount",
            type: MetricType.Number,
            projectId: project.id,
            resourceId: resource.id,
            query: {
                string: "SELECT COUNT(*) FROM information_schema.tables;",
            },
        },
    });

    const metricTables = await prisma.metric.create({
        data: {
            name: "tables",
            type: MetricType.Object,
            projectId: project.id,
            resourceId: resource.id,
            query: {
                string: "SELECT table_name, 1 FROM information_schema.tables;",
            },
        },
    });

    // metric - tablesCount
    for (let i = 0; i < 100; i++) {
        await prisma.metricData.create({
            data: {
                metricId: metricTableCount.id,
                createdAt: faker.date.between(
                    "2022-01-01T00:00:00.000Z",
                    "2022-02-01T00:00:00.000Z"
                ),
                data: +faker.random.numeric(3),
            },
        });
    }

    // metric tables
    const tableNames: string[] = [];
    for (let i = 0; i < 10; i++) {
        tableNames.push(faker.random.word());
    }
    for (let i = 0; i < 100; i++) {
        const obj: Record<string, number> = {};
        tableNames.forEach((tableName) => {
            obj[tableName] = +faker.random.numeric(3);
        });
        await prisma.metricData.create({
            data: {
                metricId: metricTables.id,
                createdAt: faker.date.between(
                    "2022-01-01T00:00:00.000Z",
                    "2022-02-01T00:00:00.000Z"
                ),
                data: obj,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
