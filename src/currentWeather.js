import axios from "axios";
import GetGeoCoordinates from "./geoCoordinates";
    
  function GetCurrentWeather() {
   
    const currentWeatherURL =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}${process.env.REACT_APP_API_KEY}&units=imperial`;
    
    axios
      .get(currentWeatherURL)
      .then((response) => response.json()) //once the axios get promise is fullfilled , then the response class(result) is a function that extracts the JSON datafrom the result
      .then((data) => {
        currentWeather = {
          lat: data.coord.lat,
          lon: data.coord.lon,
        };
      });
  
   