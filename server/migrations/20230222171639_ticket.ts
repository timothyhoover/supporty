import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tickets', table => {
    table.increments('id')
    table.string('description')
    table.string('userName')
    table.string('userEmail')
    table.string('status')
    table.bigint('createdAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tickets')
}
