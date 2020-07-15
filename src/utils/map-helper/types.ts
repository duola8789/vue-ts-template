export type Point = BMap.Point;
export type Map = BMap.Map;
export type Label = BMap.Label;
export type Marker = BMap.Marker;
export type Size = BMap.Size;
export type Polyline = BMap.Polyline;
export type NumberArray2 = [number, number];

export interface InitMap {
    (
        id: string,
        options?: {
            centerPoint?: NumberArray2 | BMap.Point;
            zoom?: number;
            minZoom?: number;
            maxZoom?: number;
            customStyle?: boolean;
            enableMapClick?: boolean;
            enableScrollWheelZoom?: boolean;
            disableDragging?: boolean;
            disableDoubleClickZoom?: boolean;
        }
    ): Promise<Map>;
}

export interface ConvertPoint {
    (point: NumberArray2 | Point, from?: 1 | 5, to?: 1 | 5): Promise<Point> | Point;
}

export interface AddMapMarker {
    (
        map: Map,
        point: NumberArray2 | Point,
        icon: {src: string; size: NumberArray2},
        options?: {
            needScaled?: boolean;
            needAnimation?: boolean;
            animationEffect?: BMap.Animation; // 默认的动画效果
            animationScale?: number;
            animationInfinite?: boolean;
            animationSize?: number;
            iconOffset?: Size;
            iconRotation?: number;
        }
    ): Promise<Marker>;
}

export interface AddMarkerAnimation {
    (
        marker: BMap.Marker,
        options?: {
            size: number;
            scale: number;
            infinite?: boolean;
            needScaled?: boolean;
        }
    ): BMap.Marker;
}

export interface AddMapLabel {
    (
        target: Map | Marker,
        text: string,
        point: NumberArray2 | Point,
        offset: NumberArray2,
        className: string,
        options?: {needTriangle?: boolean; labelStyle?: object; needScaled?: boolean}
    ): Promise<Label>;
}

export interface AddMapLine {
    (
        map: Map,
        line: NumberArray2[] | Point[],
        options?: {
            strokeColor?: string;
            strokeWeight?: number;
            strokeOpacity?: number;
            needScaled?: boolean;
        }
    ): Promise<Polyline>;
}

export interface AddMapLines {
    (
        map: Map,
        lines: NumberArray2[][] | Point[][],
        options?: {
            strokeColor?: string;
            strokeWeight?: number;
            strokeOpacity?: number;
            needScaled?: boolean;
        }
    ): Promise<Polyline[]>;
}

export interface GetMapLocation {
    (point: NumberArray2 | Point): Promise<string>;
}

export interface SetMapCenter {
    (map: Map, point: NumberArray2 | Point): Promise<Map>;
}

export interface SetMapViewport {
    (
        map: Map,
        points: Point[] | NumberArray2[],
        options?: {
            margins?: number[];
            enableAnimation?: boolean;
            zoomFactor?: number;
            delay?: number;
            needScaled?: boolean;
        }
    ): Promise<Map>;
}

export interface ChangeMarkerIcon {
    (
        marker: BMap.Marker,
        options: {
            iconSize: [number, number];
            icon: string;
            withAnimation?: boolean;
            needScaled?: boolean;
            zIndex: number;
        }
    ): BMap.Marker;
}

export interface GetMapBoundsPoint {
    (map: Map): BMap.Point[];
}

export interface AddMapMask {
    (map: Map, options: {fillColor: string; fillOpacity: number}): BMap.Polygon;
}

export interface ResetMap {
    (map: Map, centerPoint?: Point | NumberArray2, zoom?: number): Promise<Map>;
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
        label: BMap.Label,
        content: string,
        iconOffset: NumberArray2,
        options?: {zIndex?: number; needScaled?: boolean}
    ): BMap.Label;
}
