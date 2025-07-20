import { Queue } from 'bullmq'
import { redisConnection } from '../utils/redis.js'

export const fraudQueue = new Queue('fraud-check', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
})
