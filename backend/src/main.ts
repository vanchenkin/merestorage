import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/exceptions.filter";

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        bufferLogs: true,
    });

    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

    app.useLogger(app.get(Logger));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );

    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
        .setTitle("merestorage")
        .setDescription("API description")
        .setVersion("1.0")
        .addTag("methods")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/swagger", app, document);

    await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
};

bootstrap();
