// backgroundImg.js
import { useState } from "react";
import { GetImageOfLocation } from "../api/index";

const useBackgroundState = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //LoadING the image into memory before setting it as a background to ensure it displays instantly, LOADING TIME WILL BE LONGER, BUT IT WILL LOOK BETTER
  const renderImage = async (locationName) => {
    try {
      setLoading(true);
      const locationImage = await GetImageOfLocation(locationName);

      const img = new Image();
      img.src = locationImage;

      img.onload = () => {
        setImage(locationImage);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error getting Image", error);
      setError(error);
      setLoading(false);
    }
  };

  return { image, renderImage, loading, error };
};

export default useBackgroundState;
