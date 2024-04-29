const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const {Pool} = require('pg');

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    port: keys.pgPort
});

pgClient.on('error', (err) => { console.log(err) });

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch(err => console.log(err));


const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
})

app.get('values/current', async (req, res) => {
    const values = await redisClient.hGetAll('values');
    res.send(values);
})

app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (index > 40) return res.status(422).send('Wrong index');

    await redisClient.hSet('values', index, 'Nothing yet!')
    await redisPublisher.publish('insert', index)
    await pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

    res.send({working: true})
})

app.listen(4000, () => {
    console.log('Listening on port 4000...')
})