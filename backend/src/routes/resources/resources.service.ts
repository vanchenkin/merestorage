import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Project, Resource } from "@prisma/client";
import { ResourceType } from "../../../../common/types/ResourceType";
import { ResourceInterface } from "../../common/classes/resources/types/ResourceInterface";
import {
    ConnectionData,
    ResourceTypeClassMapper,
} from "../../common/classes/resources/types/resourceMapper";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { decrypt } from "../../common/utils/decrypt";
import { encrypt } from "../../common/utils/encrypt";
import { CreateResourceDto } from "./dto/createResource.dto";

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

        this.logger.log({ id }, "resource removed");
    }

    async checkByCredentials(
        type: ResourceType,
        credentials: ConnectionData
    ): Promise<string> {
        const resource = this.createResourceClass(type, credentials);

        try {
            await resource.checkConnection();
            return JSON.stringify("OK");
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    createResourceClassFromModel(resource: Resource): ResourceInterface {
        return this.createResourceClass(
            resource.type,
            decrypt(resource.credentials)
        );
    }

    createResourceClass(
        type: ResourceType,
        credentials: ConnectionData
    ): ResourceInterface {
        return new ResourceTypeClassMapper[type](credentials);
    }
}
