//You don't need the dotenv import when using create-react-app or similar setups. Environment variables that start with REACT_APP_ are automatically injected in.
//With axios, you don't need .json(), as axios will automatically parse the JSON for you.
import axios from "axios";

function GetGeoCoordinates(locationSearched) {
  const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationSearched}&limit=5&appid=${process.env.REACT_APP_API_KEY}`;

  return axios
    .get(geocodeURL)
    .then((response) => {
      var lat, lon;

      if (response.data && response.data.length > 0) {
        lat = response.data[0].lat;
        lon = response.data[0].lon;
      }

      if (typeof lat === "undefined" || typeof lon === "undefined") {
        return { error: "Invalid location" };
      }

      return { lat, lon };
    })
    .catch((error) => {
      console.error("Error getting geocoordinates:", error);
      return { error: error.message };
    });
}
export default GetGeoCoordinates;
