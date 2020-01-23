import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import exampleRoutes from '@/router/modules/example.ts';
import {lazyLoadHelper} from '@/utils';
import {beforeEachCallback, beforeResolveCallback, afterEachCallback} from '@/router/router-guards/index';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/login',
        name: 'login',
        component: lazyLoadHelper('common/login/index')
    },
    {
        path: '/',
        name: 'layout',
        component: lazyLoadHelper('common/layout'),
        children: [
            ...exampleRoutes,
            {
                path: '/403',
                name: 'Forbidden',
                component: lazyLoadHelper('common/403')
            },
            {
                path: '*',
                name: 'NotFound',
                component: lazyLoadHelper('common/404')
            }
        ]
    }
];

const router = new VueRouter({routes});

// 全局前置导航
router.beforeEach(beforeEachCallback);

// 全局解析前置
router.beforeResolve(beforeResolveCallback);

// 全局后置
router.beforeResolve(afterEachCallback);

export default router;
