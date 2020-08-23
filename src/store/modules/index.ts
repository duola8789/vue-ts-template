import {StoreModuleName, StoreModules} from './types';
import ExampleStore from '@/store/modules/example-store/index';
import {STORE_EXAMPLE} from '@/store/modules/config';

export const storeModules: StoreModules = {
    example: {
        name: 'example',
        path: STORE_EXAMPLE,
        content: ExampleStore
    }
};

export const modules = Object.keys(storeModules).reduce((total, current) => {
    const targetModule = storeModules[current as StoreModuleName];
    if (!targetModule.dynamic) {
        total[targetModule.path] = targetModule.content;
    }
    return total;
}, {} as any);
