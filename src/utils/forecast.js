const axios = require("axios");

function forecast(dataLocation, callback) {
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=a99291235e32a11523ff7cf8c73202b1&query=${dataLocation.latitude},${dataLocation.longitude}`
    )
    .then((response) => {
      if (!response.data.error) {
        callback(
          response.data.current.weather_descriptions[0] +
            ". It is currently " +
            response.data.current.temperature +
            " degress out."
        );
      } else {
        callback(
          undefined,
          "Unable to find weather for this location. Try another search."
        );
      }
    })
    .catch((error) => {
      callback(undefined, "unable to connect to the weather services!");
    });
}

module.exports = forecast;
