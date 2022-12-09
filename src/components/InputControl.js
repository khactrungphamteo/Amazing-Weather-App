import React, { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { API_KEY, countries, states } from "../services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "bootstrap";

export default function InputControl(props) {
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  // console.log(countries);
  // console.log(states);

  // console.log(countryCode);
  // console.log(stateCode);

  const fetchLocation = async () => {
    toast.info("Fetching weather conditions for " + city);

    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
       
        throw new Error("something went wrong");
      }

      const responseJson = await response.json();
      console.log(responseJson);
      //destructuring JSON objects
      const { lat, lon } = responseJson[0];
      const coordinate = { lat, lon };

      if (city !== "") {
        props.setCoordinate(coordinate);
      }
    } catch (error) {
      toast.error("Location is not found");
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(fetchLocation(), 1000);
  }, []);

  const resetForm = () => {
    setCity("");
    setCountryCode("");
    setStateCode("");
  };

  return (
    <div className="container">
      <form className="row gy-2 gx-3">
        <div className="form-group col-auto">
          <input
            type="text"
            placeholder="Enter City"
            id="city"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group col-auto">
          <select
            class="form-select"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="-- Select a country --">
              -- Select a country --
            </option>
            {countries.map((country) => (
              <option value={country.Code}>{country.Name}</option>
            ))}
          </select>
        </div>

        {countryCode === "US" && (
          <div className="form-group col-auto">
            <select
              class="form-select"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              <option value="-- Select a state --">
                -- Select a state --
              </option>
              {states.map((state) => (
                <option value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group col-auto">
          <BsSearch onClick={fetchLocation} />
        </div>
        <div className="form group col-auto">
          <BiReset onClick={resetForm} />
        </div>

        <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
      </form>
    </div>
  );
}
