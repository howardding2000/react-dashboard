import React, { useState, useEffect } from "react";
import { reqWeather } from "../../../api";
import "./TimeAndWeather.less";

const TimeAndWeather = () => {
  const [weather, setWeather] = useState();
  const formatDate = new Date().toDateString();

  useEffect(() => {
    // fetch weather information
    const getWeather = async () => {
      const data = await reqWeather();
      setWeather(data);
    };
    getWeather();
  }, []);

  return (
    <div className='time_weather'>
      <div>{formatDate}</div>
      <div>
        {weather && (
          <>
            {`${weather.city} ${weather.temp}`} &#8451;
            <img
              style={{ height: "2rem", width: "2rem" }}
              alt={weather.desc}
              src={weather.icon}
            ></img>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeAndWeather;
