import { MenuConfig } from '@/views/common/menu/types';

const menuConfigs: MenuConfig[] = [
  {
    path: '/example',
    icon: 'el-icon-location',
    title: 'Example',
    children: [{ path: '/example/hello-vue', title: 'Hello Vue', icon: 'el-icon-location' }]
  }
];

export default menuConfigs;
