import vine from '@vinejs/vine'

export const createUserPostValidator = vine.compile(
  vine.object({
    id: vine.string().uuid(),
    username: vine.string().trim().minLength(5).maxLength(10),
    content: vine.string().trim().minLength(5).maxLength(260),
  })
)
