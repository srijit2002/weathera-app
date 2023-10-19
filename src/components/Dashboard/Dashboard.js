//Initialization of files
import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import "./Dashboard.css";
import { getCurrentWeatherData } from "../../api/getCurrentWeatherData";
import { AiOutlineSearch } from "react-icons/ai";

//Start of the main functional component
const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [query, setQuery] = useState("kolkata");
  useEffect(() => {
    getCurrentWeatherData(query, (data, err) => {
      if (!err) {
        setLocation(data?.location);
        setWeatherData(data?.current);
      } else {
        console.log(err);
      }
    });
  }, []);
  const handleSearch = async () => {
    getCurrentWeatherData(query, (data, err) => {
      if (!err) {
        setLocation(data?.location);
        setWeatherData(data?.current);
      } else {
        console.log(err);
      }
    });
  };
  return (
    <div className="dash-holder">
      <div className="home-img">
        {location.name ? (
          <h1>
            {location.name} <br />
            <span>{location.country}</span>
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="info">
        <div className="date-time">
          <div className="date-time-info">
            <h4>Update Time</h4>
            <h1>{formatTime(location.localtime)}</h1>
            <p>{formatDate(location.localtime)}</p>
          </div>
        </div>
        <div className="weatherData">
          <div className="weatherData-img">
            {/* <ReactAnimatedWeather
              icon={weatherData.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            /> */}
          </div>
          <div className="weatherData-details">
            <p className="details-wet">{weatherData.main}</p>
            <p className="humidity">Humidity</p>
            <h1>{weatherData.humidity}%</h1>
          </div>
        </div>
        <div className="temparature">
          <h1>
            {" "}
            {weatherData.temp_c}
            <span>°C</span>
          </h1>
          <p>TEMPERATURE</p>
        </div>
      </div>
      <div className="Search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        ></input>
        <button onClick={handleSearch}>
          <AiOutlineSearch size={20} />
        </button>
      </div>
      <div className="search-place">
        <div className="place place-dummy">
          {/* <img src={CloudImg} />
          <p>Delhi,IN</p> */}
        </div>
        <div className="place place-humidity">
          {weatherData && (
            <img src={weatherData?.condition?.icon} alt="weatherData icon" />
          )}
          <p>
            {weatherData?.name}, {weatherData?.country}
          </p>
        </div>
        <div className="place place-humidity">
          <h1>{Math.round(weatherData.humidity)}%</h1>
          <p>Humidity</p>
        </div>
        <div className="place place-humidity">
          <h1>
            {weatherData.vis_km}
            <span>km</span>
          </h1>
          <p>Visibility</p>
        </div>
        <div className="place place-humidity">
          <h1>{weatherData.temp_c}°C</h1>
          <p>Temperature</p>
        </div>
        <div className="place place-humidity place-special">
          <h1>
            {weatherData.wind_kph} <span>Km/h</span>
          </h1>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
