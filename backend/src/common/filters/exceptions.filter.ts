import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpAdapterHost,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";

export type ExceptionType = HttpException | Error;
export type BadRequestResponseType = string | { message: string };

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

        let message;

        if (exception instanceof BadRequestException) {
            const exceptionResponse =
                exception.getResponse() as BadRequestResponseType;

            if (typeof exceptionResponse === "string") {
                message = exceptionResponse;
            } else if (typeof exceptionResponse.message === "string") {
                message = exceptionResponse.message;
            } else {
                message = Array(exceptionResponse.message).join("\n");
            }
        } else if (exception instanceof HttpException) {
            message = exception.message;
        } else {
            this.logger.error(exception.message, "exception");
        }

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message,
        };

        if (process.env.NODE_ENV === "dev") console.log(exception);

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
