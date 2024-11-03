import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'userposts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username')
      table.string('content')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('cat_id').unsigned().references('categories.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
