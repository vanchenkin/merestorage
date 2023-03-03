import { Knex } from "knex";
import { createdAtColumn } from "../mixins/createdAtColumn";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("resources", function (table) {
        table.increments("id");
        table.string("name", 40).unique().notNullable();
        table.string("description", 255).unique().notNullable();
        table
            .bigInteger("project_id")
            .unsigned()
            .index()
            .references("id")
            .inTable("projects");
        table.enum("type", ["SAGE", "CASSANDRA", "POSTGRES"]).notNullable();
        table.string("credentials", 2057).notNullable();
        createdAtColumn(knex, table);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("resources");
}
