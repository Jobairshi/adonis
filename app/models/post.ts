import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import { v4 as uuidv4 } from 'uuid'
import Category from '#models/category'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Userpost extends BaseModel {
  @column({ isPrimary: true })
  declare id: string
  @beforeCreate()
  static assignUuid(post: Userpost) {
    post.id = uuidv4()
  }
  @column()
  declare username: string
  @column()
  declare content: string | null
  @column()
  declare cat_id: number
  @hasOne(() => Category, {
    foreignKey: 'id',
    localKey: 'cat_id',
  })
  declare category: HasOne<typeof Category>
}
