export type TypeProjectIds = 'GZ_MUJINHUA' | 'BJ_YIZHUANG' | 'CH_CHANGSHA';

export interface TypeProjectInfo {
    projectId: TypeProjectIds;
    projectName: string;
    cityName: string;
    mapCenter: BMap.Point | BMapGL.Point;
    mapZoom: number;
}

export type TypeProjectHash = Record<TypeProjectIds, TypeProjectInfo>;

export type TypeUserPermissionCodes = 0 | 1 | 2;
export type TypeUserPermissionKeys = 'forbidden' | 'user' | 'admin';

export type TypeUserPermissionHash = Record<TypeUserPermissionKeys, TypeUserPermissionCodes>;
