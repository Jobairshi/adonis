// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from '@adonisjs/core/http'

export default class RoutersController {
  async RouterGet({ request, response }: HttpContext) {
    console.log(request.body())
    //console.log(response
    response.send({ style: '<h1 style ="color:red" >hellow TAS</h1>' })
  }
}
