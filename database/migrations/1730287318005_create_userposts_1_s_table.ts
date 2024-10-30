import { BaseSchema } from '@adonisjs/lucid/schema'
import { v4 as uuidv4 } from 'uuid'
export default class extends BaseSchema {
  protected tableName = 'userposts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(uuidv4())
      table.string('username')
      table.string('content')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
  private current() {
    return this.schema.raw('CURRENT_TIMESTAMP')
  }
}
