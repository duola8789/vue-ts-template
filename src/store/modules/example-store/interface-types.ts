import {STORE_EXAMPLE_DEMO1} from '@/store/modules/config';

import {MutationTree, GetterTree, ActionTree, ModuleTree, Module} from 'vuex';
import {RootState} from '@/store/root-store/interface-types';
import {Demo1State} from '@/store/modules/example-store/modules/demo1-store/interface-types';

export interface ExampleState {
    test: string;
}

export interface ExampleGetters extends GetterTree<ExampleState, RootState> {}

export interface ExampleMutations extends MutationTree<ExampleState> {}

export interface ExampleActions extends ActionTree<ExampleState, RootState> {}

export interface ExampleModules extends ModuleTree<RootState> {
    [STORE_EXAMPLE_DEMO1]: Module<Demo1State, RootState>;
}
