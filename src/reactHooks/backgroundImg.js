import { useState } from "react";
import { GetImageOfLocation } from "../api/index";

const useBackgroundState = () => {
  const [image, setImage] = useState(null);

  const renderImage = async (locationName) => {
    try {
      const locationImage = await GetImageOfLocation(locationName);

      setImage(locationImage);
    } catch (error) {
      console.error("Error getting Image", error);
    }
  };

  return [image, renderImage];
};

export default useBackgroundState;
