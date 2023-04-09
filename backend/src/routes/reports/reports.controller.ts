import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Project, Report } from "@prisma/client";
import { RetrievedProject } from "../projects/decorators/project.decorator";
import { RetrieveProjectGuard } from "../projects/guards/project.guard";
import { QueryDto } from "./dto/query.dto";
import { ReportIdDto } from "./dto/reportId.dto";
import { UpsertReportDto } from "./dto/upsertReport.dto";
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
     * Изменить или создать отчет
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Put("projects/:id/reports")
    async upsert(
        @Param("id") id: number,
        @Body() report: UpsertReportDto,
        @RetrievedProject() project: Project
    ): Promise<Report> {
        return this.reportsService.upsert(project, report);
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

    /**
     * Запрос на данные
     */
    @UseGuards(RetrieveProjectGuard("id", new ParseIntPipe()))
    @Post("projects/:id/query")
    async query(
        @Param("id") id: number,
        @Body() query: QueryDto,
        @RetrievedProject() project: Project
    ): Promise<any> {
        return this.reportsService.query(project, query);
    }
}
