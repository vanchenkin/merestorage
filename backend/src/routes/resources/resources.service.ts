import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Project } from "../../common/models/project.model";
import { Resource } from "../../common/models/resource.model";
import { CreateResourceDto } from "./dto/createResource.dto";

@Injectable()
export class ResourcesService {
    private readonly logger = new Logger(ResourcesService.name);

    constructor(
        @Inject(Resource) private readonly resourceModel: typeof Resource
    ) {}

    async create(
        project: Project,
        resource: CreateResourceDto
    ): Promise<Resource> {
        const createdResource = await project
            .$relatedQuery<Resource>("resources")
            .insert(resource);

        this.logger.log({ name: createdResource.name }, "resource created");

        return createdResource;
    }

    async get(id: number): Promise<Resource> {
        const resource = await this.resourceModel.query().findById(id);
        if (!resource) {
            throw new NotFoundException("Ресурс не найден");
        }
        return resource;
    }

    async getByProject(project: Project): Promise<Resource[]> {
        return await project.$relatedQuery<Resource>("resources");
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.resourceModel.query().deleteById(id);
    }
}
