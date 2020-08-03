import {MutationTree, GetterTree, ActionTree} from 'vuex';
import {RootState} from '@/store/root-store/interface-types';

export interface Demo1State {
    test: string;
}

export interface Demo1Getters extends GetterTree<Demo1State, RootState> {}

export interface Demo1Mutations extends MutationTree<Demo1State> {}

export interface Demo1Actions extends ActionTree<Demo1State, RootState> {}
