import Vue from 'vue';
import Vuex from 'vuex';
import RootStore from '@/store/root-store/index';
import storeModules from '@/store/modules';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: RootStore.state,
    getters: RootStore.getters,
    mutations: RootStore.mutations,
    actions: RootStore.actions,
    modules: {
        [storeModules.example.name]: storeModules.example.content
    }
});
