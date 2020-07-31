import {StoreModules} from './types';
import ExampleStore from '@/store/modules/example-store/index';

const storeModules: StoreModules = {
    example: {
        name: 'example',
        path: ['example'],
        content: ExampleStore
    }
};

export default storeModules;
