import { Module } from "@nestjs/common";
import { ProjectsService } from "../projects/projects.service";
import { ResourcesController } from "./resources.controller";
import { ResourcesService } from "./resources.service";

@Module({
    controllers: [ResourcesController],
    providers: [ResourcesService, ProjectsService],
})
export class ResourcesModule {}
