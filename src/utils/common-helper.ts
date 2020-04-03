/**
 * @file 通用辅助函数
 */
import {ElForm} from 'element-ui/types/form';
import {differenceInSecondsHelper} from '@/utils';

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
