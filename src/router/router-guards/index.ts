/**
 * @file 导航守卫
 */
import {NavigationGuard} from 'vue-router';
import {NextSteps, GetLoginCheckNextStep, GetRoleCheckNextStep} from './types';
import store from '@/store/index';
import {CommonUrls} from '@/utils';
import {Message} from 'element-ui';
import {ROOT_LOGOUT_MUTATION} from '@/store/root-store/store-types';

// 验证登陆状态
const getLoginCheckNextStep: GetLoginCheckNextStep = (toPath) => {
    const isLogin = store.getters.isLogin();
    switch (toPath.toLowerCase()) {
        case CommonUrls.Login: {
            return isLogin ? NextSteps.Root : NextSteps.Next;
        }
        default: {
            return isLogin ? NextSteps.Next : NextSteps.Login;
        }
    }
};

// 验证权限
const getRoleCheckNextStep: GetRoleCheckNextStep = (toPath) => {
    const isAuthorized = store.getters.isAuthorized;
    // 以这些 url 卡头的路径不需要验证权限
    const isNoCheckPath = [CommonUrls.Login, CommonUrls.NotFound, CommonUrls.Forbidden].some(
        (path) => path === toPath.toLocaleLowerCase()
    );
    if (isNoCheckPath) {
        return NextSteps.Next;
    }
    return isAuthorized ? NextSteps.Next : NextSteps.Forbidden;
};

// 全局前置导航
const beforeEachCallback: NavigationGuard = (to, from, next) => {
    // 验证登陆状态
    const loginNextStep = getLoginCheckNextStep(to.path);
    if (loginNextStep === NextSteps.Login) {
        Message.error('登陆信息失效，请重新登陆');
        store.commit(ROOT_LOGOUT_MUTATION);
        next(CommonUrls.Login);
        return;
    }
    if (loginNextStep === NextSteps.Stay) {
        next(false);
        return;
    }
    if (loginNextStep === NextSteps.Root) {
        next(CommonUrls.Root);
        return;
    }
    next();

    // 验证权限
    const roleNextStep = getRoleCheckNextStep(to.path);
    if (roleNextStep === NextSteps.Forbidden) {
        Message.error('您没有此模块访问权限，如有需要请与管理员联系');
        next(CommonUrls.Forbidden);
        return;
    }
    next();
};

const beforeResolveCallback: NavigationGuard = (to, from, next) => {
    next();
};

const afterEachCallback: NavigationGuard = (to, from, next) => {
    next();
};

export {beforeEachCallback, beforeResolveCallback, afterEachCallback};
