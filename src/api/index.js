import ajax from "./ajax";
import { message } from "antd";
import axios from "axios";
/**
 * service address http://localhost:5000
 * ! use service address directly will cause 'Cross-domain problem'
 * * use proxy is the right way, confige in package.json
 * */
// const BASE = 'http://localhost:5000';

const BASE = "/api";

// login
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

// get categories or sub categories
export const reqCategories = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });

// get category by id
export const reqCategory = (categoryId) =>
  ajax(BASE + "/manage/category/info", { categoryId });

// add category
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

// update category
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// delete category
export const reqDeleteCategory = (categoryId) =>
  ajax(BASE + "/manage/category/delete", { categoryId }, "POST");

// get products
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });

// add product
export const reqAddProduct = (product) =>
  ajax(BASE + "/manage/product/add", { product }, "POST");

// update produect
export const reqUpdateProduct = (product) =>
  ajax(BASE + "/manage/product/update", { product }, "POST");

// delete product
export const reqDeleteProduct = (productId) =>
  ajax(BASE + "/manage/product/delete", { productId }, "POST");

// update produect status
export const reqUpdateProduectStatus = (productId, status) =>
  ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST");

// search produect, searchType: productName or productDesc
export const reqSearchProduects = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// delete image by name
export const reqDeleteImage = (name) =>
  ajax(BASE + "/manage/img/delete", { name }, "POST");

// get all roles
export const reqRoles = () => ajax(BASE + "/manage/role/list");

// add role
export const reqAddRole = (roleName, authName) =>
  ajax(BASE + "/manage/role/add", { roleName, authName }, "POST");

// update role
export const reqUpdateRole = (role) =>
  ajax(BASE + "/manage/role/update", { role }, "POST");

// get users by roleId
export const reqUserByRoleId = (roleId) =>
  ajax(BASE + "/manage/role/users", { roleId });

// delete role by Id
export const reqDeleteRole = (roleId) =>
  ajax(BASE + "/manage/role/delete", { roleId }, "POST");

// get all users
export const reqUsers = () => ajax(BASE + "/manage/user/list");

// add user
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", { user }, "POST");

// update user
export const reqUpdateUser = (user) =>
  ajax(BASE + "/manage/user/update", { user }, "POST");

// delete user by Id
export const reqDeleteUser = (userId) =>
  ajax(BASE + "/manage/user/delete", { userId }, "POST");

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

  const result = await reqCoordinates();
  if (result) {
    response = await axios.get(
      `${weatherApiPrefix}lat=${result.lat}&lon=${result.lon}&appid=${token}&units=${units}`
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
    if (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      return { lat, lon };
    }
  } catch (error) {
    message.info(
      "Montreal is the default location if there is no location information"
    );
  }
};
