import React, { useContext, useState, createContext } from "react";
import { MutatingDots } from "react-loader-spinner";
import "./App.css";
import {
  convertUnixTime,
  degreesToCompassDirection,
  RoundTheTemp,
} from "./utils/index";
import {
  useFavorites,
  useWeatherState,
  useBackgroundState,
} from "./reactHooks/index";

export const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const {
    inputtedlocation,
    setInputtedLocation,
    currentWeather,
    renderWeatherData,
    fiveDayForecast,
  } = useWeatherState();
  const [loading, setLoading] = useState(false);

  const {
    image,
    renderImage,
    loading: imageLoading,
    error: imageError,
  } = useBackgroundState();

  const { theme, setTheme } = useContext(ThemeContext);

  const handleGetWeatherClick = async () => {
    if (inputtedlocation) {
      setLoading(true);
      try {
        await renderWeatherData();
        await renderImage(inputtedlocation);
        // setTheme(theme === "light" ? "dark" : "light");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
  };

  if (loading || imageLoading) {
    return (
      <div className={`App ${theme}`}>
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="16"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        ;
      </div>
    );
  }

  if (imageError) {
    return <div>Error loading background image: {imageError.message}</div>;
  }

  return (
    <div
      className={`App ${theme}`}
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <div className=" searchbarBox">
        <input
          type="text"
          placeholder="Enter a location"
          value={inputtedlocation}
          onChange={(e) => setInputtedLocation(e.target.value)}
        />
        <button onClick={handleGetWeatherClick}>Get Weather</button>
      </div>
      <main>
        {currentWeather && (
          <div className="weatherDataBox">
            <h2>Current Weather in {inputtedlocation}</h2>
            <p> {currentWeather.weatherIcon}</p>
            <p>Conditions: {currentWeather.description}</p>

            <p>
              <span className="temp">
                Temperature: {RoundTheTemp(currentWeather.temp)}°F
              </span>
              <span className="temp">
                Feels Like:
                {RoundTheTemp(currentWeather.feelsLike)}°F
              </span>
            </p>

            <p>
              <span className="wind">
                Wind Speed: {currentWeather.windSpeed} mph{" "}
              </span>
              <span className="wind">
                Direction:
                {degreesToCompassDirection(currentWeather.windDirection)}
              </span>
            </p>

            <p>Humidity: {currentWeather.humidity} %</p>
            <p>Cloud Cover: {currentWeather.cloudCover} %</p>
            <p>
              Today's Sunrise: {convertUnixTime(currentWeather.sunRise)} (CT)
            </p>
            <p>Today's Sunset: {convertUnixTime(currentWeather.sunSet)} (CT)</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
