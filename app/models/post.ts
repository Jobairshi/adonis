import { BaseModel, beforeCreate, column, hasMany, hasOne } from '@adonisjs/lucid/orm'

import Category from '#models/category'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Reaction from './reaction.js'
import Comment from './comment.js'

export default class Userpost extends BaseModel {
  public serializeExtras = true
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare username: string
  @column()
  declare content: string | null
  @column()
  declare cat_id: number
  @column()
  declare user_id: number

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'user_id',
  })
  declare user: HasOne<typeof User>

  @hasOne(() => Category, {
    foreignKey: 'id',
    localKey: 'cat_id',
  })
  declare category: HasOne<typeof Category>

  @hasMany(() => Reaction, {
    foreignKey: 'post_id',
  })
  declare reactions: HasMany<typeof Reaction>

  @hasMany(() => Comment, {
    foreignKey: 'post_id',
  })
  declare comments: HasMany<typeof Comment>
}
