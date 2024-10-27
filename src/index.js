
require("dotenv").config()
const express = require("express") 
const mongoose = require('mongoose');
const { createClient } = require("redis");
const Client = require("pg/lib/client");
const app = express() 

const envVars = process.env

// console.log(`postgresql://${envVars.POSTGRES_USER}:${envVars.POSTGRES_PASSWORD}@${envVars.POSTGRES_HOST}:5432`)
// const connectionString = `postgresql://${envVars.POSTGRES_USER}:${envVars.POSTGRES_PASSWORD}@${envVars.POSTGRES_HOST}:5423/test-db`
// const client = new Client({connectionString})
// client.connect().then(()=> console.log("postgres connected ...")).catch((err)=> console.log(err))


mongoose.connect(`mongodb://${envVars.MONGO_USERNAME}:${envVars.MONGO_PASSWORD}@${envVars.MONGO_HOST}:27017/dev-db?authSource=admin`)
.then(()=> console.log("mongo connected ..."))
.catch((err)=> console.log(err))

const redisClient = createClient({
    url: `redis://${envVars.REDIS_HOST}:${envVars.REDIS_PORT}`,
})
redisClient.on('error', err => console.log('Redis Client Error', err))
redisClient.on("connect" , () => console.log("redis connected ..."))
redisClient.connect()

app.get("/",(_req,res)=> res.send("<h1> Hello World !! </h1>"))
app.listen(3000 , ()=> console.log("server is running ..."))
