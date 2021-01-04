export type TypeNumberArray2 = [number, number];

export interface TypeInitMapOptions {
    centerPoint?: TypeNumberArray2 | TypeRPoint;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    customStyle?: boolean;
    enableMapClick?: boolean;
    enableScrollWheelZoom?: boolean;
    disableDragging?: boolean;
    disableDoubleClickZoom?: boolean;
}

export interface TypeInitMap {
    (id: string, options?: TypeInitMapOptions): Promise<TypeRMap>;
}

export interface TypeConvertPoint {
    (point: TypeNumberArray2 | TypeRPoint, from?: 1 | 5, to?: 1 | 5): TypeRPoint;
}

export interface TypeAddMapMarker {
    (
        point: TypeNumberArray2 | TypeRPoint,
        icon: {src: string; size: TypeNumberArray2; anchor?: TypeNumberArray2},
        options?: {
            needScaled?: boolean;
            rotation?: number;
            labelOffset?: TypeNumberArray2;
            needAnimation?: boolean;
            animationEffect?: TypeRAnimation; // 默认的动画效果
            animationScale?: number;
            animationInfinite?: boolean;
            animationSize?: number;
        }
    ): TypeRMarker;
}

export interface TypeAddMarkerAnimation {
    (
        marker: TypeRMarker,
        options?: {
            size: number;
            scale: number;
            infinite?: boolean;
            needScaled?: boolean;
        }
    ): TypeRMarker;
}

export interface TypeAddCommonLabel {
    (
        target: TypeRMap | TypeRMarker,
        content: string,
        point?: TypeNumberArray2 | TypeRPoint,
        options?: {labelStyle?: object; needScaled?: boolean}
    ): TypeRLabel;
}

export interface TypeAddMapLabel {
    (
        target: TypeRMap | TypeRMarker,
        text: string,
        point: TypeNumberArray2 | TypeRPoint,
        offset: TypeNumberArray2,
        className: string,
        options?: {needTriangle?: boolean; labelStyle?: object; needScaled?: boolean}
    ): TypeRLabel;
}

export interface TypeAddMapLineOption {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    needScaled?: boolean;
}

export interface TypeAddMapLine {
    (map: TypeRMap, line: TypeNumberArray2[] | TypeRPoint[], options?: TypeAddMapLineOption): TypeRPolyline;
}

export interface TypeAddMapLines {
    (map: TypeRMap, lines: TypeRPoint[][] | TypeNumberArray2[], options?: TypeAddMapLineOption): TypeRPolyline[];
}

export interface TypeGetMapLocation {
    (point: TypeNumberArray2 | TypeRPoint): Promise<string>;
}

export interface TypeSetMapCenter {
    (map: TypeRMap, point: TypeNumberArray2 | TypeRPoint): void;
}

export interface TypeSetMapViewport {
    (
        map: TypeRMap,
        points: TypeRPoint[] | TypeNumberArray2[],
        options?: {
            margins?: number[];
            enableAnimation?: boolean;
            zoomFactor?: number;
            delay?: number;
            needScaled?: boolean;
        }
    ): void;
}

export interface TypeChangeMarkerIcon {
    (
        marker: TypeRMarker,
        options: {
            iconSize: TypeNumberArray2;
            icon: string;
            withAnimation?: boolean;
            needScaled?: boolean;
            zIndex?: number;
            anchor?: TypeNumberArray2;
        }
    ): TypeRMarker;
}

export interface TypeGetMapBoundsPoint {
    (map: TypeRMap): TypeRPoint[];
}

export interface TypeAddMapMask {
    (map: TypeRMap, options: {fillColor: string; fillOpacity: number}): TypeRPolygon;
}

export interface TypeResetMap {
    (map: TypeRMap, centerPoint?: TypeRPoint, zoom?: number, noAnimation?: boolean): void;
}

export interface TypeChangeLabelContent {
    (
        label: TypeRLabel,
        content: string,
        iconOffset: TypeNumberArray2,
        options?: {zIndex?: number; needScaled?: boolean}
    ): TypeRLabel;
}
