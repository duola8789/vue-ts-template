import { MutationTree, GetterTree, ActionTree, ActionContext } from 'vuex';
export interface RootState {}

export interface RootGetter extends GetterTree<RootState, RootState> {}

export interface RootMutations extends MutationTree<RootState> {}

export interface RootActions extends ActionTree<RootState, RootState> {}
