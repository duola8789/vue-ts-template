import {ProjectInfo, ProjectIds, TypeUserPermissionHash} from './types';

export const PROJECT_ID: ProjectIds = process.env.VUE_APP_PROJECT_ID;

// 兼容百度地图3.0和GL版API
export const MapApi = BMap;
// export const MapApi = BMapGL;

// 项目配置
export const PROJECT_INFO_HASH: ProjectInfo = {
    1: {
        projectId: 1,
        projectKey: 'CH_CHANGSHA',
        projectName: '长沙Robotaxi',
        cityName: '长沙',
        mapCenter: new MapApi.Point(112.897619, 28.19012),
        mapZoom: 15
    },
    2: {
        projectId: 2,
        projectKey: 'BJ_YIZHUANG',
        projectName: '北京亦庄',
        cityName: '北京',
        mapCenter: new MapApi.Point(116.492873, 39.814598),
        mapZoom: 15
    },
    3: {
        projectId: 3,
        projectKey: 'GZ_MUJINHUA',
        projectName: '木槿花',
        cityName: '广州',
        mapCenter: new MapApi.Point(113.459781, 23.17127),
        mapZoom: 15
    }
};

// 当前项目
export const CURRENT_PROJECT_INFO = PROJECT_INFO_HASH[PROJECT_ID] || PROJECT_INFO_HASH[1];

export const USER_PERMISSION_HASH: TypeUserPermissionHash = {
    forbidden: 0,
    user: 1,
    admin: 2
};
