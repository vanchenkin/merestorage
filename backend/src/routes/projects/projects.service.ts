import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Project } from "../../common/models/project.model";
import { CreateProjectDto } from "./dto/createProject.dto";

@Injectable()
export class ProjectsService {
    private readonly logger = new Logger(ProjectsService.name);

    constructor(
        @Inject(Project) private readonly projectModel: typeof Project
    ) {}

    async create(project: CreateProjectDto): Promise<Project> {
        if (
            await this.projectModel.query().where("name", project.name).first()
        ) {
            throw new BadRequestException(
                "Проект с таким именем уже существует"
            );
        }

        const createdProject = await this.projectModel.query().insert(project);

        this.logger.log({ name: createdProject.name }, "project created");

        return createdProject;
    }

    async get(id: number): Promise<Project> {
        const project = await this.projectModel.query().findById(id);
        if (!project) {
            throw new NotFoundException("Проект не найден");
        }
        return project;
    }

    async getAll(): Promise<Project[]> {
        return await this.projectModel.query();
    }

    async remove(id: number): Promise<void> {
        await this.get(id);
        await this.projectModel.query().deleteById(id);
    }
}
