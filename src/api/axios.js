import axios from "axios";

const baseUrl = "/";

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getInsideConfig() {
        return {
            baseURL: this.baseUrl,
            header: {}
        };
    }

    interception(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    request(options) {
        options = {...this.getInsideConfig(), ...options};
        const instance = axios.create();
        // 实例拦截器的绑定
        this.interception(instance);
        return instance(options);
    }

}


export default new HttpRequest(baseUrl);