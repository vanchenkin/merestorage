import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RetrievedProject = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.project;
    }
);
