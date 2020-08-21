export type ProjectIds = 1 | 2 | 3;

export type ProjectKeys = 'GZ_MUJINHUA' | 'BJ_YIZHUANG' | 'CH_CHANGSHA';

export type ProjectInfo = {
    [keys in ProjectIds]: {
        projectId: ProjectIds;
        projectKey: ProjectKeys;
        projectName: string;
        cityName: string;
        mapCenter: BMap.Point | BMapGL.Point;
        mapZoom: number;
    };
};
