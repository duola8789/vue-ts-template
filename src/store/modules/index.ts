import {StoreModules} from './types';
import ExampleStore from '@/store/modules/example-store/index';
import {STORE_EXAMPLE} from '@/store/modules/config';

const storeModules: StoreModules = {
    example: {
        name: 'example',
        path: STORE_EXAMPLE,
        content: ExampleStore
    }
};

export default storeModules;
