// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
export default class PostsController {
  query = db.query()
  userdata = [
    {
      id: 1,
      name: 'jesna',
    },
    {
      id: 2,
      name: 'hasna',
    },
  ]
  async getPostDB() {
    const userData = this.query.from('userposts')
    return userData
  }
  async addPostDB({ request, response }: HttpContext) {
    const userData = request.body()
    response.send(userData)
  }
  async GetPost({ response }: HttpContext) {
    response.status(200).send(this.userdata)
  }
  async AddPost({ request, response }: HttpContext) {
    const data = request.only(['id', 'name'])
    const find = this.userdata.find((user) => user.id === data.id)
    if (find) {
      response.status(404).send('user exist')
      return
    }
    this.userdata.push(data)
    response.status(200).send(this.userdata)
  }
  async DeletePost({ request, response }: HttpContext) {
    const id = request.input('id')
    const find = this.userdata.find((user) => user.id === id)
    if (!find) {
      response.status(404).send('user doesn"t exists')
      return
    }
    this.userdata = this.userdata.filter((data) => data.id !== id)
    response.status(200).send(this.userdata)
  }
  async UpdatePost({ request, response }: HttpContext) {
    const id = request.input('id')
    const data = request.only(['name'])

    const find = this.userdata.find((user) => user.id === id)
    if (!find) {
      response.status(404).send('user doesn"t exists')
      return
    }
    this.userdata = this.userdata.map((user) => {
      if (user.id === id) {
        return { ...user, ...data }
      }
      return user
    })
    response.status(200).send(this.userdata)
  }
}
