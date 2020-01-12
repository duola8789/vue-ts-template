/**
 * 在 index 中定义 store 的具体实现
 * 在 interface-types 定义 store 中相关实现的 TypeScript 类型接口
 * 在 store-types 定义 store 中使用的 Mutation/Action Type 常量
 */
import { RootState, RootGetter, RootMutations, RootActions } from '@/store/root-store/interface-types';

const state: RootState = {};

const getters: RootGetter = {};

const mutations: RootMutations = {};

const actions: RootActions = {};

export default { state, getters, mutations, actions };
