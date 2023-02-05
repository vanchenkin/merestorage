import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BaseModel } from "../../models/base.model";
import { Knex } from "knex";
import { Project } from "../../models/project.model";
import configurations from "../../../config/configurations";

export const getKnexConfig = async (
    config: ConfigService
): Promise<Knex.Config> => {
    return {
        client: "pg",
        connection: {
            ...config.get<Knex.Config>("database"),
        },
    };
};

@Module({
    imports: [
        ObjectionModule.registerAsync({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [configurations],
                    envFilePath: "../../.env",
                }),
            ],
            inject: [ConfigService],
            async useFactory(config: ConfigService) {
                return {
                    Model: BaseModel,
                    config: {
                        ...(await getKnexConfig(config)),
                        ...knexSnakeCaseMappers(),
                    },
                };
            },
        }),
        ObjectionModule.forFeature([Project]),
    ],
    exports: [ObjectionModule],
})
export class DatabaseModule {}
