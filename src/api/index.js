import http from "./axios";


export const getData = () => {
    return http.request({
        method: "get",
        url: "/home/getData"
    });
};


export const getUser = (params) => {
    return http.request({
        method: "get",
        url: "/user/getUser",
        params
    });
};