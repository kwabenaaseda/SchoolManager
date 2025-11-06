// This file is the "Worker" that runs separately from your main Express API.
import redis, { USER_CACHE_STREAM } from '../utils/redisClient.js'; 
// Assume your Redis cache keys are structured like 'user:ID'
const getCacheKey = (userId) => `user:${userId}`;

/**
 * DISTRIBUTED SYSTEM CONCEPT: The Consumer Group
 * * When using Redis Streams, you use XREADGROUP. This is how you achieve:
 * 1. Load Balancing: If you run 3 copies of this Worker, only one copy will receive each message.
 * 2. Fault Tolerance: If a Worker crashes, its messages are held by the Group until another Worker claims them.
 * * Group Name (The Janitor Team): 'firewall_cache_clearers'
 * Consumer Name (Individual Janitor): A unique name for this instance (e.g., 'worker-1', 'worker-2')
 */
const GROUP_NAME = 'firewall_cache_clearers';
const CONSUMER_NAME = `consumer-${process.pid}`; // Using the process ID for a unique name

const worker = async () => {
  console.log(`[WORKER] Starting ${CONSUMER_NAME}. Listening to stream: ${USER_CACHE_STREAM}`);
  
  try {
    // 1. Ensure the Consumer Group Exists (Kindergartener: Make sure the Janitor Team is registered)
    // MKGROUP makes the group. '$' means start reading from the newest message.
    await redis.xgroup('CREATE', USER_CACHE_STREAM, GROUP_NAME, '0', 'MKSTREAM'); 
    console.log(`[WORKER] Consumer Group '${GROUP_NAME}' created (or already exists).`);
  } catch (e) {
    // EBUSY is okay! It means the group already exists. We can ignore it.
    if (!e.message.includes('BUSYGROUP')) {
      console.error("[WORKER ERROR] Failed to create consumer group:", e.message);
      return;
    }
  }

  // 2. Start the Continuous Loop (The Janitor is always watching the To-Do Board)
  while (true) {
    try {
      // XREADGROUP reads messages for this Worker.
      // BLOCK 5000: Wait for up to 5000 milliseconds (5 seconds) if the stream is empty.
      // '>': Read only new, unread messages meant for this consumer.
      const response = await redis.xreadgroup(
        'GROUP', GROUP_NAME, CONSUMER_NAME,
        'COUNT', 1, // Only grab one message at a time
        'BLOCK', 5000, 
        'STREAMS', USER_CACHE_STREAM, '>' // Read from the stream
      );
      
      // If the response is null, the block timed out (no messages), so continue the loop.
      if (!response) continue;

      // The response is complex: [[[Stream Name, [Message ID, [Field1, Value1, Field2, Value2, ...]]]]]
      const streamMessages = response[0][1]; 

      for (const [messageId, dataArray] of streamMessages) {
        // Data is [field, value, field, value] -> we want the value of 'userId'
        const userId = dataArray[1]; 
        const cacheKey = getCacheKey(userId);

        console.log(`\n[WORKER:RECEIVED] Job ID: ${messageId}. User to clear: ${userId}`);

        // --- THE CORE LOGIC: CLEAR THE CACHE ---
        const deleteCount = await redis.del(cacheKey);

        if (deleteCount === 1) {
          console.log(`[WORKER:SUCCESS] Cleared sticky note for ${cacheKey}!`);
        } else {
          console.log(`[WORKER:INFO] Sticky note for ${cacheKey} was already gone (or expired naturally).`);
        }

        // --- CRITICAL STEP: ACKNOWLEDGE THE MESSAGE ---
        // XACK tells the To-Do Board, "I finished this job. You can permanently erase the note."
        await redis.xack(USER_CACHE_STREAM, GROUP_NAME, messageId);
        console.log(`[WORKER:ACK] Acknowledged completion of Job ID: ${messageId}`);
      }

    } catch (e) {
      console.error("[WORKER CRASH] A non-fatal error occurred in the loop:", e.message);
      // Wait a moment before trying again to prevent a tight loop
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
  }
};

worker();