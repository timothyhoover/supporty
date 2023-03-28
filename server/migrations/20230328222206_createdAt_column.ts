import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('tickets', table => {
    table.bigint('updatedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('tickets', table => {
    table.dropColumn('updatedAt')
  })
}
