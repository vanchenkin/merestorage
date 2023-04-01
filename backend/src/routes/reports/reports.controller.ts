import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Project, Report } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { CreateReportDto } from "./dto/createReport.dto";
import { ReportIdDto } from "./dto/reportId.dto";
import { ReportsService } from "./reports.service";

@ApiTags("reports")
@Controller()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    /**
     * Получить все отчеты проекта
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Get("projects/:id/reports")
    async getAll(
        @Param("id") id: number,
        @RetrievedProject() project: Project
    ): Promise<Report[]> {
        return this.reportsService.getByProject(project);
    }

    /**
     * Получить отчет по id
     */
    @Get("reports/:id")
    @ApiNotFoundResponse({
        description: "Отчет не найден",
    })
    async get(@Param("id", ParseIntPipe) id: number): Promise<Report> {
        return this.reportsService.get(id);
    }

    /**
     * Создать отчет
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Post("projects/:id/reports")
    create(
        @Param("id") id: number,
        @Body() report: CreateReportDto,
        @RetrievedProject() project: Project
    ): Promise<Report> {
        return this.reportsService.create(project, report);
    }

    /**
     * Удалить отчет
     */
    @Delete("reports")
    @ApiNotFoundResponse({
        description: "Отчет не найден",
    })
    remove(@Body() { id }: ReportIdDto): Promise<void> {
        return this.reportsService.remove(id);
    }
}
