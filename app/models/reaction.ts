import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Userpost from './post.js'

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  ANGRY = 'angry',
}

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare post_id: number

  @column()
  declare reaction: ReactionType

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Userpost, {
    foreignKey: 'id',
    localKey: 'post_id',
  })
  declare post: BelongsTo<typeof Userpost>
}
