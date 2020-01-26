/**
 * @file 导航守卫
 */
import {NavigationGuard} from 'vue-router';
import {NextSteps, GetLoginCheckNextStep} from './types';
import store from '@/store/index';
import {CommonUrls} from '@/router/types';

// 验证登陆状态
const getLoginCheckNextStep: GetLoginCheckNextStep = (toPath) => {
    const isLogin = store.getters.isLogin();
    switch (toPath.toLowerCase()) {
        case CommonUrls.Login: {
            return isLogin ? NextSteps.Stay : NextSteps.Next;
        }
        default: {
            return isLogin ? NextSteps.Next : NextSteps.Login;
        }
    }
};

// 全局前置导航
const beforeEachCallback: NavigationGuard = (to, from, next) => {
    const loginNextStep = getLoginCheckNextStep(to.path);
    if (loginNextStep === NextSteps.Login) {
        next(CommonUrls.Login);
        return;
    }
    if (loginNextStep === NextSteps.Stay) {
        next(false);
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
