/**
 * 补充百度地图 @types/baidumap-web-sdk
 *
 */
declare namespace BMap {
    interface MapStyleV2 {
        styleId: string;
        [keys: string]: any;
    }
    interface Map {
        setMapStyleV2(mapStyleV2: MapStyleV2 | any[]): void;
        setMapStyleV2(styleJson: any): void;
        setMapStyle(styleJson: any): void;
        addEventListener(type: string, cb: (type: string, target: any) => void): void;
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

declare namespace BMapLib {
    class MarkerClusterer {
        constructor(
            map: BMap.Map,
            params: {markers: BMap.Marker[]; gridSize?: number; maxZoom?: number; styles?: any[]; margins?: number[]},
            isRich?: boolean
        );
        setStyles(style: any[]): void;
        getStyles(): any[];
        clearMarkers(): void;
        removeMarkers(makers: BMap.Marker[]): void;
        addMarkers(makers: BMap.Marker[]): void;
        addMarker(maker: BMap.Marker): void;
        removeMarker(maker: BMap.Marker): void;
        getMarkers(): BMap.Marker[];
    }
    class TextIconOverlay {
        constructor(map: BMap.Map, params: {markers: BMap.Marker[]}, isRich: boolean);
    }
}
