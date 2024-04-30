const keys = require('./keys');

const redis = require('redis');

let redisClient = undefined

let redisListener = undefined

let redisURL = 'redis://' + keys.redisHost + ':' + keys.redisPort

console.log(redisURL)

async function initializeRedis() {
    redisClient = await redis.createClient({
        url: redisURL
    }).on('error', err => console.error('Redis Cluster Error', err)).connect()

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

