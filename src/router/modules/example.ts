import {lazyLoadHelper} from '@/utils';
import {RouteConfig} from 'vue-router';

const exampleRoutes: RouteConfig[] = [
    {
        path: '',
        redirect: '/example/hello-vue'
    },
    {
        path: '/example/hello-vue',
        component: lazyLoadHelper('example/hello-vue/index')
    }
];

export default exampleRoutes;
