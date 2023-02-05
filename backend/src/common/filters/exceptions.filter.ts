import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpAdapterHost,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";

export type ExceptionType = HttpException | Error;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: ExceptionType, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        this.logger.error(exception.message, "exception");

        if (process.env.NODE_ENV === "dev") console.log(exception);

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
