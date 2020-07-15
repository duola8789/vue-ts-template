/**
 * 百度地图相关的辅助方法
 * 关于坐标系转换的说明：所有涉及到坐标点的辅助方法，如果传入的形式为二维数组（[longitude, latitude]）认为是 WGS84 坐标系，会进行坐标转换
 * 如果传入的是 BMap.Point 格式的坐标点，则默认为 bd09 坐标系，不会进行坐标转换
 * 所有坐标二维数组，都需要经度在前，纬度在后
 */
import {
    Point,
    InitMap,
    AddMapMarker,
    AddMapLabel,
    AddMapLines,
    AddMapLine,
    ConvertPoint,
    GetMapLocation,
    SetMapCenter,
    SetMapViewport,
    ChangeMarkerIcon,
    AddMapMask,
    GetMapBoundsPoint,
    AddMarkerAnimation,
    ResetMap,
    GetLabelOffsetYByHeadingAngle,
    ChangeLabelContent
} from './types';
import {styleJson} from '@/utils/map-helper/custorm-style';

import {DEFAULT_MAP_ZOOM, DEFAULT_MAP_INFO} from '@/config';
import {Position} from 'gcoord/dist/types/geojson';
import {transform, WGS84, BD09} from 'gcoord';
import {getWithByScreen, mathRound} from '@/utils';

// 判断是不是一个 bd09 的百度地图坐标点
const _isBMapPoint = (point: any): boolean => !!point && point instanceof BMap.Point;

// 地址查询：http://lbsyun.baidu.com/jsdemo.htm#i7_2
export const geoCoder = new BMap.Geocoder();

// 转换坐标点
// 约定：传入的是数组格式，那么认为传入的是 WGS84 坐标，会转换为 bd09 的坐标点
// 如果传入的 bd09 坐标点，那么会原样返回
export const convertPoint: ConvertPoint = (point, from = 1, to = 5) => {
    if (Array.isArray(point)) {
        const HASH = {
            1: WGS84,
            5: BD09
        };
        return new Promise((resolve) => {
            try {
                const result = transform([point[0], point[1]], HASH[from], HASH[to]);
                resolve(new BMap.Point((result as Position)[0], (result as Position)[1]));
            } catch (e) {
                console.error(e, '坐标转换失败');
            }
        });
    }
    return point;
};

// 生成地图
export const initMap: InitMap = async (id, options) => {
    const container = document.querySelector(`#${id}`);
    if (!container) {
        throw new Error(`地图容器节点不存在！(id: ${id})`);
    }

    const _options = options ? options : {};

    // 转换中心坐标
    const bdCenterPoint = await convertPoint(_options.centerPoint || DEFAULT_MAP_INFO.defaultCenter);

    const zoom = _options.zoom ? _options.zoom : DEFAULT_MAP_ZOOM;
    const minZoom = _options.minZoom ? _options.minZoom : 5;
    const maxZoom = _options.maxZoom ? _options.maxZoom : 19;

    const enableScrollWheelZoom = _options.enableScrollWheelZoom === true;
    const enableMapClick = !(_options.enableMapClick === false);
    const disableDragging = _options.disableDragging ? _options.disableDragging : false;
    const disableDoubleClickZoom = _options.disableDoubleClickZoom === true;

    // 使用个性化地图样式
    const customStyle = !(_options.customStyle === false);

    // 关闭室内图
    const enableIndoorLayer = false;

    const mapOptions = {minZoom, maxZoom, enableMapClick, enableIndoorLayer};

    return new Promise((resolve) => {
        const map = new BMap.Map(id, mapOptions);
        map.centerAndZoom(bdCenterPoint, zoom);

        // 个性化地图样式
        if (customStyle) {
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

        if (customStyle) {
            // 监听 mapStyle 请求完成时间，一个内部 API
            map.addEventListener('initindoorlayer', async () => {
                resolve(map);
            });
        } else {
            resolve(map);
        }
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
    const needScaled = !(options && options.needScaled === false);

    // 处理坐标点
    let convertPoints: Point[] = [];
    for (const point of points) {
        const isValidPoint = (Array.isArray(point) && point.length > 1) || _isBMapPoint(point);
        if (!isValidPoint) {
            continue;
        }
        convertPoints.push(await convertPoint(point));
    }

    const margins =
        options && options.margins ? options.margins.map((v) => (needScaled ? getWithByScreen(v) : v)) : [0, 0, 0, 0];

    const opt = {
        zoomFactor: options && options.zoomFactor ? options.zoomFactor : 0,
        enableAnimation: false,
        margins,
        delay: 0
    };

    return new Promise(async (resolve) => {
        map.setViewport(convertPoints, opt);
        resolve(map);
    });
};

// 重新设定地图中心
export const resetMap: ResetMap = async (map, centerPoint, zoom) => {
    // 转换中心坐标
    const pt = centerPoint ? centerPoint : DEFAULT_MAP_INFO.defaultCenter;
    const bdCenterPoint = await convertPoint(pt);
    const zoomLevel = zoom || DEFAULT_MAP_ZOOM;
    map.centerAndZoom(bdCenterPoint, zoomLevel);
    return map;
};

// 绘制单条线路
export const addMapLine: AddMapLine = async (map, line, options) => {
    const DEFAULT_OPTIONS = {
        strokeColor: '#47dcf3',
        strokeWeight: getWithByScreen(4),
        strokeOpacity: 1
    };

    // 默认缩放
    const needScaled = !(options && options.needScaled === false);

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

// 添加图标 marker
export const addMapMarker: AddMapMarker = async (map, point, icon, options) => {
    // Icon 尺寸
    const needScaled = !(options && options.needScaled === false);
    const scaledSize = icon.size.map((v) => (needScaled ? getWithByScreen(v) : v));
    const sizeInMap = new BMap.Size(scaledSize[0], scaledSize[1]);

    // 处理坐标点
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
        // 添加水波纹动画
        if (!options.animationEffect) {
            const animationSize = options && options.animationSize ? options.animationSize : icon.size[0];
            const animationScale = options && options.animationScale ? options.animationScale : 1;
            const animationInfinite = options && options.animationInfinite === true;
            marker = addMarkerAnimation(marker, {
                size: animationSize,
                scale: animationScale,
                needScaled,
                infinite: animationInfinite
            });
        } else {
            marker.setAnimation(options.animationEffect);
        }
    }

    return marker;
};

// 为 marker 添加水波纹动画
export const addMarkerAnimation: AddMarkerAnimation = (marker, options) => {
    const size = options && options.size ? options.size : 50;
    const infinite = !!(options && options.infinite === true);
    const scale = options && options.size ? options.size : 1;

    const content =
        `<div class="water-animation-in-map ${
            infinite ? 'water-animation-in-map-infinite' : ''
        }" style="width: ${size}px; height: ${size}px; transform: scale(${scale})">` +
        '  <div class="water-animation1"></div>' +
        '  <div class="water-animation2"></div>' +
        '  <div class="water-animation3"></div>' +
        '</div>';
    const label = new BMap.Label(content);
    label.setStyle({
        position: 'relative',
        padding: 0,
        border: 'none',
        background: 'none',
        zIndex: -1
    });
    marker.setLabel(label);
    return marker;
};

// 更换 marker 的 icon
export const changeMarkerIcon: ChangeMarkerIcon = (marker, options) => {
    const withAnimation = !!options.withAnimation;
    const {icon, iconSize} = options;

    // 获取当前 icon
    const targetIcon = marker.getIcon();

    // Icon 尺寸
    const needScaled = !(options && options.needScaled === false);
    const scaledSize = iconSize.map((v) => (needScaled ? getWithByScreen(v) : v));
    const sizeInMap = new BMap.Size(scaledSize[0], scaledSize[1]);

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

    // 获取当前 旋转角度
    const targetRotation = marker.getRotation();
    if (targetRotation && targetRotation > 0) {
        // 设置旋转角度
        marker.setRotation(targetRotation);
    }

    if (options && options.zIndex) {
        marker.setZIndex(options.zIndex);
    }

    return marker;
};

// 添加文本框
export const addMapLabel: AddMapLabel = async (target, text, point, offset, className, options) => {
    const needTriangle = options && options.needTriangle === true;
    const needScaled = !(options && options.needScaled === false);
    const scaledOffsetY = needScaled ? getWithByScreen(offset[1]) : offset[1];

    // label 的参数
    let opts: any = {
        // 设置文本偏移量
        offset: new BMap.Size(offset[0], scaledOffsetY)
    };

    // 如果是直接添加 label 的话需要指定位置，如果是为 maker 添加 label 则不需要
    if (target instanceof BMap.Map) {
        // 文本标注所在的地理位置
        opts.position = await convertPoint(point);
    }

    // label 的 html 节点
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

    if (target instanceof BMap.Map) {
        target.addOverlay(label);
    } else {
        target.setLabel(label);
    }

    return label;
};

// 更改 label 样式
export const changeLabelContent: ChangeLabelContent = (label, content, offset, options) => {
    const [offsetX, offsetY] = offset;
    const scaledOffsetX = options && options.needScaled ? getWithByScreen(offsetX) : offsetX;
    const scaledOffsetY = options && options.needScaled ? getWithByScreen(offsetY) : offsetY;

    //替换Label显示内容
    if (content) {
        label.setContent(content);
    }

    // 设置文本偏移量
    label.setOffset(new BMap.Size(scaledOffsetX, scaledOffsetY));

    if (options && options.zIndex) {
        label.setZIndex(options.zIndex);
    }

    return label;
};

// 根据朝向角获取 Label 的 Y 轴偏移量，0°/180° = -labelHeight - baseGap ，90°/2170° = -labelHeight
// 注意，使用此方法是，Label 的 Y 轴不要有定位偏移或者 translateY
export const getOffsetYByHeadingAngle: GetLabelOffsetYByHeadingAngle = (
    labelHeight,
    baseGap,
    headingAngle,
    options
) => {
    const needScaled = !(options && options.needScaled === false);
    const result = -labelHeight - baseGap * mathRound(Math.abs(Math.cos(Math.PI * (headingAngle / 180))), 2);
    return needScaled ? getWithByScreen(result) : result;
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
