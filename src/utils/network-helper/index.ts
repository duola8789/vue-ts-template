import axios from 'axios';
import {Message} from 'element-ui';
import {
    Instance,
    InterceptorResponseHandler,
    InterceptorRequestHandler,
    HintNetError,
    Get,
    Post,
    Put,
    Del
} from '@/utils/network-helper/types';
import {loadingCounter} from '@/utils/network-helper/loading-counter';
import store from '@/store/index';
import {ROOT_UPDATE_AUTHORIZED_MUTATION, ROOT_LOGOUT_MUTATION} from '@/store/root-store/store-types';

// HTTP CODE 对照码
// MSDN: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
const HTTP_CODE_HASH: {[propName: string]: string} = {
    0: '成功',
    100: '传入参数不正确',
    101: '数据已存在',
    102: 'JWT token生成错误',
    400: '错误请求',
    401: '未授权',
    403: '无权限访问接口',
    404: '未找到相关数据',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器错误',
    502: '网关错误',
    503: '服务不可用',
    999: '未知网络错误'
};

/**
 * 网络错误提示
 * @param code 错误码
 * @param msg 自定义的提示语
 */
const hintNetError: HintNetError = (code = 999, msg) => {
    Message.error(`${msg || HTTP_CODE_HASH[code] || HTTP_CODE_HASH[999]}`);
};

// 请求拦截 - 处理 loading
const loadingRequestHandler: InterceptorRequestHandler = {
    // 正常请求添加 loading
    onFulfilled: (config) => {
        loadingCounter.addLoading();
        return config;
    },
    // 异常请求直接拒绝，由响应拦截器统一处理
    onRejected(err) {
        return Promise.reject(err);
    }
};

// 响应拦截 - 处理 loading
const loadingResponseHandler: InterceptorResponseHandler = {
    // 成功响应去除 loading
    onFulfilled: (response) => {
        loadingCounter.subLoading();
        return Promise.resolve(response);
    },
    // 异常响应消除 loading
    onRejected(err) {
        loadingCounter.subLoading();
        return Promise.reject(err);
    }
};

// 响应拦截 - 处理异常
const commonErrorHandler: InterceptorResponseHandler = {
    // 拦截业务异常响应
    onFulfilled: (response) => {
        const {data} = response;
        if (data.code !== 0) {
            hintNetError(data.code, data.msg);
        }
        return Promise.resolve(response);
    },
    // 拦截网络异常响应，进行提示
    onRejected(err) {
        const response = err && err.response ? err.response : {};
        hintNetError(response.status);
        // 接口返回 401，无身份认证信息
        if (+response.status === 401) {
            store.commit(ROOT_LOGOUT_MUTATION);
        }
        // 接口返回 403，无权限
        if (+response.status === 403) {
            store.commit(ROOT_UPDATE_AUTHORIZED_MUTATION, false);
        }
        return Promise.reject(response);
    }
};

// 创建 Axios 实例
const axiosInstance: Instance = axios.create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_BASE_URL
});

// 请求拦截器
axiosInstance.interceptors.request.use(loadingRequestHandler.onFulfilled, loadingRequestHandler.onRejected);

// 响应拦截器
axiosInstance.interceptors.response.use(loadingResponseHandler.onFulfilled, loadingResponseHandler.onRejected);
axiosInstance.interceptors.response.use(commonErrorHandler.onFulfilled, commonErrorHandler.onRejected);

// 封装 get 方法
const get: Get = async (url, params = {}, config) => {
    const response = await axiosInstance.get(url, {params, ...config});
    return response.data;
};

// 封装 post 方法
const post: Post = async (url, data = {}, config) => {
    const response = await axiosInstance.post(url, data, {
        ...config
    });
    return response.data;
};

// 封装 put 方法
const put: Put = async (url, data = {}, config) => {
    const response = await axiosInstance.put(url, data, {
        ...config
    });
    return response.data;
};

// 封装 put 方法
const del: Del = async (url, data = {}, config) => {
    const response = await axiosInstance.delete(url, {
        data,
        ...config
    });
    return response.data;
};

// 使用 request 统一调用
const request = {get, post, del, put};

export {request};
