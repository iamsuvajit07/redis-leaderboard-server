# Redis Live Leaderboard

This project is a Redis-powered leaderboard API built with Express and ioredis. It demonstrates core Redis operations for high-concurrency workflows: `INCR`, `ZINCRBY`, `ZREVRANGE`, and `ZREVRANK`.

## Project Structure

- `index.js` — server entry point with graceful shutdown
- `src/app.js` — Express application setup
- `src/config/redis.config.js` — Redis connection configuration
- `src/controllers/` — request handlers
- `src/routes/` — API routes
- `src/services/` — Redis business logic
- `src/middleware/` — request validation and error handling
- `src/workers/subscriber.js` — separate Redis subscriber worker
- `src/constants/` — Redis keys and channel names
- `src/utils/` — logger, sanitizers, and validators

## Features

- ✅ Atomic Redis operations (INCR, ZINCRBY, ZREVRANGE, ZREVRANK)
- ✅ Request validation with input sanitization
- ✅ Structured error handling
- ✅ Pub/Sub event publishing for real-time updates
- ✅ Graceful shutdown handlers
- ✅ Logger utility for consistent logging

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Or manually create a `.env` file:

```env
PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
# REDIS_PASSWORD=your_redis_password_if_needed
NODE_ENV=development
```

## Install Dependencies

```bash
npm install
```

## Run the API

```bash
npm start
```

## Run the Subscriber Worker

Open a second terminal and run:

```bash
npm run worker
```

The worker subscribes to `leaderboard-updates` and `post-views` channels and prints events as they arrive.

## API Endpoints

### Increment a post view

```bash
curl -X POST http://localhost:3000/123/view
```

Response:

```json
{ "postId": "123", "views": 1 }
```

### Add or update a leaderboard score

```bash
curl -X POST http://localhost:3000/leaderboard/score \
  -H "Content-Type: application/json" \
  -d '{"userId":"alice","score":50}'
```

Response:

```json
{ "userId": "alice", "newScore": 50 }
```

### Get top 10 leaderboard users

```bash
curl http://localhost:3000/leaderboard
```

### Get a user rank

```bash
curl http://localhost:3000/leaderboard/alice/rank
```

Response:

```json
{ "userId": "alice", "rank": 1, "score": 50 }
```

## Notes

- The subscriber worker must run in a separate terminal.
- Request validation is enforced for leaderboard score input and view ID parameters.
- Errors are returned as structured JSON responses.
- User IDs are sanitized to prevent injection attacks.
- Scores are validated to ensure they are finite numbers.
# redis-leaderboard-server
