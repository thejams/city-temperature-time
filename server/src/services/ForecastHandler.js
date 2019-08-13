const axios = require("axios")

class ForecastHandler {
  constructor(apiKey) {
    this.url = `https://api.darksky.net/forecast/${apiKey}`
  }

  async getCitiesInformation ({latitude, longitude}) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${this.url}/${latitude}, ${longitude}`, { timeout: 5000 })
        if (response && response.data.currently.temperature)
            resolve({temperature: response.data.currently.temperature, timeData: {time: response.data.currently.time, timezone: response.data.timezone}})
        resolve()
      } catch (err) {
        console.log(err)
        reject (err)
      }
    })
  }
}

module.exports = ForecastHandler
