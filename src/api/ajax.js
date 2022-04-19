/**
 * this function module is sending async ajax request
 * return: a promise object
 * 1.optimizing: Unified handling of request exceptions
 *      1.1 Execute ajax request
 *      1.2 If success, call resolve(value)
 *      1.3 If fail, do not call reject(reason) but alert error message.
 */

import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, isRejected) => {
    let promise;
    // 1.1 Execute ajax request
    if (method === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else if (method === "POST") {
      promise = axios.post(url, data);
    }

    promise
      .then((response) => {
        // 1.2 If success, call resolve(value)
        resolve(response.data);
      })
      .catch((error) => {
        // 1.3 If fail, do not call reject(reason) but alert error message.
        message.error("request error:" + error.message);
      });
  });
}
