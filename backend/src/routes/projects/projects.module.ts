import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/modules/database/database.module";
import { ProjectController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ProjectController],
    providers: [ProjectsService],
})
export class ProjectModule {}
