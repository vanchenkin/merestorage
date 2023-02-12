import { Knex } from "knex";
import { createdAtColumn } from "../mixins/createdAtColumn";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("projects", function (table) {
        table.increments("id");
        table.string("name", 255).unique().notNullable();
        createdAtColumn(knex, table);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("projects");
}
