
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location.capital}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      getWeatherData();
    }
    console.log(location);
    console.log(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location.capital}`
    );
  }, [apiKey, location]);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {weatherData && weatherData.location && weatherData.current && (
        <div>
          <h3>
            Weather in {weatherData.location.name},{" "}
            {weatherData.location.country}
          </h3>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>
            Weather Description: {weatherData.current.weather_descriptions[0]}
          </p>
          <img
            src={weatherData.current.weather_icons[0]}
            alt={weatherData.current.weather_descriptions}
          />
          <p>
            <storng>wind:</storng> {weatherData.current.wind_speed} mph direction{" "}
            {weatherData.current.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;


