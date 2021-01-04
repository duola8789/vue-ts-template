/**
 * @file 路由相关辅助函数
 */
import store from '@/store';
import {Message} from 'element-ui';
import {LOGOUT_MUTATION, USER_PERMISSION_ACTION, USER_PERMISSION_MUTATION} from '@/store/root-store/store-types';
import {USER_PERMISSION_HASH} from '@/config';
import {HTTP_CODE_HASH} from '@/utils/network-helper/interceptorHandler';

const IS_DEV_ENV = process.env.NODE_ENV === 'development';

/**
 * 非开发模式路由懒加载
 * @param componentPath `./src/views`下的文件名
 */
export const lazyLoadHelper = (componentPath: string): any => {
    if (process.env.NODE_ENV === 'development') {
        const comp = require(`@/views/${componentPath}.vue`);
        return comp.default || comp;
    }

    return () => import(/* webpackChunkName: "view-[request]-[index]" */ `@/views/${componentPath}.vue`);
};

// 公共路由 Path 常量
export enum CommonUrls {
    Root = '/',
    Login = '/login',
    Forbidden = '/403',
    NotFound = '/404'
}

// 跳转统一登录
export const goLogin = (message = HTTP_CODE_HASH[401], type: 'error' | 'success' = 'error') => {
    Message({
        type,
        message,
        duration: 1500,
        onClose: () => {
            window.sessionStorage.setItem('_robo_login_destination', window.location.href);
            window.location.href = `${window.location.origin}/#/login`;
        }
    });
};

// 验证登录状态
export const checkLogin = () => {
    // 本地环境不验证登陆状态
    if (IS_DEV_ENV) {
        return true;
    }

    const isLogin = store.getters.isLogin();
    if (isLogin) {
        return true;
    } else {
        // 清除登陆信息
        store.commit(LOGOUT_MUTATION);
        return false;
    }
};

// 验证权限
export const checkPermission = async (toPath: string, fromPath: string, next: (to: any) => void) => {
    const uncheckPath = ['/login', '/404'];
    if (uncheckPath.includes(toPath)) {
        return true;
    }

    let hintError = true;

    const permission = store.state.permission;
    if (permission === -1) {
        try {
            // 重新获取权限
            const res = await store.dispatch(USER_PERMISSION_ACTION);
            if (!res) {
                // 重新获取权限失败，清除或重置权限信息
                store.commit(USER_PERMISSION_MUTATION, USER_PERMISSION_HASH.forbidden);
                hintError = false;
            }
        } catch (err) {
            // 重新获取权限失败，清除或重置权限信息
            store.commit(USER_PERMISSION_MUTATION, USER_PERMISSION_HASH.forbidden);
            return false;
        }
    }

    if (toPath === CommonUrls.NotFound) {
        return true;
    }

    const isAuthorized = store.getters.isAuthorized;

    // 针对 403 页面，如果有权限了，跳转根路径，如果没权限，就继续跳到 403
    if (toPath.toLowerCase() === CommonUrls.Forbidden) {
        if (isAuthorized && (!fromPath || fromPath === '/')) {
            next(CommonUrls.Root);
            return false;
        }
        return true;
    }

    if (isAuthorized) {
        return true;
    }

    hintError && Message.error(HTTP_CODE_HASH[403]);

    next(CommonUrls.Forbidden);
    return false;
};
