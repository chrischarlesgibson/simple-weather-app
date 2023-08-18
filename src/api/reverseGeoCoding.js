import axios from "axios";
import GetGeoCoordinates from "./geoCoordinates";

function GeoCoordToLocationName(locationSearched) {
  return GetGeoCoordinates(locationSearched).then((coords) => {
    const { lat, lon } = coords;
    const reverseGeoURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;

    return axios.get(reverseGeoURL).then((response) => {
      if (response.data && response.data.length > 0) {
        var item = response.data[0];
        var name = item.name;
        var country = item.country;

        return {
          name: name,
          country: country,
        };
      }
    });
  });
}

export default GeoCoordToLocationName;
