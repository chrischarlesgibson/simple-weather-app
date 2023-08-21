import axios from "axios";
import GeoCoordToLocationName from "./reverseGeoCoding";

function GetImageOfLocation(locationName) {
  return GeoCoordToLocationName(locationName).then(() => {
    const backgroundPicURL = `https://api.bing.microsoft.com/v7.0/images/search?q=${locationName}+skyline&count=3&safeSearch=Strict&subscription-key=${process.env.REACT_APP_API_KEY2}`;

    return axios
      .get(backgroundPicURL, {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY2,
        },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.value &&
          response.data.value.length > 0
        ) {
          return response.data.value[0].contentUrl;
        }
      });
  });
}

export default GetImageOfLocation;
