import {StoreModules} from './types';
import ExampleStore from '@/store/modules/example-store/index';
import {STORE_EXAMPLE, STORE_EXAMPLE_DEMO1} from '@/store/modules/config';

const storeModules: StoreModules = {
    example: {
        name: 'example',
        path: STORE_EXAMPLE,
        content: ExampleStore,
        children: {
            demo1: `${STORE_EXAMPLE}/${STORE_EXAMPLE_DEMO1}`
        }
    }
};

export default storeModules;
