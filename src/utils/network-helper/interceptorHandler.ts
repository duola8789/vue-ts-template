// 请求拦截 - 处理 loading
import {HintNetError, InterceptorRequestHandler, InterceptorResponseHandler} from '@/utils/network-helper/types';
import {loadingCounter} from '@/utils/network-helper/loading-counter';
import {
    ROOT_LOGIN_URL,
    ROOT_LOGOUT_MUTATION,
    ROOT_LOGOUT_URL,
    ROOT_UPDATE_USER_ROLE_MUTATION
} from '@/store/root-store/store-types';
import {Message} from 'element-ui';
import store from '@/store';
import router from '@/router';
import {CommonUrls} from '@/utils';

// HTTP CODE 对照码
// MSDN: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
const HTTP_CODE_HASH: {[propName: string]: string} = {
    0: '成功',
    100: '传入参数不正确',
    101: '数据已存在',
    102: 'JWT token生成错误',
    400: '错误请求',
    401: '未登录或登录过期，请重新登录',
    403: '没有该中心的访问权限，如有需要请与管理员联系',
    404: '未找到相关数据',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器错误',
    502: '网关错误',
    503: '服务不可用',
    999: '网络错误，请稍后重试',
    1001: '请求超时，请稍后重试'
};

// 需要重新登录的状态码
const LOGOUT_CODE = [401, 403];

// 不需要 token 的请求
const FREE_TOKEN_REQUEST_URL = [ROOT_LOGIN_URL, ROOT_LOGOUT_URL];

// NetError提示框个数
let messageBoxCount = 0;
/**
 * 网络错误提示
 * @param code 错误码
 * @param msg 自定义的提示语
 */
const hintNetError: HintNetError = (code = 999, msg) => {
    if (messageBoxCount === 0) {
        messageBoxCount += 1;
        Message({
            type: 'error',
            message: `${msg || HTTP_CODE_HASH[code] || HTTP_CODE_HASH[999]}`,
            duration: 1500,
            onClose() {
                messageBoxCount -= 1;
            }
        });
    }
};

// 响应为 401/403 时进行处理
const exceptionLogout = (code: number) => {
    // 无 token 退出登录
    if (code === 401) {
        store.commit(ROOT_LOGOUT_MUTATION);
        router.push(CommonUrls.Login).catch(() => {});
        return;
    }

    // 无权限时返回首页
    if (code == 403) {
        store.commit(ROOT_UPDATE_USER_ROLE_MUTATION, '');
        router.push(CommonUrls.Forbidden).catch(() => {});
    }
};

// 请求拦截 - 处理 loading
export const loadingRequestHandler: InterceptorRequestHandler = {
    // 正常请求添加 loading
    onFulfilled: (config) => {
        // 除非传入 noGlobalLoading 参数，否则都会默认添加全局 loading
        if (!(config.extraInfo && config.extraInfo.noGlobalLoading)) {
            loadingCounter.addLoading();
        }
        return config;
    },
    // 异常请求直接拒绝，由响应拦截器统一处理
    onRejected(err) {
        return Promise.reject(err);
    }
};

// 请求拦截 - 添加 token
export const tokenRequestHandler: InterceptorRequestHandler = {
    // 正常请求向 header 中添加 token (除登录或者退出登录之外的请求）
    onFulfilled: (config) => {
        const token = store.state.token;
        const isFreeTokenRequest = FREE_TOKEN_REQUEST_URL.includes(config.url as string);
        if (!isFreeTokenRequest && token) {
            config.headers.token = token;
        }
        return config;
    },
    // 异常请求直接拒绝，由响应拦截器统一处理
    onRejected(err) {
        return Promise.reject(err);
    }
};

// 响应拦截 - 处理 loading
export const loadingResponseHandler: InterceptorResponseHandler = {
    // 成功响应去除 loading
    onFulfilled: (response) => {
        // 对于 noGlobalLoading 为 true 的情况，不必处理 loading
        if (!(response.config.extraInfo && response.config.extraInfo.noGlobalLoading)) {
            loadingCounter.subLoading();
        }
        return Promise.resolve(response);
    },
    // 异常响应消除 loading
    onRejected(err) {
        // 对于 noGlobalLoading 为 true 的情况，不必处理 loading
        if (!(err.config.extraInfo && err.config.extraInfo.noGlobalLoading)) {
            loadingCounter.subLoading();
        }
        return Promise.reject(err);
    }
};

// 响应拦截 - 处理异常
export const commonErrorHandler: InterceptorResponseHandler = {
    // 拦截业务异常响应
    onFulfilled: (response) => {
        const {data, config} = response;
        if (+data.code !== 0) {
            const errorInfo = data.message || data.msg;
            // 除非传入 noErrorHint 参数，否则都会进行错误提示
            if (!(config.extraInfo && config.extraInfo.noErrorHint)) {
                hintNetError(+data.code, errorInfo);
            }
            // 登录状态异常
            if (LOGOUT_CODE.includes(+data.code)) {
                exceptionLogout(+data.code);
            }
        }
        return Promise.resolve(response);
    },
    // 拦截网络异常响应，进行提示
    onRejected(err) {
        const response = err && err.response ? err.response : {};
        const message = err && err.message ? err.message : '';
        // 超时提示
        if (message && message.includes('timeout')) {
            hintNetError(1001);
        } else {
            hintNetError(+response.status);
        }
        // 登录状态异常
        if (LOGOUT_CODE.includes(+response.status)) {
            exceptionLogout(+response.status);
        }
        return Promise.reject(response);
    }
};
