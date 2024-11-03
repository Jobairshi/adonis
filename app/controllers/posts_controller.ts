import Userpost from '#models/post'
import {
  createCommentValidator,
  createUserPostValidator,
  deleteCommentValidator,
  deletePostValidator,
  toggleReactionValidator,
} from '#validators/userpost'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { updateValidator } from '#validators/userpost'
import Comment from '#models/comment'
import Reaction from '#models/reaction'

export default class PostsController {
  public async getPostDB({ request, response }: HttpContext) {
    try {
      const id = request.input('id')
      console.log(id)
      if (!id) {
        const userData = await Userpost.query()
          .preload('category', (q) => q.select('name'))
          .preload('user')
          .withCount('comments', (q) => q.as('comment_count'))
          .withCount('reactions', (q) => q.as('reaction_count'))
          .orderBy('id', 'desc')
        response.status(200).send(userData)
        return
      }
      const userData = await Userpost.query()
        .where('id', id)
        .preload('category', (q) => q.select('name'))
        .preload('user', (q) => q.select('full_name', 'dp'))
        .withCount('comments', (q) => q.as('comment_count'))
        .orderBy('id', 'desc')
      response.status(200).send(userData)
    } catch (error) {
      response.status(500).send(error.message)
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
    const payload = await request.validateUsing(deletePostValidator)
    const post = await Userpost.find(payload.post_id)
    const curUser = payload.user_id
    // console.log(post?.user_id, curUser)
    if (!post) {
      return response.status(404).json({ message: 'Post not found' })
    }
    if (post.user_id !== curUser) {
      return response.status(403).json({ message: 'unauthorized' })
    }
    await post.delete()
    return response.status(200).json({ message: 'Post deleted successfully' })
  }

  async updatePostDb({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateValidator)

      const user = await Userpost.find(payload.post_id)
      if (!user) {
        response.status(404).send('post not found')
        return
      }
      if (user.user_id !== payload.user_id) {
        response.status(403).send('unauthorized')
        return
      }
      user.content = payload.content
      user.cat_id = payload.category
      await user.save()
      response.status(200).send('updated successfully')
    } catch (err) {
      response.status(400).send(err.messages)
    }
  }

  async getComment({ request, response }: HttpContext) {
    try {
      const PrevPage = request.input('prev_page', null)
      console.log(PrevPage)
      if (PrevPage) {
        const comments = await Comment.query()
          .preload('user')
          .preload('post')
          .limit(2)
          .offset(PrevPage)
          .orderBy('comments.id', 'desc')
        response.status(200).send(comments)
        return
      }
      const comments = await Comment.query()
        .preload('user')
        .preload('post')
        .orderBy('id', 'desc')
        .limit(2)
      response.status(200).send(comments)
    } catch (error) {
      response.status(500).send(error.message)
    }
  }

  async addComment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createCommentValidator)
      const insertINtodata = await Comment.create(payload)
      response.status(200).send(insertINtodata)
    } catch (err) {
      response.status(400).send(err.messages)
    }
  }
  async deleteComment({ request, response }: HttpContext) {
    const payload = await request.validateUsing(deleteCommentValidator)
    const comment = await Comment.query().where('id', payload.comment_id).preload('user').first()
    response.status(200).send(comment)
    if (!comment) {
      return response.status(404).json({ message: 'Comment not found' })
    }
    if (comment.user.id !== payload.user_id || comment.user_id !== payload.user_id) {
      return response.status(403).json({ message: 'unauthorized' })
    }
    await comment.delete()
    return response.status(200).json({ message: 'Comment deleted successfully' })
  }

  async toggleReaction({ request, response }: HttpContext) {
    const payload = await request.validateUsing(toggleReactionValidator)
    const reaction = await Reaction.query()
      .where('user_id', payload.user_id)
      .where('post_id', payload.post_id)
      .first()
    if (reaction) {
      await reaction.delete()
      return response.status(200).send({ message: 'Reaction removed' })
    }
    await Reaction.create(payload)
    return response.status(200).send({ message: 'Reaction added' })
  }
}
