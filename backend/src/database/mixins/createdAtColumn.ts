import { Knex } from "knex";

export const createdAtColumn = (knex: Knex, table: Knex.CreateTableBuilder) => {
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
};
