import axios from "axios";
import GeoCoordToLocationName from "./reverseGeoCoding";

function GetImageOfLocation(locationName) {
  return GeoCoordToLocationName(locationName).then(() => {
    const backgroundPicURL = `https://api.unsplash.com/photos/random?query=${locationName}&client_id=${process.env.REACT_APP_API_KEY2}`;

    return axios.get(backgroundPicURL).then((response) => {
      if (response.data && response.data.urls && response.data.urls.full) {
        return response.data.urls.full;
      }
    });
  });
}

export default GetImageOfLocation;
