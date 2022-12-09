import React, { useState } from "react";
import MainCurrentData from "./MainCurrentData";
import HourlyForcast from "./HourlyForcast";
import DailyForcast from "./DailyForcast";

function WeatherDetails(props) {
  // const [coordinate, setCoordinate] = useState({});
  return (
    <section class="vh-100">
      <div class="container py-5">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-7 col-xl-5">
            <MainCurrentData coordinate={props.coordinate}/>
            <DailyForcast coordinate={props.coordinate}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherDetails;
