/**
 * 百度地图相关的辅助方法
 * 关于坐标系转换的说明：所有涉及到坐标点的辅助方法，如果传入的形式为二维数组（[longitude, latitude]）认为是 WGS84 坐标系，会进行坐标转换
 * 如果传入的是 BMap.Point 格式的坐标点，则默认为 bd09 坐标系，不会进行坐标转换
 * 所有坐标二维数组，都需要经度在前，纬度在后
 */
import {
    NumberArray2,
    Point,
    InitMap,
    AddMapIcon,
    AddMapLabel,
    AddMapLines,
    AddMapLine,
    ConvertPoint,
    GetMapLocation,
    SetMapCenter,
    SetMapViewport,
    ChangeMarkerIcon,
    AddMapMask,
    GetMapBoundsPoint
} from './types';
import {styleJson} from '@/utils/map-helper/custorm-style';

import {DEFAULT_MAP_ZOOM} from '@/config';

// 根据屏幕宽度，获取地图尺寸的调整因子，可以手动传入系数
const _getScaleByScreenSize = (handleScale = 1) => {
    const screenWidth = document.documentElement.clientWidth;
    if (screenWidth < 1440) {
        return -0.3 * handleScale;
    }
    if (screenWidth < 1920) {
        return -0.25 * handleScale;
    }
    if (screenWidth < 2560) {
        return 0;
    }
    if (screenWidth < 3840) {
        return 1.3 * handleScale;
    }
    return 2 * handleScale;
};

// 判断是不是一个 bd09 的百度地图坐标点
const _isBMapPoint = (point: any): boolean => !!point && point instanceof BMap.Point;

// 坐标转换：http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition
export const mapConvertor = new BMap.Convertor();

// 地址查询：http://lbsyun.baidu.com/jsdemo.htm#i7_2
export const geoCoder = new BMap.Geocoder();

// 转换坐标点
// 约定：传入的是数组格式那么会转换为 bd09 的坐标点，如果传入的 bd09 坐标点，那么会原样返回
export const convertPoint: ConvertPoint = (point, from = 1, to = 5) => {
    if (_isBMapPoint(point)) {
        return point as Point;
    }
    return new Promise((resolve, reject) => {
        mapConvertor.translate([new BMap.Point(...(point as NumberArray2))], from, to, (res) => {
            // 监控转换失败
            if (!res || res.status !== 0 || !Array.isArray(res.points)) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(res, '坐标点转换失败');
                }
            }
            if (res.status === 0) {
                resolve(res.points[0]);
            } else {
                reject();
            }
        });
    });
};

// 生成地图
export const initMap: InitMap = async (id, options) => {
    const container = document.querySelector(`#${id}`);
    if (!container) {
        throw new Error(`地图容器节点不存在！(id: ${id})`);
    }

    // 转换中心坐标
    const bdCenterPoint = await convertPoint(options.centerPoint);

    const zoom = options && options.zoom ? options.zoom : DEFAULT_MAP_ZOOM;
    const minZoom = options && options.minZoom ? options.minZoom : 5;
    const maxZoom = options && options.maxZoom ? options.maxZoom : 19;

    const styleId = options && options.styleId;

    const enableScrollWheelZoom = options && options.enableScrollWheelZoom === true;
    const enableMapClick = !(options && options.enableMapClick === false);
    const disableDragging = options && options.disableDragging ? options.disableDragging : false;
    const disableDoubleClickZoom = options && options.disableDoubleClickZoom === true;

    const mapOptions = {minZoom, maxZoom, enableMapClick};

    return new Promise((resolve) => {
        const map = new BMap.Map(id, mapOptions);
        map.centerAndZoom(bdCenterPoint, zoom);

        // 自定义地图样式
        if (styleId) {
            map.setMapStyleV2({styleId});
        } else {
            map.setMapStyleV2({styleJson});
        }

        // 	启用滚轮放大缩小
        if (enableScrollWheelZoom) {
            map.enableScrollWheelZoom();
        }

        // 禁用地图拖拽
        if (disableDragging) {
            map.disableDragging();
            map.setDefaultCursor('default');
        }

        // 禁用双击放大
        if (disableDoubleClickZoom) {
            map.disableDoubleClickZoom();
        }

        resolve(map);
    });
};

// 绘制单条线路
export const addMapLine: AddMapLine = async (map, line, options) => {
    const DEFAULT_OPTIONS = {
        strokeColor: '#47dcf3',
        strokeWeight: 4 + _getScaleByScreenSize(2),
        strokeOpacity: 1
    };

    // 处理坐标点
    let convertPoints = [];
    for (const point of line) {
        const isValidPoint = (Array.isArray(point) && point.length > 1) || _isBMapPoint(point);
        if (!isValidPoint) {
            continue;
        }
        convertPoints.push(await convertPoint(point));
    }

    // 描线
    const polyline = new BMap.Polyline(convertPoints, Object.assign({}, DEFAULT_OPTIONS, options));
    map.addOverlay(polyline);

    return polyline;
};

// 绘制多条线路
export const addMapLines: AddMapLines = async (map, lines, options) => {
    const addPromises = (lines as any[]).map((line) => addMapLine(map, line, options));
    return await Promise.all(addPromises);
};

// 添加图标 Icon
export const addMapIcon: AddMapIcon = async (map, point, icon, options) => {
    // Icon 尺寸
    const needScaled = !(options && options.needScaled === false);
    const scaledSize = icon.size.map((v) => _getScaleByScreenSize(needScaled ? v : 0) + v);
    const sizeInMap = new BMap.Size(scaledSize[0], scaledSize[1]);

    // 传入的是二维数组，那么都需要坐标转换，如果传入的 bd09 坐标点，则不需要处理
    const pt = await convertPoint(point);

    const mapIcon = new BMap.Icon(icon.src, sizeInMap);
    mapIcon.setImageSize(sizeInMap);

    let marker = new BMap.Marker(pt, {icon: mapIcon});

    if (options && options.iconOffset) {
        marker.setOffset(options.iconOffset);
    }

    if (options && options.iconRotation) {
        marker.setRotation(options.iconRotation);
    }

    map.addOverlay(marker);

    if (options && options.needAnimation) {
        marker.setAnimation(options.animationEffect);
    }

    return marker;
};

// 添加文本框
export const addMapLabel: AddMapLabel = async (target, text, point, offset, className, options) => {
    const needTriangle = options && options.needTriangle === true;
    const needScaled = !(options && options.needScaled === false);
    const scaledOffsetY = needScaled ? _getScaleByScreenSize(offset[1] * 0.75) + offset[1] : offset[1];

    // 文本标注所在的地理位置
    const pt = await convertPoint(point);

    // label 的参数
    const opts = {
        position: pt,
        // 设置文本偏移量
        offset: new BMap.Size(offset[0], scaledOffsetY)
    };

    // label 的 html 节点
    // map-label-triangle 样式需要在组件中手动调用 .map-label-triangle() 样式 mixin
    const content =
        `<div class="${className}">` +
        `<div class="map-label-text">${text}</div>` +
        `${needTriangle ? '<div class="map-label-triangle"></div>' : ''}` +
        '</div>';
    const label = new BMap.Label(content, opts);

    // label 外围样式，内部样式通过上面的节点类在自行定义
    const DEFAULT_LABEL_STYLE = {
        padding: 0,
        border: 'none',
        background: 'none'
    };
    const labelStyle =
        options && options.labelStyle
            ? Object.assign({}, DEFAULT_LABEL_STYLE, options.labelStyle)
            : DEFAULT_LABEL_STYLE;
    label.setStyle(labelStyle);

    // label 标题
    label.setTitle(text);

    if (target instanceof BMap.Map) {
        target.addOverlay(label);
    } else {
        target.setLabel(label);
    }

    return label;
};

// 根据 IP 地址获取文字描述
export const getMapLocation: GetMapLocation = async (point) => {
    const pt = await convertPoint(point);

    return new Promise((resolve) => {
        geoCoder.getLocation(pt, (rs) => {
            if (rs) {
                resolve(rs.address || '未知地点');
            } else {
                resolve('未知地点');
                throw new Error(`坐标点获取地理位置失败, [${pt.lng}, ${pt.lat}]`);
            }
        });
    });
};

// 设定中心
export const setMapCenter: SetMapCenter = async (map, point) => {
    let pt = await convertPoint(point);
    map.setCenter(pt);
    return map;
};

// 根据传入的点设置地图视野
export const setMapViewport: SetMapViewport = async (map, points, options) => {
    // 处理坐标点
    let convertPoints: Point[] = [];
    for (const point of points) {
        const isValidPoint = (Array.isArray(point) && point.length > 1) || _isBMapPoint(point);
        if (!isValidPoint) {
            continue;
        }
        convertPoints.push(await convertPoint(point));
    }

    const opt = {
        zoomFactor: options && options.zoomFactor ? options.zoomFactor : 0,
        enableAnimation: true,
        margins: options && options.margins ? options.margins : [0, 0, 0, 0],
        delay: 200
    };
    return new Promise(async (resolve) => {
        map.setViewport(convertPoints, opt);
        resolve(map);
    });
};

// 更换 marker 的 icon
export const changeMarkerIcon: ChangeMarkerIcon = (marker, iconSize, icon, withAnimation = false) => {
    // 获取当前 icon
    const targetIcon = marker.getIcon();
    if (targetIcon) {
        // 设置 icon 图片
        targetIcon.setImageUrl(icon);
        // 设置 icon 图片尺寸
        targetIcon.setImageSize(new BMap.Size(...iconSize));
        // 恢复 icon 尺寸
        targetIcon.setSize(new BMap.Size(...iconSize));
        // 恢复 icon 偏移量
        targetIcon.setAnchor(new BMap.Size(iconSize[0] / 2, iconSize[1] / 2));
        // 设置 icon
        marker.setIcon(targetIcon);
        // 如果 marker 设置了动画效果，那么更改图标时需要清除
        if (withAnimation) {
            marker.getLabel().setStyle({display: 'none'});
        }
    }
    return marker;
};

// 获取地图的边界定点组成的数组，顺序为[西北角、东北角、东南角、西南角]
export const getMapBoundsPoint: GetMapBoundsPoint = (map) => {
    const bounds = map.getBounds();
    const SW = bounds.getSouthWest();
    const NE = bounds.getNorthEast();
    const NW = new BMap.Point(SW.lng, NE.lat);
    const SE = new BMap.Point(NE.lng, SW.lat);
    return [NW, NE, SE, SW];
};

// 添加蒙层
export const addMapMask: AddMapMask = (map, options) => {
    const polyOptions = {
        strokeColor: 'none',
        fillColor: options.fillColor,
        fillOpacity: options.fillOpacity,
        strokeOpacity: 1
    };
    const points = getMapBoundsPoint(map);
    const mask = new BMap.Polygon(points, polyOptions);
    map.addOverlay(mask);
    return mask;
};
