import React from "react";
import { Link } from "react-router-dom";
import oopsImage from "../images/oops-2.png";
function InvalidLocation() {
  return (
    <div
      className="invalid-location-container"
      style={{
        backgroundImage: `url(${oopsImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="invalid-location-main">
        <div className="invalid-location-content">
          <h1 className="not-found-header">Location not found !!! </h1>
          <div className="link-container">
            <Link to="/" className=" go-back-link">
              Go back to search
            </Link>
          </div>
          <p className="not-found-text">
            Sorry, we couldn’t find the location that you entered, <br />
            double check the spelling and try again.
          </p>
        </div>
      </main>
    </div>
  );
}
export default InvalidLocation;
