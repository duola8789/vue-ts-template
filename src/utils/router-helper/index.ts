/**
 * @file 路由相关辅助函数
 */
import {CheckLogin, CheckPermission} from './types';
import store from '@/store';
import {Message} from 'element-ui';
import {
    ROOT_GET_USER_ROLE_ACTION,
    ROOT_LOGOUT_MUTATION,
    ROOT_UPDATE_USER_ROLE_MUTATION
} from '@/store/root-store/store-types';

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

// 验证登录状态
export const checkLogin: CheckLogin = (toPath, fromPath, next) => {
    const isLogin = store.getters.isLogin();
    if (toPath.toLocaleLowerCase() === CommonUrls.Login) {
        if (isLogin) {
            next(CommonUrls.Root);
            return false;
        } else {
            return true;
        }
    } else {
        if (isLogin) {
            return true;
        } else {
            // 从根目录过来时不提示
            if (![CommonUrls.Root as string, CommonUrls.Login as string].includes(fromPath)) {
                Message.error('登录信息失效，请重新登录');
            }
            // 清除登陆信息
            store.commit(ROOT_LOGOUT_MUTATION);
            next(CommonUrls.Login);
            return false;
        }
    }
};

// 验证权限
export const checkPermission: CheckPermission = async (toPath, fromPath, next) => {
    // 以这些 url 卡头的路径不需要验证权限
    const isNoCheckPath = [CommonUrls.Login, CommonUrls.NotFound].some((path) => path === toPath.toLocaleLowerCase());
    if (isNoCheckPath) {
        return true;
    }
    const role = store.state.role;
    if (!role) {
        try {
            // 重新获取权限
            await store.dispatch(ROOT_GET_USER_ROLE_ACTION);
        } catch (e) {
            // 重新获取权限失败，清除或重置权限信息
            store.commit(ROOT_UPDATE_USER_ROLE_MUTATION, 'user');
        }
    }
    const isAuthorized = store.getters.isAuthorized;
    if (toPath.toLocaleLowerCase() === CommonUrls.Forbidden) {
        if (isAuthorized) {
            next(CommonUrls.Root);
            return false;
        } else {
            return true;
        }
    } else {
        if (isAuthorized) {
            return true;
        } else {
            Message.error('您没有此模块访问权限，如有需要请与管理员联系');
            next(CommonUrls.Forbidden);
            return false;
        }
    }
};
