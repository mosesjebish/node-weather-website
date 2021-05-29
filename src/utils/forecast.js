const request = require('request')


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5b291e024b2c9f58db2fa8b3b88d1723&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const currentWeather = body.current
            callback(undefined, currentWeather.weather_descriptions[0] + '. It is currently ' + currentWeather.temperature + ' degrees out, feels like ' + currentWeather.feelslike + ' degrees. The humidity is ' + currentWeather.humidity + ' and wind speed is ' + currentWeather.wind_speed + '.')
        }
    })
}

module.exports = forecast