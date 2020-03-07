import axios from 'axios';
import { message, notification } from 'antd';
import { encode } from 'querystring';
import { address } from './base';
// import { getCookie, delCookie } from '../components/cookies';
import cancelTokens from './cancelTokens';
const CancelToken = axios.CancelToken;
notification.config({
    top: "50%"
})

const request = axios.create({
    timeout: 20000,
    baseURL: address,
})
const getActBread = () => {
    return sessionStorage.getItem('actBread');
};

request.interceptors.request.use(function (config) {
    config.cancelToken = new CancelToken(function executor(c) {
        cancelTokens.store.push(c);
    });
    // 设置自定义请求头
    // const uuid = getCookie('uuid'), loginType = getCookie('loginType'); // ?
    const uuid = "55b2fbf5-ee75-44a7-ad70-dbf1b9d2cfdc"
    const loginType = "1"
    if (uuid) config.headers.Authorization = `Bearer ${uuid}`;
    if (loginType) { // ?
        try {
            config.headers.X_Requested_Key = loginType + ',' + JSON.parse(getActBread()).functionId
        } catch (error) {
            config.headers.X_Requested_Key = loginType + ',';
        }
    }
    if (config.addType) { // 添加登陆类型
        config.data = {
            ...config.data,
            clientType: 1, // 客户端类型（1:WEB端 2:客户端）
            loginType: 1 // 登录类型（0单用户模式，登录会强制其它端下线；1：普通模式，可以单用户多端同时在线）
        }
    }
    if (config.needEncode) config.transformRequest = data => encode(data); // 请求参数转成form-data格式
    if (!config.data) config.data = {}; // json交互 默认请求体
    // 外部传入自行设置...
    return config;
}, function (error) {
    return Promise.reject(error);
});
request.interceptors.response.use(function (response) {
    const { msgcode, data, msg } = response.data;
    // 特殊msgcode处理
    switch (msgcode) {
        case 700104:
        case 401:
        case 710001:
        case 720001:
            const pathname = window.location.pathname;
            if (pathname !== '/manage_login' && pathname !== '/sf_login' && pathname !== '/notfound') {
                let loginType = sessionStorage.getItem("loginType");
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('uuid');
                sessionStorage.removeItem('breadlist');
                sessionStorage.clear();
                // delCookie('username');
                // delCookie("uuid");
                // delCookie("loginType");
                // delCookie("breadlist");
                if (loginType === "1") {
                    window._history.replace('/manage_login');
                }
                else if (loginType == "0") {
                    window._history.replace('/sf_login');
                }
            }
            return Promise.reject({ msgcode, data });
        default:
            break;
    }
    if (msgcode === 0) {
        if (response.config.handleSuccess) { // 是否开启成功提示
            message.success(data || msg, 0.8);
        }
        return data;
    }
    if (!response.config.noHandleError) { // 是否开启 其他业务状态码 提示 错误信息
        notification.warn({
            message: msg,
            description: data,
            duration: 10,
        });
    }
    return Promise.reject({ msgcode, data, msg });
}, function (error) {
    let msg = '';
    let data = '';
    if (!error.response) {
        if (new RegExp('timeout').test(error.message)) {
            msg = '提示';
            data = '请求超时请重试';
        }
    } else {
        msg = error.response.data.msg;
        data = error.response.data.data;
    }
    if (msg || data) {
        notification.error({
            message: msg,
            description: data,
            duration: 10,
        });
    }
    return Promise.reject(error);
})

export default request;