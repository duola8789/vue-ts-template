import Vue from 'vue';

import '@/plugins';
import '@/directives';

import App from './App.vue';
import router from './router';
import store from './store';

import '@/styles/reset.css';
import '@/styles/baidu-map.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
