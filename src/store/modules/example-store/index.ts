import {ExampleState, ExampleGetters, ExampleMutations, ExampleActions, ExampleModules} from './interface-types';
import {STORE_EXAMPLE_DEMO1} from '@/store/modules/config';

import Demo1Store from './modules/demo1-store/index';

const state: ExampleState = {
    test: 'Hello'
};

const getters: ExampleGetters = {};

const mutations: ExampleMutations = {};

const actions: ExampleActions = {};

const modules: ExampleModules = {
    [STORE_EXAMPLE_DEMO1]: Demo1Store
};

export default {namespaced: true, state, getters, mutations, actions, modules};
