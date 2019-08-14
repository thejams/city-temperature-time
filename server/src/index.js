const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
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
    // TODO: start requesting the information from the cities
    // let citiesInformation = await forecastHandler.getCitiesInformation()
    // let redisHandlerPromises = await Promise.all([
    //     redisHandler.getCityLocation('santiagocl'),
    //     redisHandler.getCityLocation('zurichch'),
    //     redisHandler.getCityLocation('aucklandnz'),
    //     redisHandler.getCityLocation('sydneyau'),
    //     redisHandler.getCityLocation('londresuk'),
    //     redisHandler.getCityLocation('georgiausa')
    // ])
    // let [santiagoLatAndLon, zurichLatAndLon, aucklandLatAndLon, sydneyLatAndLon, londresLatAndLon, georgiaLatAndLon] = redisHandlerPromises

    // let forecastHandlerPromises = await Promise.all([
    //     forecastHandler.getCitiesInformation(santiagoLatAndLon),
    //     forecastHandler.getCitiesInformation(zurichLatAndLon),
    //     forecastHandler.getCitiesInformation(aucklandLatAndLon),
    //     forecastHandler.getCitiesInformation(sydneyLatAndLon),
    //     forecastHandler.getCitiesInformation(londresLatAndLon),
    //     forecastHandler.getCitiesInformation(georgiaLatAndLon)
    // ])
    // let [santiago, zurich, auckland, sydney, londres, georgia] = forecastHandlerPromises

    /*
        redisHandlerPromises response
            { latitude: -33.4372, longitude: -70.6506 }
            { latitude: 47.36667, longitude: 8.55 }
            { latitude: -36.8404, longitude: 174.74 }
            { latitude: -33.8667, longitude: 151.2 }
            { latitude: 51.5072, longitude: -0.1275 }
            { latitude: 33.7490005, longitude: -84.3879776 }
            
        forecastHandlerPromises response
            { temperature: 52.33,
              timeData: { time: 1565659675, timezone: 'America/Santiago' } }
            { temperature: 56.27,
              timeData: { time: 1565659675, timezone: 'Europe/Zurich' } }
            { temperature: 56.48,
              timeData: { time: 1565659675, timezone: 'Pacific/Auckland' } }
            { temperature: 60.2,
              timeData: { time: 1565659675, timezone: 'Australia/Sydney' } }
            { temperature: 54.97,
              timeData: { time: 1565659675, timezone: 'Europe/London' } }
            { temperature: 86.42,
              timeData: { time: 1565659675, timezone: 'America/New_York' } }

    */
        
    setInterval(
        () => socket.emit("FromAPI", { data: [
          { temperature: 52.33,
            timeData: { time: new Date(), timezone: 'America/Santiago' } },
          { temperature: 56.27,
            timeData: { time: new Date(), timezone: 'Europe/Zurich' } },
          { temperature: 56.48,
            timeData: { time: new Date(), timezone: 'Pacific/Auckland' } },
          { temperature: 60.2,
            timeData: { time: new Date(), timezone: 'Australia/Sydney' } },
          { temperature: 54.97,
            timeData: { time: new Date(), timezone: 'Europe/London' } },
          { temperature: 86.42,
            timeData: { time: new Date(), timezone: 'America/New_York' } }
        ] }),
        10000
    )
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, async () => {
    await redisHandler.saveCitiesLocation()
    console.log(`Listening on port ${port}`)
});
