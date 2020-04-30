import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import {lazyLoadHelper} from '@/utils';
import {beforeEachCallback, beforeResolveCallback, afterEachCallback} from '@/router/router-guards/index';
import {CommonUrls} from '@/utils';

import exampleRoutes from '@/router/modules/example.ts';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: CommonUrls.Login,
        component: lazyLoadHelper('pages/common/login/index')
    },
    {
        path: CommonUrls.Root,
        component: lazyLoadHelper('pages/root/index'),
        children: [
            ...exampleRoutes,
            {
                path: CommonUrls.Forbidden,
                component: lazyLoadHelper('pages/common/403')
            },
            {
                path: CommonUrls.NotFound,
                component: lazyLoadHelper('pages/common/404')
            },
            {
                path: '*',
                redirect: CommonUrls.NotFound
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
