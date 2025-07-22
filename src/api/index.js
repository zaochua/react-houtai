import http from "./axios";


export const getData = () => {
    return http.request({
        method: "get",
        url: "/home/getData"
    });
};