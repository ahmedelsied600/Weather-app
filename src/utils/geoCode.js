const axios = require("axios");

function geoCode(address, callback) {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2llbmNlLXNlZWtlciIsImEiOiJjbGd6amVzdTAwazhwM2dxdmZ3bDkza3VoIn0.tasStjDtDcxggQX5ycswQg`
    )
    .then((response) => {
      const searchResults = response.data.features;
      if (searchResults.length > 0) {
        const { longitude, latitude } = {
          latitude: searchResults[0].geometry.coordinates[0],
          longitude: searchResults[0].geometry.coordinates[1],
          location: searchResults[0].place_name,
        };
        // forecast(latitude, longitude);
        callback({
          latitude: searchResults[0].geometry.coordinates[0],
          longitude: searchResults[0].geometry.coordinates[1],
          location: searchResults[0].place_name,
        });
      } else {
        callback(undefined, "Unable to find location. Try another search.");
      }
    })
    .catch((error) => {
      callback(undefined, "unable to connect to the location services!");
    });
}

// geoCode("new york", (result) => console.log(result));

module.exports = geoCode;
