import axios from "axios";
//You don't need the dotenv import when using create-react-app or similar setups. Environment variables that start with REACT_APP_ are automatically injected in.
//With axios, you don't need .json(), as axios will automatically parse the JSON for you.

function GetGeoCoordinates(locationSearched) {
  const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationSearched}&appid=${process.env.REACT_APP_API_KEY}`;

  return axios
    .get(geocodeURL)
    .then((response) => {
      var lat = response.data.coord.lat;
      var lon = response.data.coord.lon;
      return { lat, lon };
    })
    .catch((error) => {
      console.error("Error fetching geocoordinates:", error);
    });
}

export default GetGeoCoordinates;
