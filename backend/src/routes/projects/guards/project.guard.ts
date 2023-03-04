import {
    CanActivate,
    ExecutionContext,
    Injectable,
    mixin,
    PipeTransform,
} from "@nestjs/common";
import { ProjectsService } from "../projects.service";

export const RetrieveProjectGuard = (
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
    class RetrieveProjectGuard implements CanActivate {
        constructor(private projectService: ProjectsService) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const projectId = await transform(request.params[paramKey]);
            const project = await this.projectService.get(projectId);
            request.project = project;
            return true;
        }
    }

    const guard = mixin(RetrieveProjectGuard);
    return guard;
};
