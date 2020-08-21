export type NumberArray2 = [number, number];

export interface InitMapOptions {
    centerPoint?: NumberArray2 | TypeRPoint;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    customStyle?: boolean;
    enableMapClick?: boolean;
    enableScrollWheelZoom?: boolean;
    disableDragging?: boolean;
    disableDoubleClickZoom?: boolean;
}

export interface InitMap {
    (id: string, options?: InitMapOptions): Promise<TypeRMap>;
}

export interface ConvertPoint {
    (point: NumberArray2 | TypeRPoint, from?: 1 | 5, to?: 1 | 5): TypeRPoint;
}

export interface AddMapMarker {
    (
        point: NumberArray2 | TypeRPoint,
        icon: {src: string; size: NumberArray2; anchor?: NumberArray2},
        options?: {
            needScaled?: boolean;
            rotation?: number;
            labelOffset?: NumberArray2;
            needAnimation?: boolean;
            animationEffect?: TypeRAnimation; // 默认的动画效果
            animationScale?: number;
            animationInfinite?: boolean;
            animationSize?: number;
        }
    ): TypeRMarker;
}

export interface AddMarkerAnimation {
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

export interface AddCommonLabel {
    (
        target: TypeRMap | TypeRMarker,
        content: string,
        point?: NumberArray2 | TypeRPoint,
        options?: {labelStyle?: object; needScaled?: boolean}
    ): TypeRLabel;
}

export interface AddMapLabel {
    (
        target: TypeRMap | TypeRMarker,
        text: string,
        point: NumberArray2 | TypeRPoint,
        offset: NumberArray2,
        className: string,
        options?: {needTriangle?: boolean; labelStyle?: object; needScaled?: boolean}
    ): TypeRLabel;
}

export interface AddMapLineOption {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    needScaled?: boolean;
}

export interface AddMapLine {
    (map: TypeRMap, line: NumberArray2[] | TypeRPoint[], options?: AddMapLineOption): TypeRPolyline;
}

export interface AddMapLines {
    (map: TypeRMap, lines: TypeRPoint[][] | NumberArray2[], options?: AddMapLineOption): TypeRPolyline[];
}

export interface GetMapLocation {
    (point: NumberArray2 | TypeRPoint): Promise<string>;
}

export interface SetMapCenter {
    (map: TypeRMap, point: NumberArray2 | TypeRPoint): void;
}

export interface SetMapViewport {
    (
        map: TypeRMap,
        points: TypeRPoint[] | NumberArray2[],
        options?: {
            margins?: number[];
            enableAnimation?: boolean;
            zoomFactor?: number;
            delay?: number;
            needScaled?: boolean;
        }
    ): void;
}

export interface ChangeMarkerIcon {
    (
        marker: TypeRMarker,
        options: {
            iconSize: NumberArray2;
            icon: string;
            withAnimation?: boolean;
            needScaled?: boolean;
            zIndex?: number;
            anchor?: NumberArray2;
        }
    ): TypeRMarker;
}

export interface GetMapBoundsPoint {
    (map: TypeRMap): TypeRPoint[];
}

export interface AddMapMask {
    (map: TypeRMap, options: {fillColor: string; fillOpacity: number}): TypeRPolygon;
}

export interface ResetMap {
    (map: TypeRMap, centerPoint?: TypeRPoint, zoom?: number, noAnimation?: boolean): void;
}

export interface GetLabelOffsetYByHeadingAngle {
    (
        labelHeight: number,
        baseGap: number,
        headingAngle: number,
        options?: {
            needScaled?: boolean;
        }
    ): number;
}

export interface ChangeLabelContent {
    (
        label: TypeRLabel,
        content: string,
        iconOffset: NumberArray2,
        options?: {zIndex?: number; needScaled?: boolean}
    ): TypeRLabel;
}
