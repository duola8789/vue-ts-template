import {Module} from 'vuex';
import {RootState} from '@/store/root-store/interface-types';
import {ExampleState} from '@/store/modules/example-store/interface-types';

export type StoreModuleName = 'example';

export interface StoreModule<T> {
    name: StoreModuleName;
    path: string[];
    content: Module<T, RootState>;
}

export type StoreModules = {
    [keys in StoreModuleName]: StoreModule<ExampleState>;
};
