import { lazyLoadHelper } from '@/utils';
import { RouteConfig } from 'vue-router';

const exampleRoutes: RouteConfig[] = [
  {
    path: '/example/hello-vue',
    name: 'hello-vue',
    component: lazyLoadHelper('example/hello-vue/index'),
    meta: {
      title: 'Hello Vue'
    }
  }
];

export default exampleRoutes;