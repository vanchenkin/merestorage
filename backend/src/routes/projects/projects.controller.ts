import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Project } from "../../common/models/project.model";

@ApiTags("projects")
@Controller("projects")
export class ProjectController {
    constructor(
        @Inject(Project) private readonly projectModel: typeof Project
    ) {}

    @Get("/")
    async getAll(): Promise<Project[]> {
        return this.projectModel.query();
    }
}
