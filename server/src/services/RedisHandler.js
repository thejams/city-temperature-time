const asyncRedis = require('async-redis')

class RedisHandler {
  constructor() {
    this.client = asyncRedis.createClient(process.env.REDIS_URL)
  }

  async saveCitiesLocation() {
    await Promise.all([
        this.client.set('santiagocl', JSON.stringify({latitude: -33.4372, longitude: -70.6506})),
        this.client.set('zurichch', JSON.stringify({latitude: 47.3666700, longitude: 8.5500000})),
        this.client.set('aucklandnz', JSON.stringify({latitude: -36.8404, longitude: 174.74})),
        this.client.set('sydneyau', JSON.stringify({latitude: -33.8667, longitude: 151.2})),
        this.client.set('londresuk', JSON.stringify({latitude: 51.5072, longitude: -0.1275})),
        this.client.set('georgiausa', JSON.stringify({latitude: 33.7490005, longitude: -84.3879776}))
    ])
    return Promise.resolve()
  }

  async getCityLocation (cityName) {
    return new Promise(async (resolve, reject) => {
        let city = await this.client.get(cityName)
        city = JSON.parse(city)
        resolve(city)
    })
  }
}

module.exports = RedisHandler
