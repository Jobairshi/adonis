import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'AdonisJS',
  version: '1.0.0',
  description: 'AdonisJS API',
  tagIndex: 2,
  info: {
    tttle: 'Recipe App',
    version: '1.0.0',
    description: 'Recipe API',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  snakeCase: true,
  dubug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parametes: {},
    headers: {},
  },
  securitySchemes: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-KEY',
    },
  },
  AuthMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
