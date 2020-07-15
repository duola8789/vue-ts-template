import {MapInfo} from './types';

// 地图默认缩放
export const DEFAULT_MAP_ZOOM: number = 15;

// 默认地图中心点
export const DEFAULT_MAP_INFO: MapInfo = {
    0: {
        defaultCenter: new BMap.Point(112.897619, 28.19012),
        cityName: '长沙'
    }
};
