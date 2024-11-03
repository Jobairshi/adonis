import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Userpost from './post.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Reaction from './reaction.js'
import Comment from './comment.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string
  @column()
  declare dp: string | null

  // will remove this property when convert this model to json
  // Suppose you have a model with a password field, but you don’t want this field to appear in the JSON response for security reasons
  @column({ serializeAs: null })
  declare password: string

  @column({})
  declare role: string
  @hasMany(() => Userpost)
  declare posts: HasMany<typeof Userpost>

  @hasMany(() => Reaction)
  declare reactions: HasMany<typeof Reaction>
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
