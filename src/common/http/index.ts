import axios, { AxiosRequestConfig, Method } from 'axios';
import Cookies from 'js-cookie';
import { Toast } from 'vant';
import { App } from 'Vue';

import { ErrorCode } from '@/models';

interface Data {
  [key: string]: unknown;
}

interface Response {
  code: number;
  message: string;
  data: any;
}

// 使用 .env 中定义的环境变量进行动态拼接请求地址
axios.defaults.baseURL = import.meta.env.VITE_APP_BASEURL + '';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求超时的等待时间,覆写库的超时默认值
// 在超时前，所有请求都会等待 5 秒
axios.defaults.timeout = 5000;

// 全局请求拦截器
axios.interceptors.request.use(
  function (config) {
    const Authorization = Cookies.get('Authorization') || '';
    // 在发送请求之前做些什么 可更改请求的配置，比如在headers添加通用的token
    config.headers['Authorization'] = Authorization; //设置token
    return config;
  },
  function (error) {
    // 对请求错误做些什么 都返回resolve去处理这样做的好处就是不需要再在每个请求里边写cath错误处理的方法了
    // 这里返回的内容可一个自定义通用的处理方式
    Toast.fail('访问出现错误');
    return Promise.resolve({
      code: 500,
      message: '访问出现错误',
      error
    });
  }
);

// 全局响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么 可指定返回的内容
    let data: any = {};

    console.log(response);

    if (response.data) {
      data = response.data;

      if (data.code === ErrorCode['登录状态已失效']) Cookies.remove('Authorization');
    }

    return data;
  },
  function (error) {
    // 对响应错误做点什么 都返回resolve去处理这样做的好处就是不需要再在每个请求里边写cath错误处理的方法了
    // 这里返回的内容可一个自定义通用的处理方式
    Toast.fail('服务器发生错误');
    return Promise.resolve({
      code: 500,
      message: '服务器发生错误',
      error
    });
  }
);

const isData = ['POST', 'PUT', 'PATCH'];

export const http = {
  _requestHandler(
    method: AxiosRequestConfig['method'] = 'get',
    url = '',
    data?: Data,
    config?: Data
  ) {
    method = method.toLocaleUpperCase() as Method;
    data = data || {};
    config = config || {};
    if (isData.indexOf(method) >= 0) {
      config.data = data;
    } else {
      config.params = data;
    }

    return axios.request<any>({
      ...config,
      method,
      url
    });
  },
  get(url = '', data?: Data, config?: Data): Response | any {
    return http._requestHandler('GET', url, data, config);
  },
  post(url = '', data?: Data, config?: Data) {
    return http._requestHandler('POST', url, data, config);
  },
  delete(url = '', data?: Data, config?: Data) {
    return http._requestHandler('DELETE', url, data, config);
  },
  put(url = '', data?: Data, config?: Data) {
    return http._requestHandler('PUT', url, data, config);
  },
  patch(url = '', data?: Data, config?: Data) {
    return http._requestHandler('PATCH', url, data, config);
  },
  request: axios.request
};

export function request(url: string, { method, data }: { method: Method; data?: any }): any {
  return http._requestHandler(method, url, data);
}

export default {
  install: function (app: App) {
    app.config.globalProperties.$http = http;
  }
};
