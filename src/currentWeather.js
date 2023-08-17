import axios from "axios";
import GetGeoCoordinates from "./geoCoordinates";

function GetCurrentWeather(locationSearched) {
  return GetGeoCoordinates(locationSearched).then((coords) => {
    const { lat, lon } = coords;

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;

    return axios
      .get(currentWeatherURL)
      .then((response) => {
        if (response.data) {
          var description = response.data.weather[0].description;
          var weatherIcon = response.data.weather.icon;
          var temp = response.data.main.temp;
          var feelsLike = response.data.main.feels_like;
          var humidity = response.data.main.humidity;
          var windSpeed = response.data.wind.speed;
          var windDirection = response.data.wind.deg;
          var cloudCover = response.data.clouds.all;
          var sunRise = response.data.sys.sunrise;
          var sunSet = response.data.sys.sunset;
          return {
            description,
            weatherIcon,
            temp,
            feelsLike,
            humidity,
            windSpeed,
            windDirection,
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

export default GetCurrentWeather;
