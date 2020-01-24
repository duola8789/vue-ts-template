import {MutationTree, GetterTree, ActionTree} from 'vuex';
import {RootState} from '@/store/root-store/interface-types';

export interface ExampleState {}

export interface ExampleGetters extends GetterTree<ExampleState, RootState> {}

export interface ExampleMutations extends MutationTree<ExampleState> {}

export interface ExampleActions extends ActionTree<ExampleState, RootState> {}
