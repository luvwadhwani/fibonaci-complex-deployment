const keys = require('./keys');

const redis = require('redis');

let redisClient = undefined

let redisListener = undefined

async function initializeRedis() {
    redisClient = await redis.createClient({
        url: process.env.REDIS_HOST + '://' + process.env.REDIS_HOST + ':' +process.env.REDIS_PORT
    }).connect();

    redisListener = await redisClient.duplicate();

    await redisListener.connect()

    await redisListener.subscribe('insert', (message) => {
        redisClient.hSet('values', message, fib(parseInt(message)))
    })
}

initializeRedis().catch(err => console.log(err));

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2)
}

