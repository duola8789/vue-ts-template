import {MenuConfig} from './types';

const menuConfigs: MenuConfig[] = [
    {
        path: '/example',
        icon: 'el-icon-location',
        title: 'Example',
        children: [{path: '/hello-vue', title: 'Hello Vue', icon: 'el-icon-location'}]
    }
];

export default menuConfigs;
