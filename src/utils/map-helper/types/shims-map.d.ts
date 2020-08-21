/**
 * 补充百度地图 @types/baidumap-web-sdk
 *
 */
// V3.0
declare namespace BMap {
    interface MapStyleV2 {
        styleId: string;
        [keys: string]: any;
    }
    interface Map {
        destroy?(): void;
        setMapStyleV2(mapStyleV2: MapStyleV2 | any[]): void;
        setMapStyleV2(styleJson: any): void;
        setMapStyle(styleJson: any): void;
        addEventListener(type: string, cb: (type: string, target: any) => void): void;
        removeEventListener(type: string, cb: (type: string, target: any) => void): void;
        setCenter(center: Point | string, options?: {noAnimation: boolean}): void;
        setZoom(zoom: number, options?: {noAnimation: boolean}): void;
    }
    interface Marker {
        extraInfo: any;
    }
    interface Label {
        extraInfo: any;
    }
    interface MarkerEvent extends Marker {
        target: BMap.Marker;
        point: Point;
    }
    class Overlay {
        initialize?(map: Map): HTMLElement;
        isVisible?(): boolean;
        draw?(): void;
        show?(): void;
        hide?(): void;
    }
}

// GL
declare namespace BMapGL {
    interface MapStyleV2 {
        styleId: string;
        [keys: string]: any;
    }
    interface Map {
        destroy(): void;
        setMapStyleV2(mapStyleV2: MapStyleV2 | any[]): void;
        setMapStyleV2(styleJson: any): void;
        setMapStyle(styleJson: any): void;
        addEventListener(type: string, cb: (type: string, target: any) => void): void;
        removeEventListener(type: string, cb: (type: string, target: any) => void): void;
        setCenter(center: Point | string, options?: {noAnimation: boolean}): void;
        setZoom(zoom: number, options?: {noAnimation: boolean}): void;
        loadMapStyleFiles(cb: () => void): void;
        hideOverlayContainer(): void;
        showOverlayContainer(): void;
    }
    interface Marker {
        extraInfo: any;
    }
    interface Label {
        extraInfo: any;
    }
    interface MarkerEvent extends Marker {
        target: BMapGL.Marker;
        point: Point;
    }
    class Overlay {
        initialize?(map: Map): HTMLElement;
        isVisible?(): boolean;
        draw?(): void;
        show?(): void;
        hide?(): void;
    }
}

// type TypeRMap = BMapGL.Map;
// type TypeRPoint = BMapGL.Point;
// type TypeRLabel = BMapGL.Label;
// type TypeRMarker = BMapGL.Marker;
// type TypeRSize = BMapGL.Size;
// type TypeRPolyline = BMapGL.Polyline;
// type TypeRAnimation = BMapGL.Animation;
// type TypeRPolygon = BMapGL.Polygon;

type TypeRMap = BMap.Map;
type TypeRPoint = BMap.Point;
type TypeRLabel = BMap.Label;
type TypeRMarker = BMap.Marker;
type TypeRSize = BMap.Size;
type TypeRPolyline = BMap.Polyline;
type TypeRAnimation = BMap.Animation;
type TypeRPolygon = BMap.Polygon;

interface BaiduEvent extends Event {
    pixel: {x: number; y: number};
}

declare namespace BMapLib {
    class MarkerClusterer {
        constructor(
            map: TypeRMap,
            params: {
                markers: TypeRMarker[];
                gridSize?: number;
                maxZoom?: number;
                styles?: any[];
                anchor?: TypeRSize | [number, number];
                margins?: number[];
                styleInterval?: number | number[];
                hoverStyles?: any[];
                maxZoomCb?: (markers: TypeRMarker[], event: BaiduEvent) => void;
                maxText?: number;
            }
        );
        setStyles(style: any[]): void;
        getStyles(): any[];
        clearMarkers(): void;
        removeMarkers(makers: TypeRMarker[]): void;
        addMarkers(makers: TypeRMarker[]): void;
        addMarker(maker: TypeRMarker): void;
        removeMarker(maker: TypeRMarker): void;
        getMarkers(): TypeRMarker[];
    }
    class TextIconOverlay {
        constructor(map: TypeRMap, params: {markers: BMap.Marker[]}, isRich: boolean);
    }
}
