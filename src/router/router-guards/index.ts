/**
 * @file 导航守卫
 */
import {NavigationGuard} from 'vue-router';
import {CheckPermission, CheckLogin} from './types';
import store from '@/store/index';
import {CommonUrls} from '@/utils';
import {Message} from 'element-ui';
import {
    ROOT_GET_USER_ROLE_ACTION,
    ROOT_LOGOUT_MUTATION,
    ROOT_UPDATE_USER_ROLE_MUTATION
} from '@/store/root-store/store-types';

// 验证登录状态
const checkLogin: CheckLogin = (toPath, fromPath, next) => {
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
const checkPermission: CheckPermission = async (toPath, fromPath, next) => {
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

// 全局前置导航
const beforeEachCallback: NavigationGuard = async (to, from, next) => {
    // 验证登录状态
    const isLoginCheckPassed = checkLogin(to.path, from.path, next);
    // 验证失败则退出
    if (!isLoginCheckPassed) {
        return;
    }

    // 验证权限
    const isPermissionCheckPassed = await checkPermission(to.path, from.path, next);
    // 验证失败则退出
    if (!isPermissionCheckPassed) {
        return;
    }

    // 登陆和权限均通过验证
    next();
};

const beforeResolveCallback: NavigationGuard = (to, from, next) => {
    next();
};

const afterEachCallback: NavigationGuard = (to, from, next) => {
    next();
};

export {beforeEachCallback, beforeResolveCallback, afterEachCallback};
