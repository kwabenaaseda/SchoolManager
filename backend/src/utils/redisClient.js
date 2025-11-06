import { Redis } from "ioredis";

// 1. Connection (Uses environment variable REDIS_URL or default)
const redis = new Redis({
  // Use your actual Redis connection string here
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

// 2. The Stream Name (The To-Do Board Category)
// We are using a dedicated stream for high-priority user-status changes.
export const USER_CACHE_STREAM = "user_status_changes_stream"; 

/**
 * The Producer: Writes a message to the To-Do Board.
 * @param {string} userId - The ID of the user whose cache needs clearing.
 */
export const publishCacheInvalidation = async (userId) => {
  // XADD is the Redis Streams command to ADD an item to a stream.
  // We add an item with the fields: { userId: ... }
  try {
    const messageId = await redis.xadd(
      USER_CACHE_STREAM, // The name of the Stream (To-Do Board)
      "*",               // '*' means Redis generates a unique Message ID
      "userId", userId    // The actual data of the message
    );
    console.log(`[STREAM:PRODUCER] Published inactivation for User ${userId}. Message ID: ${messageId}`);
  } catch (error) {
    // Crucial: Log an error if the message queue is down.
    console.error(`[STREAM:ERROR] Failed to publish message for User ${userId}:`, error.message);
    // Even if this fails, the MongoDB update still succeeded (Roster is accurate).
    // The cache will just expire naturally in 60s (Slight inconvenience, but not a crash).
  }
};

export default redis;