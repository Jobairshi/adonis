import cache from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class RedisController {
  async delete({ response, params }: HttpContext) {
    await cache.delete(params.slug)
    return response.redirect().back()
  }

  async flush({ response }: HttpContext) {
    await cache.flushDB()
    return response.redirect().back()
  }
}
