import axios from "axios";
//You don't need the dotenv import when using create-react-app or similar setups. Environment variables that start with REACT_APP_ are automatically injected in.
//With axios, you don't need .json(), as axios will automatically parse the JSON for you.

function GetGeoCoordinates(locationSearched) {
  const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationSearched}&limit=5&appid=${process.env.REACT_APP_API_KEY}`;

  return axios
    .get(geocodeURL)
    .then((response) => {
      if (response.data && response.data.length > 0) {
        var lat = response.data[0].lat;
        var lon = response.data[0].lon;
        return { lat, lon };
      } else {
        return { message: "No results found for that location." };
      }
    })
    .catch((error) => {
      console.error("Error getting geocoordinates:", error);
    });
}

export default GetGeoCoordinates;
