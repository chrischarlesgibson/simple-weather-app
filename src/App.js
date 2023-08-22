// --- IMPORTING MODULES, COMPONENTS, ASSETS---/////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import "./App.css";
import goldenRetrieverImage from "./images/golden_retriever.jpg";
import siteImage from "./images/siteBackground.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetGeoCoordinates from "./api/geoCoordinates";
import { useNavigate } from "react-router-dom";

//importinf screens
import InvalidLocation from "./screens/invalidLocation";

//import helper functions
import {
  convertUnixTime,
  degreesToCompassDirection,
  RoundTheTemp,
} from "./utils/index";

//import react hooks
import {
  // useFavorites,
  useWeatherState,
  useBackgroundState,
} from "./reactHooks/index";

// --- MAIN COMPONENT ---/////////////////////////////////////////////////////////////////
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/invalidlocation" element={<InvalidLocation />} />
      </Routes>
    </Router>
  );
}

//// --- HELPER COMPONENTS ---/////////////////////////////////////////////////////////////////
function AppContent() {
  // destructuring my useState custom hook (useWeatherState) so that the they can be used in this file
  const navigate = useNavigate();
  const {
    inputtedlocation,
    setInputtedLocation,
    currentWeather,
    renderWeatherData,
  } = useWeatherState();

  // destructuring my useState custom hook (useBackgroundState) so that the they can be used in this file
  const { image, renderImage, loading: imageLoading } = useBackgroundState();

  // Using state to manage other variables related to loading states and displayed information
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(siteImage);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter a location");

  // Function to handle the search button click which triggers data fetching
  const handleGetWeatherClick = async () => {
    if (inputtedlocation) {
      setLoading(true);
      try {
        const geoResult = await GetGeoCoordinates(inputtedlocation);
        if (geoResult.error) {
          navigate("/invalidlocation");
          return; // This stops further execution
        }
        await renderWeatherData();
        await renderImage(inputtedlocation);
      } catch (error) {
        console.error("Error:", error);
        // Navigate to invalid location or another error page if desired
      }
      setLoading(false);
      setDisplayedLocation(inputtedlocation);
      setInputtedLocation("");
      setPlaceholderText("Enter A Location");
    }
  };
  // useEffect hook to update the background image
  useEffect(() => {
    if (!loading && !imageLoading && bgImageLoaded) {
      setBackgroundImage(image);
    }
  }, [loading, imageLoading, bgImageLoaded, image]);

  // useEffect hook to check when a new image is loaded
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setBgImageLoaded(true);
  }, [image]);

  // Return statement for loading state
  if (loading || imageLoading) {
    return (
      // Render the app with the  golden retriever image and a loading spinner
      <div
        className={`App loaded`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <img
          src={goldenRetrieverImage}
          alt="Golden Retriever"
          className={`loaded`}
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

  // When the enter key is pressed, the handleGetWeatherClick(); is run
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGetWeatherClick();
    }
  };

  // Render the main content with weather data, search bar, and other information
  return (
    <div
      className={`App loaded`}
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
        {/* If the currentWeather data exists, then the div will be rendered based of the weatherDataBox loaded class. If no data exists, nothing is rendered   */}
        {currentWeather && (
          <div className={`weatherDataBox ${currentWeather ? "loaded" : ""}`}>
            <h2 className="header">
              {/* Added 3 spaces */}
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
                  {/* Getting the currentWeather data for the description */}
                  {currentWeather.description}
                </strong>
              </span>
            </p>
            <p className="weatherInfo">
              <span className="preColon">Temperature:</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="postColon">
                <strong className="boldedText">
                  {/* Getting the currentWeather data for the temperature. Running the value through the RoundTheTemp function */}
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
