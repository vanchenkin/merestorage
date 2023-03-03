import {
    CanActivate,
    ExecutionContext,
    Injectable,
    mixin,
} from "@nestjs/common";
import { ProjectsService } from "../projects.service";

export const RetrieveProjectGuard = (paramKey: string) => {
    @Injectable()
    class RetrieveProjectGuard implements CanActivate {
        constructor(private projectService: ProjectsService) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const projectId = request.params[paramKey];
            const project = await this.projectService.get(projectId);
            request.project = project;
            return true;
        }
    }

    const guard = mixin(RetrieveProjectGuard);
    return guard;
};
