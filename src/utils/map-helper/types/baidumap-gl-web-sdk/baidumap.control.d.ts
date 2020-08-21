/* eslint-disable */
// Type definitions for BaiduMap GL

/// <reference path="./baidumap.base.d.ts" />
/// <reference path="./baidumap.maptype.d.ts" />
/// <reference path="./baidumap.overlay.d.ts" />
declare namespace BMapGL {
    class Control {
        constructor();
        defaultAnchor: ControlAnchor;
        defaultOffset: Size;
        initialize(map: Map): HTMLElement;
        setAnchor(anchor: ControlAnchor): void;
        getAnchor(): ControlAnchor;
        setOffset(offset: Size): void;
        getOffset(): Size;
        show(): void;
        hide(): void;
        isVisible(): boolean;
    }
    interface NavigationControlOptions {
        anchor?: ControlAnchor;
        offset?: Size;
        type?: NavigationControlType;
        showZoomInfo?: boolean;
        enableGeolocation?: boolean;
    }
    interface ScaleControlOptions {
        anchor?: ControlAnchor;
        offset?: Size;
    }
    interface CopyrightControlOptions {
        anchor?: ControlAnchor;
        offset?: Size;
    }
    type ControlAnchor = number;
    class OverviewMapControl extends Control {
        constructor(opts: OverviewMapControlOptions);
        changeView(): void;
        setSize(size: Size): void;
        getSize(): Size;
        onviewchanged: (event: {type: string; target: any; isOpen: boolean}) => void;
        onviewchanging: (event: {type: string; target: any}) => void;
    }
    type LengthUnit = string;
    class MapTypeControl extends Control {
        constructor(opts?: MapTypeControlOptions);
    }
    class NavigationControl extends Control {
        constructor(opts?: NavigationControlOptions);
        getType(): NavigationControlOptions;
        setType(type: NavigationControlType): void;
    }
    interface OverviewMapControlOptions {
        anchor?: ControlAnchor;
        offset?: Size;
        size?: Size;
        isOpen?: boolean;
    }
    class CopyrightControl extends Control {
        constructor(opts?: CopyrightControlOptions);
        addCopyright(copyright: Copyright): void;
        removeCopyright(id: number): void;
        getCopyright(id: number): Copyright;
        getCopyrightCollection(): Copyright[];
    }
    interface MapTypeControlOptions {
        type?: MapTypeControlType;
        mapTypes?: MapType[];
    }
    type NavigationControlType = number;
    class ScaleControl extends Control {
        constructor(opts?: ScaleControlOptions);
        getUnit(): LengthUnit;
        setUnit(unit: LengthUnit): void;
    }
    interface Copyright {
        id?: number;
        content?: string;
        bounds?: Bounds;
    }
    type MapTypeControlType = number;
    class GeolocationControl extends Control {
        constructor(opts?: GeolocationControlOptions);
    }
    interface GeolocationControlOptions {
        anchor?: ControlAnchor;
        offset?: Size;
        showAddressBar?: boolean;
        enableAutoLocation?: boolean;
        locationIcon?: Icon;
    }
    type StatusCode = number;
    class PanoramaControl extends Control {
        constructor();
    }
}

// declare const BMAP_UNIT_METRIC: BMap.LengthUnit
// declare const BMAP_UNIT_IMPERIAL: BMap.LengthUnit
//
// declare const BMAP_ANCHOR_TOP_LEFT: BMap.ControlAnchor
// declare const BMAP_ANCHOR_TOP_RIGHT: BMap.ControlAnchor
// declare const BMAP_ANCHOR_BOTTOM_LEFT: BMap.ControlAnchor
// declare const BMAP_ANCHOR_BOTTOM_RIGHT: BMap.ControlAnchor
//
// declare const BMAP_NAVIGATION_CONTROL_LARGE: BMap.NavigationControlType
// declare const BMAP_NAVIGATION_CONTROL_SMALL: BMap.NavigationControlType
// declare const BMAP_NAVIGATION_CONTROL_PAN: BMap.NavigationControlType
// declare const BMAP_NAVIGATION_CONTROL_ZOOM: BMap.NavigationControlType
//
// declare const BMAP_MAPTYPE_CONTROL_HORIZONTAL: BMap.MapTypeControlType
// declare const BMAP_MAPTYPE_CONTROL_DROPDOWN: BMap.MapTypeControlType
// declare const BMAP_MAPTYPE_CONTROL_MAP: BMap.MapTypeControlType
//
// declare const BMAP_STATUS_PERMISSION_DENIED: BMap.StatusCode
// declare const BMAP_STATUS_SERVICE_UNAVAILABLE: BMap.StatusCode
// declare const BMAP_STATUS_TIMEOUT: BMap.StatusCode
