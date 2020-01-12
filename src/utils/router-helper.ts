/**
 * 非开发模式路由懒加载
 * @param componentName `./src/views`下的文件名
 */
const lazyLoadHelper = (componentName: string): any => {
  if (process.env.NODE_ENV === 'development') {
    const comp = require(`@/views/${componentName}.vue`);
    return comp.default || comp;
  }

  return () => import(/* webpackChunkName: "view-[request]-[index]" */ `@/views/${componentName}.vue`);
};

export { lazyLoadHelper };
