import { NavigationGuard } from 'vue-router';

const beforeEachCallback: NavigationGuard = (to, from, next) => {
  next();
};

const beforeResolveCallback: NavigationGuard = (to, from, next) => {
  next();
};

const afterEachCallback: NavigationGuard = (to, from, next) => {
  next();
};

export { beforeEachCallback, beforeResolveCallback, afterEachCallback };
