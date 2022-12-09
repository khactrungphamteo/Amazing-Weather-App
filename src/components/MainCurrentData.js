import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_KEY } from "../services/weatherService";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function MainCurrentData(props) {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  useEffect(() => {
    const fetchWeatherForcast = async () => {
      try {
        let lattitude = props.coordinate.lat;
        let longitude = props.coordinate.lon;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("something went wrong");
        } else {
          toast.success("Current Weather is fetched!!")
        }

        const responseJson = await response.json();
        console.log("Current Data");
        console.log(responseJson);

        const {dt, main: {humidity, pressure, temp, feels_like, temp_max, temp_min}, name, sys:{country, sunrise, sunset}, timezone, weather } = responseJson;
        let title = formatToLocalTime(dt, timezone, "ccc");
        let icon = weather[0].icon;
        let sunrise_time = formatToLocalTime(sunrise, timezone,"hh:mm a");
        let sunset_time = formatToLocalTime(sunset, timezone, "hh:mm a");
        let description = weather[0].description;

        let weatherData = {name, title, icon, description, temp, humidity, pressure, feels_like, temp_max, temp_min, country, sunrise_time, sunset_time};
        console.log(weatherData);
        setCurrentWeatherData(weatherData);
      } catch (error) {
        toast.error(error + " prevents from fetching");
        console.log(error);
      }
    };

    fetchWeatherForcast();
  }, [props.coordinate]);

  return (
    <div>
      <div class="card shadow-0 border">
        <div class="card-body p-4">
          <h4 class="mb-1 sfw-normal">{currentWeatherData.name}, {currentWeatherData.country}</h4>
          <p class="mb-2">
            Today's Date: <strong>{currentWeatherData.title}</strong>
          </p>
          <p>
            Current Temperature: <strong>{currentWeatherData.feels_like}°C</strong>
          </p>
          <p>
            Feels like: <strong>{currentWeatherData.temp}°C</strong>
          </p>
          <p>
            sunrise: <strong>{currentWeatherData.sunrise_time}</strong>, sunset:
            <strong>{currentWeatherData.sunset_time}</strong>
          </p>
          <p>
            Max Temperature: <strong>{currentWeatherData.temp_max}°C</strong>, Min Temperature:
            <strong>{currentWeatherData.temp_min}°C</strong>
          </p>

          <div class="d-flex flex-row align-items-center">
            <p class="mb-0 me-4">{currentWeatherData.description}</p>
            <div>
              <img id="wrapper-icon-today" src={iconUrlFromCode(currentWeatherData.icon)} class="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainCurrentData;
