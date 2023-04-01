import {
    CanActivate,
    ExecutionContext,
    Injectable,
    mixin,
    PipeTransform,
} from "@nestjs/common";
import { ReportsService } from "../reports.service";

export const RetrieveReportGuard = (
    paramKey: string,
    ...pipes: PipeTransform[]
) => {
    const transform = async (value: any) => {
        return await pipes.reduce(async (prev, pipe) => {
            return await pipe.transform(prev, {
                type: "query",
            });
        }, value);
    };

    @Injectable()
    class RetrieveReportGuard implements CanActivate {
        constructor(private reportsService: ReportsService) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const reportId = await transform(request.params[paramKey]);
            const report = await this.reportsService.get(reportId);
            request.report = report;
            return true;
        }
    }

    const guard = mixin(RetrieveReportGuard);
    return guard;
};
