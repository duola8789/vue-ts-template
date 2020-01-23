/**
 * @file 通用辅助函数
 */
import Cookies, {CookieAttributes} from 'js-cookie';
import {ElForm} from 'element-ui/types/form';

// 设置 cookie 值
// js-cookie: https://www.npmjs.com/package/js-cookie
const setCookieHelper = (name: string, value: string | object, options?: CookieAttributes): void => {
    return Cookies.set(name, value, options);
};

// 提取 cookie 值
const getCookieHelper = (name: string): string | undefined => {
    return Cookies.getJSON(name);
};

// 提取所有 cookie 值
const getAllCookiesHelper = (): {[key: string]: string} => {
    return Cookies.get();
};

// 删除 cookie 值
const removeCookieHelper = (name: string, options?: CookieAttributes): void => {
    return Cookies.remove(name, options);
};

// 生成全局唯一的 Id
const uIdHelper = (function uuid() {
    let id = 0;
    return function getId(): string {
        return String(id++);
    };
})();

// 从 Local Storage 中取值，并还原为原本的类型，如果存入的是 undefined/function/Symbol，取出时结果是 null
const getLocalStorageHelper: (key: string) => any = (key) => {
    const originRes = window.localStorage.getItem(key);
    if (!originRes || originRes === 'undefined') {
        return null;
    }
    let result;
    try {
        result = JSON.parse(originRes);
    } catch (e) {
        result = originRes;
    }
    return result;
};

// 向 Local Storage 中存值，可以存入任意类型
const setLocalStorageHelper: (key: string, value: any) => void = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorageHelper: (key: string) => void = (key) => {
    window.localStorage.removeItem(key);
};

const clearLocalStorageHelper: () => void = () => {
    window.localStorage.clear();
};

// 校验 el-form
const validateELForm: (from: ElForm) => Promise<boolean> = (form) => {
    return new Promise((resolve) => {
        form.validate((valid) => {
            if (valid) {
                resolve(true);
            } else {
                resolve(false);
                return false;
            }
        });
    });
};

// 重置 el-form
const resetElFrom: (from: ElForm) => void = (form) => {
    form.resetFields();
};

// 获取 URL 查询参数
const getUrlSearchParam: (key: string) => string | null = (key) => {
    const urlSearchParams = new URL(window.location.href).searchParams;
    return urlSearchParams.get(key);
};

export {
    setCookieHelper,
    getCookieHelper,
    getAllCookiesHelper,
    removeCookieHelper,
    uIdHelper,
    validateELForm,
    resetElFrom,
    getLocalStorageHelper,
    setLocalStorageHelper,
    removeLocalStorageHelper,
    clearLocalStorageHelper,
    getUrlSearchParam
};
