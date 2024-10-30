import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

import { v4 as uuidv4 } from 'uuid'

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
}
