import {ExampleState, ExampleGetters, ExampleMutations, ExampleActions, ExampleModules} from './interface-types';

const state: ExampleState = {
    test: 'Hello'
};

const getters: ExampleGetters = {};

const mutations: ExampleMutations = {};

const actions: ExampleActions = {};

const modules: ExampleModules = {};

export default {namespaced: true, state, getters, mutations, actions, modules};
