import type { HttpContext } from '@adonisjs/core/http'

export default class BisnosController {
  async bisnobhai(ctx: HttpContext) {
    ctx.response.status(201).send('this is bisno bhai')
  }
}
