import {TypeProjectHash, TypeUserPermissionHash} from './types';

// 兼容百度地图3.0和GL版API
export const MapApi = BMap;
// export const MapApi = BMapGL;

// 项目配置
export const PROJECT_INFO_HASH: TypeProjectHash = {
    CH_CHANGSHA: {
        projectId: 'CH_CHANGSHA',
        projectName: '长沙Robotaxi',
        cityName: '长沙',
        mapCenter: new MapApi.Point(112.897619, 28.19012),
        mapZoom: 15
    },
    BJ_YIZHUANG: {
        projectId: 'BJ_YIZHUANG',
        projectName: '北京亦庄',
        cityName: '北京',
        mapCenter: new MapApi.Point(116.492873, 39.814598),
        mapZoom: 15
    },
    GZ_MUJINHUA: {
        projectId: 'GZ_MUJINHUA',
        projectName: '木槿花',
        cityName: '广州',
        mapCenter: new MapApi.Point(113.459781, 23.17127),
        mapZoom: 15
    }
};

// 用于地图相关变量初始化
export const DEFAULT_PROJECT_INFO = PROJECT_INFO_HASH.CH_CHANGSHA;

export const USER_PERMISSION_HASH: TypeUserPermissionHash = {
    forbidden: 0,
    user: 1,
    admin: 2
};
