const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const port = 3000;
const app = express();

const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error' , err => console.error('Redis Client Error', err));
redisClient.on('connect' , () => console.log('Connected to Redis...'));
redisClient.connect();

// Connect to MongoDB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT=27017;
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@mongo:${DB_PORT}`; // Replace with your MongoDB connection string
mongoose
  .connect(URI)
  .then( () => console.log('Conntect to MongoDB.....'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
  redisClient.set('Products' , 'products data from Redis');
  res.send('<h1>Hello, World! Dev2 !!!!</h1><p>Welcome to my Node.js application running in a Docker container!</p>');
});

app.get('/data', async (req, res) => {
 const productsData = await redisClient.get('Products');
  res.send(`<h1>Hello, World! Dev2 !!!!</h1><h2>${productsData}</h2>`);
});

app.listen(port , () => {
  console.log(`Server is running on http://localhost:${port} Reload the page to see changes.`);
});