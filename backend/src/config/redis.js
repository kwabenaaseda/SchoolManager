// /src/config/redis.js

import Redis from 'ioredis';

// 1. Connection Setup
// We use an environment variable to connect. 
// Default is usually 'redis://127.0.0.1:6379'
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('connect', () => {
    console.log('Redis: Connection successful! 🚀');
});

redisClient.on('error', (err) => {
    console.error('Redis: Connection Error!', err);
});

// 2. Utility Functions (The Super-Speedy Notepad's Rules)

/**
 * Gets data from the cache.
 * @param {string} key - The key to look up (e.g., 'user:active:12345').
 * @returns {object|null} The parsed JSON object, or null if not found.
 */
export async function getCache(key) {
    const data = await redisClient.get(key);
    if (!data) return null;
    
    // We store all data as JSON strings, so we must parse it back into a JavaScript object
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Redis: Error parsing JSON data for key:', key);
        return null;
    }
}

/**
 * Sets data in the cache with a Time-To-Live (TTL).
 * @param {string} key - The key to store (e.g., 'user:active:12345').
 * @param {object} data - The JavaScript object to store.
 * @param {number} duration - The expiration time in seconds (e.g., 60 for 60 seconds).
 */
export async function setCache(key, data, duration = 60) {
    // Redis can only store strings, so we must turn the object into a JSON string
    const value = JSON.stringify(data);
    
    // EX stands for 'expire' in seconds. This is the TTL!
    await redisClient.set(key, value, 'EX', duration); 
    console.log(`Redis: Set key ${key} with TTL ${duration}s.`);
}

// 3. To teach you how to immediately kick a user out (The "Delete from Notepad" command)
export async function clearCache(key) {
    await redisClient.del(key);
    console.log(`Redis: Cleared key ${key}. Immediate deactivation possible!`);
}