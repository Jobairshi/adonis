import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'userposts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category'),
        table
          .integer('cat_id')
          .unsigned()
          .references('categories.id')
          .onDelete('CASECADE')
          .defaultTo('1')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
