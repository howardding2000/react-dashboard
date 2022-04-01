import React, { useState, useEffect } from "react";
import { reqWeather } from "../../../api";
import "./TimeAndWeather.less";

const TimeAndWeather = () => {
  const [weather, setWeather] = useState();
  const formatDate = new Date().toDateString();

  // fetch weather information
  const getWeather = async () => {
    const result = await reqWeather();
    console.log(result);
    setWeather(result);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className='time__weather'>
      <div className='time__weather__date'>{formatDate}</div>
      {weather && (
        <>
          {`${weather.city} ${weather.temp}`} &#8451;
          <div className='time__weather__weather'>
            <img alt={weather.desc} src={weather.icon} />
          </div>
          {` ${weather.desc}`}
        </>
      )}
    </div>
  );
};

export default React.memo(TimeAndWeather);
