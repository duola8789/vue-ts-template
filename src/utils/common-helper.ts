// js-cookie: https://www.npmjs.com/package/js-cookie

import Cookies, { CookieAttributes } from 'js-cookie';

// 设置 cookie 值
const setCookieHelper = (name: string, value: string | object, options?: CookieAttributes): void => {
  return Cookies.set(name, value, options);
};

// 提取 cookie 值
const getCookieHelper = (name: string): string | undefined => {
  return Cookies.getJSON(name);
};

// 提取所有 cookie 值
const getAllCookiesHelper = (): { [key: string]: string } => {
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

export { setCookieHelper, getCookieHelper, getAllCookiesHelper, removeCookieHelper, uIdHelper };
