import { Worker } from 'bullmq'
import { redisConnection, redisClient } from '../utils/redis.js'

const fraudWorker = new Worker('fraud-check', async (job) => {
  const { userId, transactionId } = job.data
  const redisKey = `fraud-check:${userId}`

  const alreadyChecked = await redisClient.get(redisKey)
  if (alreadyChecked) {
    console.log(`🚫 Already checked for user ${userId}. Skipping.`)
    return
  }

  console.log(`🔍 Checking fraud for transaction ${transactionId} of user ${userId}`)

  // Simulate some fraud-checking delay
  await new Promise(res => setTimeout(res, 2000))

  // Save fraud check result in Redis for 1 hour
  await redisClient.set(redisKey, '1', { EX: 3600 })
}, {
  connection: redisConnection
})

fraudWorker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`)
})

fraudWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message)
})
