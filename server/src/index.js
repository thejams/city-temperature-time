const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const cron = require('node-cron')
const routes = require("./routes")
const app = express()
app.use(routes)
const server = http.createServer(app)
const io = socketIo(server)
const port = process.env.PORT || 4001
const foresCastApiKey = process.env.FORECAST_API_KEY || '9657aed8ca9e9bae4d7ca2a2bbe4bb7c'
const {ForecastHandler, RedisHandler} = require('./services')
const forecastHandler = new ForecastHandler(foresCastApiKey)
const redisHandler = new RedisHandler()



io.on("connection", async (socket) => {
    console.log("New client connected")
    console.log(Object.keys(io.sockets.connected).length )
    
    socket.on("disconnect", () => {
      console.log("Client disconnected")
      console.log(Object.keys(io.sockets.connected).length)
    });
});

cron.schedule('*/10 * * * * *', async function () {
  if (Object.keys(io.sockets.connected).length > 0) {
    console.log('hay personas  logeadas')
    let redisHandlerPromises = await Promise.all([
        redisHandler.getCityLocation('santiagocl'),
        redisHandler.getCityLocation('zurichch'),
        redisHandler.getCityLocation('aucklandnz'),
        redisHandler.getCityLocation('sydneyau'),
        redisHandler.getCityLocation('londresuk'),
        redisHandler.getCityLocation('georgiausa')
    ])
    let [santiagoLatAndLon, zurichLatAndLon, aucklandLatAndLon, sydneyLatAndLon, londresLatAndLon, georgiaLatAndLon] = redisHandlerPromises

    let forecastHandlerPromises = await Promise.all([
        forecastHandler.getCitiesInformation(santiagoLatAndLon),
        forecastHandler.getCitiesInformation(zurichLatAndLon),
        forecastHandler.getCitiesInformation(aucklandLatAndLon),
        forecastHandler.getCitiesInformation(sydneyLatAndLon),
        forecastHandler.getCitiesInformation(londresLatAndLon),
        forecastHandler.getCitiesInformation(georgiaLatAndLon)
    ])
    io.emit("FromAPI", forecastHandlerPromises)
  } else {
    console.log('no hay personas logeadas')
  }
})

server.listen(port, async () => {
    await redisHandler.saveCitiesLocation()
    console.log(`Listening on port ${port}`)
});
