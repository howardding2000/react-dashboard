import React, { useState, useEffect } from "react";
import { reqWeather } from "../../../api";
import './TimeAndWeather.less';

const TimeAndWeather = () => {
  const [weather, setWeather] = useState();

  const date = new Date();
  const formatDate = date.toDateString();

  useEffect(() => {
    // let weaterList;
    reqWeather()
      .then((response) => {
        if (response) {
          setWeather({
            city: response.data.city.name,
            description: response.data.list[0].weather[0].main,
            icon: response.data.list[0].weather[0].icon,
            temp: response.data.list[0].main.temp,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let showWeather;
  if (weather) {
    showWeather = (
      <>
        {`${weather.city} ${weather.temp}`} &#8451;
        <img
          style={{ height: "2rem", width: "2rem" }} alt={weather.description}
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        ></img>
      </>
    );
  }


  return (
    <div children='time_weather'>
      <div>{formatDate}</div>
      <div>{showWeather}</div>
    </div>
  );
};

export default TimeAndWeather;
