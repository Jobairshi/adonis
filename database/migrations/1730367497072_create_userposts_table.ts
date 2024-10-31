import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('userposts', (table) => {
      table.string('category').defaultTo('funny')
    })
  }
}
