import {Module} from 'vuex';
import {RootState} from '@/store/root-store/interface-types';
import {ExampleState} from '@/store/modules/example-store/interface-types';

export type StoreModuleName = 'example';

export type StoreModule<T> = {
    name: StoreModuleName;
    path: string;
    content: Module<T, RootState>;
    dynamic?: boolean;
};

export interface StoreModules {
    example: StoreModule<ExampleState>;
}
