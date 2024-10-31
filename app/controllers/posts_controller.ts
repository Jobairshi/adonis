import Userpost from '#models/post'
import { createUserPostValidator, deletePostValidator } from '#validators/userpost'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { updateValidator } from '#validators/userpost'

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
  async getPostDB({ response }: HttpContext) {
    try {
      const userData = await Userpost.query().preload('category', (q) => q.select('name'))
      const fetchData = await db
        .from('userposts as u')
        .join('categories as c', 'c.id', 'u.cat_id')
        .select('c.id', 'u.content', 'c.name')
      response.status(200).send(fetchData)
    } catch (error) {
      response.status(500).send('erroeore')
    }
  }
  async getLimitedData({ request, response }: HttpContext) {
    const limit = Number(request.input('limit', 10))
    const page = Number(request.input('page', 1))
    const category = request.input('category', 1)
    console.log(limit, page, category)
    const userpost = await db.from('userposts').where('cat_id', category).paginate(page, limit)
    response.send(userpost)
  }
  async addPostDB({ request, response }: HttpContext) {
    try {
      const userData = request.body()
      const payload = await createUserPostValidator.validate(userData)
      const insertINtodata = await Userpost.create(payload)
      response.status(200).send(insertINtodata)
    } catch (err) {
      response.status(400).send(err.messages)
    }
  }

  public async deletePostDb({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(deletePostValidator)

      const user = await Userpost.find(payload.id)
      if (!user) {
        response.status(404).send('User not found')
        return
      }
      await user.delete()
      response.status(200).send('Deleted successfully')
    } catch (error) {
      response.status(400).send(error.messages)
    }
  }

  async updatePostDb({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateValidator)

      const user = await Userpost.find(payload.id)
      if (!user) {
        throw new Error('no user found')
      }
      user.content = payload.content
      user.cat_id = payload.category
      await user.save()
      response.status(200).send('updated successfully')
    } catch (err) {
      response.status(400).send(err.messages)
    }
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
