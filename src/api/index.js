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

export const addUser = (data) => {
    return http.request({
        method: "post",
        url: "/user/addUser",
        data
    });
};

export const editUser = (data) => {
    return http.request({
        method: "post",
        url: "/user/editUser",
        data
    });
};

export const delUser = (data) => {
    return http.request({
        method: "post",
        url: "/user/delUser",
        data
    });
};