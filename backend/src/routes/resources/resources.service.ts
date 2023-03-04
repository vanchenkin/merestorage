import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Project, Resource, ResourceType } from "@prisma/client";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { encrypt } from "../../common/utils/encrypt";
import { CreateResourceDto } from "./dto/createResource.dto";
import { ConnectionData } from "./types/resourceTypeConnectionMapper";

@Injectable()
export class ResourcesService {
    private readonly logger = new Logger(ResourcesService.name);

    constructor(private db: PrismaService) {}

    async create(
        project: Project,
        resource: CreateResourceDto
    ): Promise<Resource> {
        const credentials = encrypt(resource.credentials);

        const createdResource = await this.db.resource.create({
            data: {
                project: {
                    connect: { id: project.id },
                },
                ...resource,
                credentials,
            },
        });

        this.logger.log({ name: createdResource.name }, "resource created");

        return createdResource;
    }

    async get(id: number): Promise<Resource> {
        const resource = await this.db.resource.findUnique({ where: { id } });
        if (!resource) {
            throw new NotFoundException("Ресурс не найден");
        }
        return resource;
    }

    async getByProject(project: Project): Promise<Resource[]> {
        return await this.db.resource.findMany({ where: { project } });
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.resource.delete({ where: { id } });
    }

    async check(type: ResourceType, data: ConnectionData): Promise<void> {
        return;
    }
}
