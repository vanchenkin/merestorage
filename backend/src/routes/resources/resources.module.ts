import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/modules/database/database.module";
import { ProjectsService } from "../projects/projects.service";
import { ResourcesController } from "./resources.controller";
import { ResourcesService } from "./resources.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ResourcesController],
    providers: [ResourcesService, ProjectsService],
})
export class ResourcesModule {}
