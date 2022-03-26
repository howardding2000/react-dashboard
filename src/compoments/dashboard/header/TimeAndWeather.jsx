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
    <div className='time__weather'>
      <div className='time__weather__date'>{formatDate}</div>
      <div className='time__weather__weather'>
        {weather && (
          <>
            {`${weather.city} ${weather.temp}`} &#8451;
            <img
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
