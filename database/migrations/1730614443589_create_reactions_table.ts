import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('post_id').unsigned().notNullable().references('id').inTable('userpost')
      table.enu('reaction', ['like', 'love', 'angry']).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
