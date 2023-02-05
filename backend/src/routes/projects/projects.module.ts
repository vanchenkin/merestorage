import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../common/modules/database/database.module";
import { ProjectController } from "./projects.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [ProjectController],
})
export class ProjectModule {}
