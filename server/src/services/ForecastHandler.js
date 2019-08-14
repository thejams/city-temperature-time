const axios = require("axios")

class ForecastHandler {
  constructor(apiKey) {
    this.url = `https://api.darksky.net/forecast/${apiKey}`
  }

  async getCitiesInformation ({latitude, longitude}) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${this.url}/${latitude}, ${longitude}`, { timeout: 5000 })
        if (response && response.data.currently.temperature) {
          let icon = 'sunn'
          switch (response.data.currently.icon) {
            case "hail":
            case "thunderstorm":
            case "tornado":
            case "rain":
              icon = "rain"
              break
            case "wind":
            case "fog":
            case "partly-cloudy-day":
            case "partly-cloudy-night":
            case "fog":
            case "cloudy":
              icon = "cloudy"
              break

          }
          resolve({temperature: response.data.currently.temperature, timeData: {time: new Date(), timezone: response.data.timezone}, icon})
        }
        resolve()
      } catch (err) {
        console.log(err)
        reject (err)
      }
    })
  }
}

module.exports = ForecastHandler
