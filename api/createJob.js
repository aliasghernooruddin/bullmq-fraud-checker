import { fraudQueue } from '../queues/fraud.queue.js'

const userId = 'user_123'
const transactionId = 'txn_789'

async function enqueueJob() {
  const job = await fraudQueue.add('check-user-fraud', {
    userId,
    transactionId
  })

  console.log(`📬 Job ${job.id} enqueued for fraud check`)
}

enqueueJob()
