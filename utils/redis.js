import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

export const redisConnection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null
}

export const redisClient = createClient({
  socket: { host: redisConnection.host, port: redisConnection.port }
})

await redisClient.connect()
