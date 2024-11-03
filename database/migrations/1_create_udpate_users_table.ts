import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('fullName')
      table.string('email')
      table.string('password')
      table.string('role')
      table.string('dp')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
