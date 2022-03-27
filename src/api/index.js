import ajax from "./ajax";
import { message } from "antd";
import axios from "axios";
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

// get category
export const reqCategory = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId: parentId }, "GET");

// add category
export const reqAddCategory = () =>
  ajax(BASE + "/manage/user/add", null, "POST");

// delete category
export const reqDelCategory = () =>
  ajax(BASE + "/manage/user/add", null, "POST");

/**
 * fetch weather information from OpenWeatherMap
 * @param {*} city : The name of the city whose weather needs to be displayed
 * @returns a Pormise with Object data : {city,desc,icon,temp} as a return
 */
export const reqWeather = async () => {
  const token = "acbf2e0264d41b340e9712fe534b96b1";
  const units = "metric";
  const weatherApiPrefix = "https://api.openweathermap.org/data/2.5/weather?";
  let response;

  try {
    const { lat, lon } = await reqCoordinates();
    console.log(lat);
    if (lat) {
      response = await axios.get(
        `${weatherApiPrefix}lat=${lat}&lon=${lon}&appid=${token}&units=${units}`
      );
    } else {
      const city = "montreal";
      response = await axios.get(
        `${weatherApiPrefix}q=${city}&appid=${token}&units=${units}`
      );
    }

    return {
      city: response.data.name,
      desc: response.data.weather[0].main,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      temp: response.data.main.temp,
    };
  } catch (error) {
    message.error("Fetch weather request error: " + error.message);
  }
};

const reqCoordinates = async () => {
  // fetch loca Coordinates by browser
  const getCoordinates = () => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  };
  try {
    const position = await getCoordinates();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return { lat, lon };
  } catch (error) {
    message.error("Fetch location request error: " + error.message);
  }
};
