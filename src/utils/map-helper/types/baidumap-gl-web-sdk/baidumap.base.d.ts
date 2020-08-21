/* eslint-disable */
// Type definitions for BaiduMap GL

declare namespace BMapGL {
    class Point {
        constructor(lng: number, lat: number);
        lng: number;
        lat: number;
        equals(other: Point): boolean;
    }
    class Pixel {
        constructor(x: number, y: number);
        x: number;
        y: number;
        equals(other: Pixel): boolean;
    }
    class Size {
        constructor(width: number, height: number);
        width: number;
        height: number;
        equals(other: Size): boolean;
    }
    class Bounds {
        constructor(minX: number, minY: number, maxX: number, maxY: number);
        constructor(sw: Point, ne: Point);
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        equals(other: Bounds): boolean;
        containsPoint(point: Point): boolean;
        containsBounds(bounds: Bounds): boolean;
        intersects(other: Bounds): boolean;
        extend(point: Point): void;
        getCenter(): Point;
        isEmpty(): boolean;
        getSouthWest(): Point;
        getNorthEast(): Point;
        toSpan(): Point;
    }
}
