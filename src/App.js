import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "./api/axios";
import { ScaleLoader } from "react-spinners";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("New York City");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getWeatherData(city);
      setData(response);
      setLoading(false);

      console.log(response);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const overRide = `
display: block;
margin: 0 auto;
border-color: red;
`;
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="card">
        <h2 className="title">
          <i className="fa fa-cloud"></i>Weather App
        </h2>
        <div className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter name of a city"
          />
          <button type="button" onClick={() => getData()}>
            Search
          </button>
        </div>
        {loading ? (
          <div className="loader-container">
            <ScaleLoader
              css={overRide}
              size={200}
              color={"#fff"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {data !== null ? (
              <div className="main-container">
                <h4> Live Weather Condition</h4>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    alt="imgicon"
                  />
                </div>
                <h3> {data.weather[0].main}</h3>
                <div className="temperature">
                  <h1>
                    {parseFloat(data.main.temp - 273.15).toFixed(1)}&deg;C
                  </h1>
                </div>
                <div className="location">
                  <h3>
                    <i className="fa fa-street-view"></i>
                    {data.name} | {data.sys.country}
                  </h3>
                </div>
                <div className="temperature-range">
                  <h6>
                    Min: {parseFloat(data.main.temp_min - 273.15).toFixed(1)}
                    &deg;C || Max:{" "}
                    {parseFloat(data.main.temp_max - 273.15).toFixed(1)}
                    &deg;C || Humidity:{data.main.humidity}%
                  </h6>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
