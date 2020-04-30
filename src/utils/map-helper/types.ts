export type Point = BMap.Point;
export type Map = BMap.Map;
export type Label = BMap.Label;
export type Marker = BMap.Marker;
export type Size = BMap.Size;
export type Polyline = BMap.Polyline;
export type NumberArray2 = [number, number];

export interface RoboMapOptions {
    centerPoint: NumberArray2 | BMap.Point;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    styleId?: string;
    enableMapClick?: boolean;
    enableScrollWheelZoom?: boolean;
    disableDragging?: boolean;
    disableDoubleClickZoom?: boolean;
}

export interface RoboMapLineOptions {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
}

export interface InitMap {
    (id: string, options: RoboMapOptions): Promise<Map>;
}

export interface ConvertPoint {
    (point: NumberArray2 | Point, from?: number, to?: number): Promise<Point> | Point;
}

export interface AddMapIcon {
    (
        map: Map,
        point: NumberArray2 | Point,
        icon: {src: string; size: NumberArray2},
        options?: {
            needScaled?: boolean;
            needAnimation?: boolean;
            iconOffset?: Size;
            iconRotation?: number;
            animationEffect?: BMap.Animation; // 默认的动画效果
            animationInfinite?: boolean;
        }
    ): Promise<Marker>;
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
    (map: Map, line: NumberArray2[] | Point[], options: RoboMapLineOptions): Promise<Polyline>;
}

export interface AddMapLines {
    (map: Map, lines: NumberArray2[][] | Point[][], options: RoboMapLineOptions): Promise<Polyline[]>;
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
        }
    ): Promise<Map>;
}

export interface ChangeMarkerIcon {
    (marker: BMap.Marker, iconSize: [number, number], icon: string, withAnimation?: boolean): BMap.Marker;
}

export interface GetMapBoundsPoint {
    (map: Map): BMap.Point[];
}

export interface AddMapMask {
    (map: Map, options: {fillColor: string; fillOpacity: number}): BMap.Polygon;
}
