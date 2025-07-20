# BullMQ Fraud Detection Queue

A simple queue-based fraud detection system using BullMQ and Redis.

## Features

- Queue: BullMQ for managing tasks.
- Redis: Key-value store for deduplication and caching.
- Worker: Simulates fraud check per transaction.
- Retry logic with exponential backoff.
- Redis TTL for fraud-check caching.

## Use Case

A transaction event triggers a background fraud check. If a similar transaction (by user) was already checked recently, skip the re-check.

## Setup

```bash
npm install
node workers/fraudCheck.worker.js
node api/createJob.js
```

## .env

```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
