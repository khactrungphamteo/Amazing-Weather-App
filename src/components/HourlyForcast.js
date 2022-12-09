import React, { useEffect, useState } from "react";
import { API_KEY } from "../services/weatherService";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function HourlyForcast(props) {
  useEffect(() => {
    const fetchWeatherForcast = async () => {
      try {
        let lattitude = props.coordinate.lat;
        let longitude = props.coordinate.lon;
        const url = `http://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lattitude}&lon=${longitude}&appid=69e79c21e728da5eeab89c9e25275b31`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const responseJson = await response.json();
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherForcast();
  }, [props.coordinate]);
  return (
    <div class="card-body p-4 border-top border-bottom mb-2">
            <div class="row text-center">
              <div class="col-2">
                <strong class="d-block mb-2">Now</strong>
                <img id="wrapper-icon-hour-now" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour-now"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time1"></strong>
                <img id="wrapper-icon-hour1" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour1"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time2"></strong>
                <img id="wrapper-icon-hour2" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour2"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time3"></strong>
                <img id="wrapper-icon-hour3" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour3"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time4"></strong>
                <img id="wrapper-icon-hour4" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour4"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time5"></strong>
                <img id="wrapper-icon-hour5" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour5"></strong>
              </div>
            </div>
          </div>
  )
}

export default HourlyForcast