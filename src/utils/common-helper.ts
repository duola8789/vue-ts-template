/**
 * @file 通用辅助函数
 */
import {differenceInSecondsHelper} from '@/utils';
import {debounce, cloneDeep} from 'lodash-es';
import store from '@/store';
import {StoreModuleName} from '@/store/modules/types';
import storeModules from '@/store/modules';

// 防抖
export const debounceHelper = (func: () => any, wait = 1000, options = {}) => {
    if (typeof func !== 'function') {
        throw new Error('target of debounce must be a function...');
    }
    return debounce(func, wait, options);
};

// 深拷贝
export const deepCloneHelper = (value: any) => {
    return cloneDeep(value);
};

// 生成全局唯一的 Id
export const uIdHelper = (function uuid() {
    let id = 0;
    return function getId(): string {
        return String(id++);
    };
})();

export const removeLocalStorageHelper: (key: string) => void = (key) => {
    window.localStorage.removeItem(key);
};

export const clearLocalStorageHelper: () => void = () => {
    window.localStorage.clear();
};

// 从 Local Storage 中取值，并还原为原本的类型，如果存入的是 undefined/function/Symbol，取出时结果是 null
// 如果设置了有效期，并且超出了有效期，那么返回的记过也是 null
export const getLocalStorageHelper: (key: string) => any = (key) => {
    const originRes = window.localStorage.getItem(key);
    if (!originRes || originRes === 'undefined') {
        return null;
    }
    try {
        let result = JSON.parse(originRes);
        // 是封装后的对象
        if (result.__value) {
            // 设置了有效期
            const {__maxAge, __timestamp} = result;
            if (__maxAge && __maxAge !== -1 && __timestamp) {
                const timeRemain = __maxAge - differenceInSecondsHelper(new Date(), new Date(__timestamp));
                // 在有效期内
                if (timeRemain > 0) {
                    return result.__value;
                }
                // 过期了
                removeLocalStorageHelper(key);
                return null;
            }
            return result.__value;
        }
        return result;
    } catch (e) {
        return originRes;
    }
};

// 向 Local Storage 中存值，可以存入任意类型
// 可设置有效期，以秒为单位，如果不设置则默认为永久有效
export const setLocalStorageHelper: (key: string, value: any, options?: {maxAge: number}) => void = (
    key,
    value,
    options
) => {
    const maxAge = options && options.maxAge ? options.maxAge : -1;
    const target = {
        __value: value,
        __timestamp: Date.now(),
        __maxAge: maxAge
    };
    window.localStorage.setItem(key, JSON.stringify(target));
};

// 获取 URL 查询参数
export const getUrlSearchParam: (key: string) => string | null = (key) => {
    const urlSearchParams = new URL(window.location.href).searchParams;
    return urlSearchParams.get(key);
};

// 解析 JSON 字符串
export const parseJSON = (content: string): object | null => {
    try {
        return JSON.parse(content);
    } catch {
        return null;
    }
};

// 四舍五入， digit 为保留几位小数
export const mathRound = (num: number, digit = 0) => {
    if (!/^\d*$/.test(String(digit)) || digit < 0) {
        throw new Error('mathRound 的第二个参数 digit 须为正整数');
    }
    const digitalNum = Math.pow(10, digit);
    return Math.round(num * digitalNum) / digitalNum;
};

// 对象形式参数转换为字符串形式（只处理了参数值为字符串的形式）
export const stringifyParams = (params: {[keys: string]: string}) =>
    Object.keys(params).reduce((total, key, index, thisArr) => {
        total += `${key}=${params[key]}${index === thisArr.length - 1 ? '' : '&'}`;
        return total;
    }, '');

// 返回范围内的随机整数
export const getRandomInteger = (min: number, max: number) => min + Math.ceil((max - min) * Math.random());

// 根据屏幕宽度对传入的宽度进行缩放
export const getWithByScreen = (width: number, min = Infinity) => {
    const screenWidth = document.documentElement.clientWidth;
    return Math.min(mathRound(width * (screenWidth / 1920), 2), Infinity);
};

// 将数组按照 splitNum 分组
export const splitArr = <T>(arr: T[], splitNum = 10): T[][] => {
    let result = [];
    let count = Math.ceil(arr.length / splitNum);
    for (let i = 0; i < count; i++) {
        const start = splitNum * i;
        const end = splitNum * (i + 1);
        result.push(arr.slice(start, end));
    }
    return result;
};

// 拼接 BaseUrl
export const getBaseUrl = (baseUrl: string | undefined, params?: object): string => {
    let base: string = '';
    if (baseUrl && baseUrl.startsWith('http')) {
        base = baseUrl;
    } else {
        const {protocol, host} = window.location;
        base = `${protocol}//${host}${baseUrl}`;
    }
    const url = new URL('http://test');
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }
    }
    return `${base}?${url.searchParams.toString()}`;
};

// 动态注册/卸载 Vuex Store
export const registerStoreModule = (moduleName: StoreModuleName, isRegister: boolean) => {
    const targetModule = storeModules[moduleName];
    if (!moduleName || !targetModule) {
        return;
    }
    if (isRegister) {
        if (!store.hasModule(moduleName)) {
            store.registerModule(targetModule.path, targetModule.content);
        }
    } else {
        if (store.hasModule(moduleName)) {
            store.unregisterModule(targetModule.path);
        }
    }
};
