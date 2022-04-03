import React, { useState, useEffect } from "react";
import { reqWeather } from "api/index";
import "./TimeAndWeather.less";

const TimeAndWeather = () => {
  const [weather, setWeather] = useState();
  const formatDate = new Date().toDateString();

  // fetch weather information
  const getWeather = async () => {
    const result = await reqWeather();
    setWeather(result);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className='time__weather'>
      <span className='time__weather__date'>{formatDate}</span>
      {weather && (
        <>
          {`${weather.city} ${weather.temp}`} &#8451;
          <span className='time__weather__weather'>
            <img alt={weather.desc} src={weather.icon} />
          </span>
          <span className='time__weather__text'>{` ${weather.desc}`}</span>
        </>
      )}
    </div>
  );
};

export default React.memo(TimeAndWeather);
