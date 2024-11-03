import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Userpost from './post.js'

export default class Comment extends BaseModel {
  public serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare post_id: number

  @column()
  declare content: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Userpost, {
    foreignKey: 'post_id',
    localKey: 'id',
  })
  declare post: BelongsTo<typeof Userpost>
}
