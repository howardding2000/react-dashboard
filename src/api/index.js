import { resolveOnChange } from "antd/lib/input/Input";
import ajax from "./ajax";

/**
 * service address http://localhost:5000
 * ! use service address directly will cause 'Cross-domain problem'
 * * use proxy is the right way, confige in package.json
 * */
// const BASE = 'http://localhost:5000';

const BASE = "";

// login
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

// add user
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", user, "POST");

export const reqWeather = (city) => {
  const token = "acbf2e0264d41b340e9712fe534b96b1";
  const units = "metric";
  const weatherApiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=${units}`;
  console.log("weatherApiCall", weatherApiCall);
  return ajax(weatherApiCall)
    .then((response) => {
      if (response) {
        
        const icon = response.data.weather[0].icon;        
        const imgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        
        return {
          city: response.data.name,
          desc: response.data.weather[0].main,
          icon: imgSrc,
          temp: response.data.main.temp,
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
