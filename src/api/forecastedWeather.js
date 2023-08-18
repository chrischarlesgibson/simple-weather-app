import axios from "axios";
import GetGeoCoordinates from "./geoCoordinates";

function GetFiveDayForecast(locationSearched) {
  return GetGeoCoordinates(locationSearched).then((coords) => {
    const { lat, lon } = coords;
    const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;

    return axios
      .get(fiveDayURL)
      .then((response) => {
        if (
          response.data &&
          response.data.list &&
          response.data.list.length > 0
        ) {
          var item = response.data.list[0];
          var date = item.dt_txt;
          var tempMin = item.main.temp_min;
          var tempMax = item.main.temp_max;
          var humidity = item.main.humidity;
          var weatherDescription = item.weather[0].description;
          var weatherIcon = item.weather[0].icon;
          var windSpeed = item.wind.speed;

          var cloudCover = item.clouds.all;
          var sunRise = response.data.city.sunrise;
          var sunSet = response.data.city.sunset;
          return {
            date,
            tempMin,
            humidity,
            tempMax,
            weatherDescription,
            weatherIcon,
            windSpeed,

            cloudCover,
            sunRise,
            sunSet,
          };
        } else {
          return { message: "No results found for those coordinates" };
        }
      })
      .catch((error) => {
        console.error("Error getting current weather data:", error);
      });
  });
}

export default GetFiveDayForecast;
