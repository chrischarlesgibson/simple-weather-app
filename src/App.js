import React, { useContext, useState, createContext, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import "./App.css";
import goldenRetrieverImage from "./images/golden_retriever.jpg";
import siteImage from "./images/siteBackground.jpg";
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
  } = useWeatherState();

  const {
    image,
    renderImage,
    loading: imageLoading,
    error: imageError,
  } = useBackgroundState();

  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(siteImage);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [displayedLocation, setDisplayedLocation] = useState("");

  const [placeholderText, setPlaceholderText] = useState("Enter a location");

  const handleGetWeatherClick = async () => {
    if (inputtedlocation) {
      setLoading(true);
      try {
        await renderWeatherData();
        await renderImage(inputtedlocation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
      setDisplayedLocation(inputtedlocation);
      setInputtedLocation("");
      setPlaceholderText("Enter A Location");
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (!loading && !imageLoading && bgImageLoaded) {
      setBackgroundImage(image);
    }
  }, [loading, imageLoading, bgImageLoaded]);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setBgImageLoaded(true);
  }, [image]);

  if (loading || imageLoading) {
    return (
      <div
        className={`App ${theme} loaded`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <img
          src={goldenRetrieverImage}
          alt="Golden Retriever"
          className={`loaded`}
          onLoad={handleImageLoad}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <MutatingDots
            height="100"
            width="100"
            color="#ff5c33"
            secondaryColor="#ff5c33"
            radius="16"
            ariaLabel="mutating-dots-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  if (imageError) {
    return <div>Error loading background image: {imageError.message}</div>;
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGetWeatherClick();
    }
  };
  return (
    <div
      className={`App ${theme} loaded`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="searchbarBox">
        <input
          className="locationInput"
          type="text"
          placeholder={placeholderText}
          value={inputtedlocation}
          onChange={(e) => setInputtedLocation(e.target.value)}
          onFocus={() => setPlaceholderText("Search Any Place On Earth....")}
          onBlur={() => {
            if (!inputtedlocation) {
              setPlaceholderText("Enter A Location");
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleGetWeatherClick}>Search</button>
      </div>
      <main>
        {currentWeather && (
          <div className={`weatherDataBox ${currentWeather ? "loaded" : ""}`}>
            <h2 className="header">
              Current Weather in &nbsp;&nbsp;&nbsp;
              <span className="bloodOrange"> {displayedLocation}</span>
            </h2>

            <img
              src={currentWeather.weatherIcon}
              alt="Weather Icon"
              className="weatherIcon"
            />
            <p className="weatherInfo">
              <span className="preColon">Conditions:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {currentWeather.description}
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Temperature:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {RoundTheTemp(currentWeather.temp)}°F
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Feels Like:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {RoundTheTemp(currentWeather.feelsLike)}°F
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Wind Speed:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {currentWeather.windSpeed} mph
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Direction:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {degreesToCompassDirection(currentWeather.windDirection)}
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Humidity:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {currentWeather.humidity}%
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Cloud Cover:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {currentWeather.cloudCover}%
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Today's Sunrise:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {convertUnixTime(currentWeather.sunRise)} (CT)
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Today's Sunset:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {convertUnixTime(currentWeather.sunSet)} (CT)
                </strong>
              </span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
