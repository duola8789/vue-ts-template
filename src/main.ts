import Vue from 'vue';

import './plugins';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/styles/reset.css';
import '@/styles/baidu-map.scss';

Vue.config.productionTip = false;

// 全局异常处理，可以在此添加异常监控和上报
Vue.config.errorHandler = function(err, vm, info) {
    console.group('Local Error Handler');
    console.error('info:', info);
    console.error('vm:', vm);
    console.error('error:', err);
    console.groupEnd();
};

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
