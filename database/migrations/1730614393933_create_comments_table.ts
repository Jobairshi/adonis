import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('post_id').unsigned().notNullable().references('id').inTable('userpost')
      table.string('content').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
