import { ReactionType } from '#models/reaction'

const reactionEnum = vine.enum(Object.values(ReactionType))
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',
  'minLength': 'The {{ field }} field must be {{ min }} characters long',
  'maxLength': 'The {{ field }} field must be 5 between {{ max }} characters',
  'username.required': 'Please choose a username for your account',
  'content.required': 'Please choose a username for your account',
  'id.required': 'Id is required',
})

export const createUserPostValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(5).maxLength(10),
    content: vine.string().trim().minLength(5).maxLength(260),
    category: vine.number(),
  })
)

export const deletePostValidator = vine.compile(
  vine.object({
    post_id: vine.number(),
    user_id: vine.number(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    post_id: vine.number(),
    user_id: vine.number(),
    content: vine.string().trim().minLength(5).maxLength(200),
    category: vine.number(),
  })
)

export const createCommentValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    post_id: vine.number(),
    content: vine.string().trim().minLength(5).maxLength(200),
  })
)

export const deleteCommentValidator = vine.compile(
  vine.object({
    comment_id: vine.number(),
    user_id: vine.number(),
  })
)

export const toggleReactionValidator = vine.compile(
  vine.object({
    reaction: reactionEnum,
    post_id: vine.number(),
    user_id: vine.number(),
  })
)
