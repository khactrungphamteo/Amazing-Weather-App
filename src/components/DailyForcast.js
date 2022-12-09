import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_KEY } from "../key";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function DailyForcast(props) {
  const [dailyForcasts, setDailyForcasts] = useState([]);
  // console.log("dailyForcast");
  // console.log(dailyForcasts);
  useEffect(() => {
    const fetchWeatherForcast = async () => {
      try {
        let lattitude = props.coordinate.lat;
        let longitude = props.coordinate.lon;
        // console.log(lattitude);
        // console.log(longitude);
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lattitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("something went wrong");
        } else {
          toast.success("Daily Forcast is fetched!!")
        }

        const responseJson = await response.json();
        console.log(responseJson);

        const {
          city: { timezone },
          list,
        } = responseJson;

        let daily = list.map((data) => {
          return {
            date: formatToLocalTime(data.dt, timezone, "ccc"),
            temp: data.temp.day,
            icon: data.weather[0].icon,
          };
        });
        console.log("Daily Forcast");
        console.log(daily[0].date);
        setDailyForcasts(daily);
      } catch (error) {
        
        console.log(error);
      }
    };

    fetchWeatherForcast();
  }, [props.coordinate]);

  return (
    <div class="card">
      <div class="card-body p-4">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="d-flex justify-content-around text-center mb-4 pb-3 pt-2">
              {dailyForcasts.length > 1 &&
                dailyForcasts.map((dailyForcast) => (
                  <div class="flex-column">
                    <p class="small">
                      <strong>{dailyForcast.temp}°C</strong>
                    </p>
                    <img
                      id="wrapper-icon-today"
                      src={iconUrlFromCode(dailyForcast.icon)}
                      class="w-100"
                      alt=""
                    />
                    <p class="mb-0">
                      <strong>{dailyForcast.date}</strong>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DailyForcast;
