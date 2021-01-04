/**
 * @file 导航守卫
 */
import {NavigationGuard} from 'vue-router';
import {checkLogin, checkPermission, goLogin} from '@/utils';

// 全局前置导航
const beforeEachCallback: NavigationGuard = async (to, from, next) => {
    // 验证登录状态
    const isLoginCheckPassed = checkLogin();
    // 验证失败则退出
    if (!isLoginCheckPassed) {
        goLogin();
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
