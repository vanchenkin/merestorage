import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Project } from "@prisma/client";
import { PrismaService } from "../../common/modules/database/prisma.service";
import { CreateProjectDto } from "./dto/createProject.dto";

@Injectable()
export class ProjectsService {
    private readonly logger = new Logger(ProjectsService.name);

    constructor(private db: PrismaService) {}

    async create(project: CreateProjectDto): Promise<Project> {
        if (
            await this.db.project.findFirst({
                where: {
                    name: project.name,
                },
            })
        ) {
            throw new BadRequestException(
                "Проект с таким именем уже существует"
            );
        }

        const createdProject = await this.db.project.create({ data: project });

        this.logger.log({ name: createdProject.name }, "project created");

        return createdProject;
    }

    async get(id: number): Promise<Project> {
        const project = await this.db.project.findUnique({
            where: {
                id,
            },
        });

        if (!project) {
            throw new NotFoundException("Проект не найден");
        }

        return project;
    }

    async getAll(): Promise<Project[]> {
        return await this.db.project.findMany();
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.db.project.delete({
            where: {
                id,
            },
        });

        this.logger.log({ id }, "project removed");
    }
}
