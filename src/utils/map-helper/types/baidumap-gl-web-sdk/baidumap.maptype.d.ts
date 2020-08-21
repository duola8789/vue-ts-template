/* eslint-disable */
// Type definitions for BaiduMap GL

/// <reference path="./baidumap.base.d.ts" />
/// <reference path="./baidumap.maplayer.d.ts" />
declare namespace BMapGL {
    class MapType {
        constructor(name: string, layers: TileLayer | TileLayer[], opts?: MapTypeOptions);
        getName(): string;
        getTileLayer(): TileLayer;
        getMinZoom(): number;
        getMaxZoom(): number;
        getProjection(): Projection;
        getTextColor(): string;
        getTips(): string;
    }
    interface MapTypeOptions {
        minZoom?: number;
        maxZoom?: number;
        errorImageUrl?: string;
        textColor?: number;
        tips?: string;
    }
    interface Projection {
        lngLatToPoint(lngLat: Point): Pixel;
        pointToLngLat(point: Pixel): Point;
    }
    interface MercatorProjection extends Projection {}
    interface PerspectiveProjection extends Projection {}
}

// declare const BMAP_NORMAL_MAP: BMapGL.MapType;
// declare const BMAP_PERSPECTIVE_MAP: BMapGL.MapType;
// declare const BMAP_SATELLITE_MAP: BMapGL.MapType;
// declare const BMAP_HYBRID_MAP: BMapGL.MapType;
