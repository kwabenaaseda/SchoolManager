// cache/RedisService.js
import Redis from 'ioredis';
import { Logger } from '../utils/Logging.js';
import { LogSystemEvent } from '../utils/HealthService.js';

// 1. Connection Setup
// We use an environment variable to connect. 
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = new Redis(REDIS_URL);

// ===============================================================
// REDIS LIFECYCLE TRACKING (System Death and Revival)
// ===============================================================

// Connection Success (Revival)
redisClient.on('connect', async () => {
    Logger.info('RedisService', 'Connection successful! Redis is now available for caching. 🚀');
    // Log the successful connection to the SystemHealth model
    await LogSystemEvent({
        eventType: "DB_CONNECT",
        component: "CACHE_REDIS",
        status: "SUCCESS",
        message: "Successfully established connection to Redis cache.",
    });
});

// Connection Error (Death)
redisClient.on('error', async (err) => {
    Logger.error('RedisService', 'Connection Error! Redis is currently unavailable.', err);
    // Log the failure event to the SystemHealth model
    await LogSystemEvent({
        eventType: "DB_DISCONNECT", 
        component: "CACHE_REDIS",
        status: "FAILURE",
        message: `Redis connection error: ${err.message}`,
        details: err.stack,
    });
});

// Connection End (Graceful or Ungraceful Shutdown)
redisClient.on('end', async () => {
    Logger.warn('RedisService', 'Connection closed/ended. Redis client shut down.');
    await LogSystemEvent({
        eventType: "SERVER_STOP", // Log this as a component stop
        component: "CACHE_REDIS",
        status: "WARNING",
        message: "Redis client disconnected.",
    });
});


// 2. Utility Functions (The Super-Speedy Notepad's Rules)

/**
 * Gets data from the cache.
 * @param {string} key - The key to look up (e.g., 'user:active:12345').
 * @returns {object|null} The parsed JSON object, or null if not found.
 */
export async function getCache(key) {
    const data = await redisClient.get(key);
    if (!data) {
        Logger.debug('RedisService', `Cache miss for key: ${key}`);
        return null;
    }
    
    // We store all data as JSON strings, so we must parse it back into a JavaScript object
    try {
        const result = JSON.parse(data);
        Logger.debug('RedisService', `Cache hit for key: ${key}`);
        return result;
    } catch (error) {
        // If the data is corrupted and cannot be parsed, we log the error and return null.
        Logger.error('RedisService', `Error parsing JSON data for key: ${key}`, error);
        return null;
    }
}

/**
 * Sets data in the cache with a Time-To-Live (TTL).
 * @param {string} key - The key to store (e.g., 'user:active:12345').
 * @param {object} data - The JavaScript object to store.
 * @param {number} duration - The expiration time in seconds (e.g., 3600 for 1 hour). Default set to 1 hour.
 */
export async function setCache(key, data, duration = 3600) {
    // Redis can only store strings, so we must turn the object into a JSON string
    const value = JSON.stringify(data);
    
    // EX stands for 'expire' in seconds. This is the TTL!
    await redisClient.set(key, value, 'EX', duration); 
    Logger.debug('RedisService', `Set key ${key} with TTL ${duration}s.`);
}

/**
 * To immediately kick a user out (The "Delete from Notepad" command)
 * @param {string} key - The key to clear.
 */
export async function clearCache(key) {
    await redisClient.del(key);
    Logger.debug('RedisService', `Cleared key ${key}. Immediate deactivation possible!`);
}

// Export the client directly in case you need to use advanced Redis commands
export { redisClient };