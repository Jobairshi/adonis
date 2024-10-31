/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RedisController = () => import('#controllers/redis_controller')
const RoutersController = () => import('#controllers/routers_controller')
const PostsController = () => import('#controllers/posts_controller')
const BisnosController = () => import('#controllers/bisnos_controller')
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

router.get('/req', async (ctx: HttpContext) => {
  // console.log(ctx.auth)
  ctx.response.send(ctx.request)
})
router.get('/res', async (ctx: HttpContext) => {
  // console.log(ctx.auth)
  ctx.response.send(ctx.session)
})
router.get('/about', [BisnosController, 'bisnobhai'])

router.delete('/redis-delete', [RedisController, 'delete']).as('redis.delete')

router.get('/test', [RoutersController, 'RouterGet']).as('test')

router.get('/route', async ({ response }) => {
  response.send('helloe ')
})
router.get('/csrf', async ({ request, response }) => {
  return request.csrfToken
})

router.get('/get-user', [PostsController, 'GetPost'])
router.post('/add-post', [PostsController, 'AddPost'])
router.post('/delete-post', [PostsController, 'DeletePost'])
router.post('/update-post', [PostsController, 'UpdatePost'])

router.get('/get-userpost', [PostsController, 'getPostDB'])
router.post('/add-userpost', [PostsController, 'addPostDB'])
router.post('/delete-userpost', [PostsController, 'deletePostDb'])
router.post('/update-userpost', [PostsController, 'updatePostDb'])
router.get('/get-limit-userpost', [PostsController, 'getLimitedData'])
