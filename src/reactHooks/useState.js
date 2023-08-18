import { useState } from "react";
import { GetCurrentWeather, GetFiveDayForecast } from "../api/index";

const useWeatherState = () => {
  const [inputtedlocation, setInputtedLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  const renderWeatherData = async () => {
    try {
      const current = await GetCurrentWeather(inputtedlocation);
      const forecast = await GetFiveDayForecast(inputtedlocation);

      setCurrentWeather(current);
      setFiveDayForecast(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return {
    inputtedlocation,
    setInputtedLocation,
    currentWeather,
    fiveDayForecast,
    renderWeatherData,
  };
};

export default useWeatherState;
