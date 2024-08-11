import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import { ref } from "vue";

const instance = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 10000,
  headers: {},
});
export const loadingInstance = ref(false);
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    loadingInstance.value = true;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    loadingInstance.value = false;
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loadingInstance.value = false;
    const data = response.data;
    if (data.code === 0) {
      //console.log(data.data);
      return data.data;
    }
    console.error("request error", data.data);
    return data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    loadingInstance.value = false;
    return Promise.reject(error);
  }
);

// 包装axios请求函数，实现防抖
// function debounceRequest(func: any, wait: number): any {
//   return _.debounce((...args: any[]) => {
//     return new Promise((resolve, reject) => {
//       func(...args)
//         .then((response: AxiosResponse) => resolve(response))
//         .catch((error: any) => reject(error));
//     });
//   }, wait);
// }

// 包装axios请求函数，实现节流
// const debouncedGet = debounceRequest(instance.get, 1000);
// const debouncedPost = debounceRequest(instance.post, 1000);
export default instance;
