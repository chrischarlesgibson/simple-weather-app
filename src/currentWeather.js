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

function GetFiveDayForecast() {
  const apiKey = "2e7ad0266ed734e297938c3bcc22afc5";
  const fiveDayURL =
    "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}&units=imperial";
}
axios
  .get(fiveDayURL)
  .then((response) => response.json()) //once the axios get promise is fullfilled , then the response class(result) is a function that extracts the JSON datafrom the result
  .then((data) => {
    fiveDayDataNeeded = {
      lat: data,
    };
  }); //data is the JSON data from the previous function, we process the data with the fields in the brackets
//main fucntion
function GetWeatherData(locationSearched) {
  return GetGeoCoordinates(locationSearched)
    .then((geoCoordinates) => {
      Promise.all([
        GetCurrentWeather(geoCoordinates),
        GetFiveDayForecast(geoCoordinates),
      ]);
    })

    .then(([currentWeather, fiveDayForecast]) => {
      return {
        currentWeather,
        fiveDayForecast,
      };
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

//first nested function executed
