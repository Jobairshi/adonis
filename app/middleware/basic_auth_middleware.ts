import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class BasicAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const authHeader = ctx.request.header('Authorization')
    if (!authHeader) {
      ctx.response.header('WWW-Authenticate', 'Basic')

      return ctx.response.status(401).send('Unauthorized')
    }
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    if (username !== 'admin' || password !== 'admin') {
      await next()
    } else {
      ctx.response.header('WWW-Authenticate', 'Basic')
      return ctx.response.status(401).send('Unauthorized')
    }
    console.log(ctx)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
