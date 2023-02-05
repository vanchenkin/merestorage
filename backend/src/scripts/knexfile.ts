import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
    DatabaseModule,
    getKnexConfig,
} from "../common/modules/database/database.module";

const getConfiguration = async () => {
    const cliApp = await NestFactory.createApplicationContext(DatabaseModule);

    return getKnexConfig(cliApp.get(ConfigService));
};

module.exports = async () => {
    const configuration = await getConfiguration();

    return {
        ...configuration,
    };
};
