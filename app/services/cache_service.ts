import redis from '@adonisjs/redis/services/main'

class CacheService {
  #store: Record<string, any> = {}

  async has(...key: string[]): Promise<boolean> {
    const exists = await redis.exists(key)
    return exists > 0
  }

  async get(key: string) {
    const value = await redis.get(key)
    return value && JSON.parse(value)
  }

  async set(key: string, value: string) {
    return redis.set(key, JSON.stringify(value))
  }

  async delete(...key: string[]) {
    return redis.del(key)
  }

  async flushDB() {
    return redis.flushdb() // Flushes the entire database
    // that is currently selected via the SELECT command.
  }
}
const cache = new CacheService()
export default cache
