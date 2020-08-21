/**
 * 百度地图相关的辅助方法
 * 关于坐标系转换的说明：所有涉及到坐标点的辅助方法，如果传入的形式为二维数组（[longitude, latitude]）认为是 WGS84 坐标系，会进行坐标转换
 * 如果传入的是 RMap.Point 格式的坐标点，则默认为 bd09 坐标系，不会进行坐标转换
 * 所有坐标二维数组，都需要经度在前，纬度在后
 */

import {
    InitMap,
    AddMapMarker,
    AddMapLabel,
    AddMapLines,
    AddMapLine,
    AddCommonLabel,
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

import {Position} from 'gcoord/dist/types/geojson';
import {transform, WGS84, BD09} from 'gcoord';

import {getWithByScreen, mathRound} from '@/utils';
import {loadingCounter} from '@/utils/network-helper/loading-counter';

import {CURRENT_PROJECT_INFO, MapApi} from '@/config';
import {styleJson} from '@/utils/map-helper/custorm-style';

export const RMap = MapApi;
export const isMapGl = !(window as any).BMap;

// 判断是不是一个 bd09 的百度地图坐标点
const _isBMapPoint = (point: any): boolean => !!point && point.lat && point.lng;

// 地址查询：http://lbsyun.baidu.com/jsdemo.htm#i7_2
export const geoCoder = new RMap.Geocoder();

// 转换坐标点
// 约定：传入的是数组格式，那么认为传入的是 WGS84 坐标，会转换为 bd09 的坐标点
// 如果传入的 bd09 坐标点，那么会原样返回
export const convertPoint: ConvertPoint = (point, from = 1, to = 5) => {
    if (Array.isArray(point)) {
        const HASH = {
            1: WGS84,
            5: BD09
        };
        try {
            const result = transform([point[0], point[1]], HASH[from], HASH[to]);
            return new RMap.Point((result as Position)[0], (result as Position)[1]);
        } catch (e) {
            throw new Error('坐标转换失败');
        }
    }
    return point;
};

// 生成地图
export const initMap: InitMap = async (id, options) => {
    const container = document.querySelector(`#${id}`);
    if (!container) {
        throw new Error(`地图容器节点不存在！(id: ${id})`);
    }

    loadingCounter.addLoading();

    const _options = options ? options : {};

    // 转换中心坐标
    const bdCenterPoint = convertPoint(_options.centerPoint || CURRENT_PROJECT_INFO.mapCenter);

    const zoom = _options.zoom ? _options.zoom : CURRENT_PROJECT_INFO.mapZoom;
    const minZoom = _options.minZoom ? _options.minZoom : 5;
    const maxZoom = _options.maxZoom ? _options.maxZoom : 21;

    const enableScrollWheelZoom = !(_options.enableScrollWheelZoom === true);
    const enableMapClick = _options.enableMapClick === false;
    const disableDragging = _options.disableDragging ? _options.disableDragging : false;
    const disableDoubleClickZoom = _options.disableDoubleClickZoom === true;

    // 使用个性化地图样式
    const customStyle = !(_options.customStyle === false);

    // 关闭室内图
    const enableIndoorLayer = false;

    const mapOptions = {minZoom, maxZoom, enableMapClick, enableIndoorLayer};

    return new Promise((resolve) => {
        const map = new RMap.Map(id, mapOptions);
        map.centerAndZoom(bdCenterPoint, zoom);

        // 个性化地图样式，未使用 ID 加载，因为使用 ID 时，在重复利用地图实例时会有闪烁的问题
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
            if (isMapGl) {
                // 添加延时，防止加载 marker 阻塞个性化地图的加载
                setTimeout(() => {
                    resolve(map);
                    loadingCounter.subLoading();
                }, 500);
            } else {
                // 防止 initindoorlayer 事件失效，做了一个超时处理
                let timer = setTimeout(() => {
                    console.error('initindoorlayer 失效');
                    resolve(map);
                    loadingCounter.subLoading();
                }, 5000);

                // 监听 mapStyle 请求完成，一个内部 API
                map.addEventListener('initindoorlayer', () => {
                    resolve(map);
                    loadingCounter.subLoading();
                    clearTimeout(timer);
                });
            }
        } else {
            resolve(map);
            loadingCounter.subLoading();
        }
    });
};

// 设定中心
export const setMapCenter: SetMapCenter = (map, point) => {
    map.setCenter(convertPoint(point));
};

// 根据传入的点设置地图视野
export const setMapViewport: SetMapViewport = (map, points, options) => {
    const needScaled = !(options && options.needScaled === false);

    // 处理坐标点
    let convertPoints: TypeRPoint[] = [];
    for (const point of points) {
        const isValidPoint = (Array.isArray(point) && point.length > 1) || _isBMapPoint(point);
        if (!isValidPoint) {
            continue;
        }
        convertPoints.push(convertPoint(point));
    }

    const margins =
        options && options.margins ? options.margins.map((v) => (needScaled ? getWithByScreen(v) : v)) : [0, 0, 0, 0];

    const opt = {
        zoomFactor: options && options.zoomFactor ? options.zoomFactor : 0,
        enableAnimation: false,
        margins,
        delay: 0
    };

    map.setViewport(convertPoints, opt);
};

// 重新设定地图中心（默认禁止动画，防止地图显示/隐藏切换时因为动画导致重置无法生效）
export const resetMap: ResetMap = (map, centerPoint, zoom, noAnimation = true) => {
    const pt = centerPoint ? centerPoint : CURRENT_PROJECT_INFO.mapCenter;
    const zoomLevel = zoom || CURRENT_PROJECT_INFO.mapZoom;

    map.setCenter(pt, {noAnimation});
    map.setZoom(zoomLevel, {noAnimation});
};

// 绘制单条线路
export const addMapLine: AddMapLine = (map, line, options) => {
    // 默认缩放
    const needScaled = !(options && options.needScaled === false);

    // 线宽
    const strokeWeight = options && options.strokeWeight ? options.strokeWeight : 4;

    const DEFAULT_OPTIONS = {
        strokeColor: '#47dcf3',
        strokeWeight: needScaled ? getWithByScreen(strokeWeight) : strokeWeight,
        strokeOpacity: 1
    };

    // 处理坐标点
    let convertPoints = [];
    for (const point of line) {
        const isValidPoint = (Array.isArray(point) && point.length > 1) || _isBMapPoint(point);
        if (!isValidPoint) {
            continue;
        }
        convertPoints.push(convertPoint(point));
    }

    // 描线
    const polyline = new RMap.Polyline(convertPoints, Object.assign({}, DEFAULT_OPTIONS, options));
    map.addOverlay(polyline);

    return polyline;
};

// 绘制多条线路
export const addMapLines: AddMapLines = (map, lines, options) => {
    return (lines as any[][]).map((line) => addMapLine(map, line, options));
};

// 添加图标 marker
export const addMapMarker: AddMapMarker = (point, icon, options) => {
    // Icon 尺寸
    const needScaled = !(options && options.needScaled === false);
    const scaledSize = icon.size.map((v) => (needScaled ? getWithByScreen(v) : v));
    const sizeInMap = new RMap.Size(scaledSize[0], scaledSize[1]);

    const mapIcon = new RMap.Icon(icon.src, sizeInMap);

    if (icon.anchor != undefined) {
        const scaledAnchor = icon.anchor.map((v) => (needScaled ? getWithByScreen(v) : v));
        mapIcon.setAnchor(new RMap.Size(scaledAnchor[0], scaledAnchor[1]));
    }

    mapIcon.setImageSize(sizeInMap);

    let marker = new RMap.Marker(convertPoint(point), {icon: mapIcon});

    if (options && options.labelOffset) {
        const scaledLabelOffset = options.labelOffset.map((v) => (needScaled ? getWithByScreen(v) : v));
        marker.setOffset(new RMap.Size(scaledLabelOffset[0], scaledLabelOffset[1]));
    }

    if (options && options.rotation != undefined) {
        marker.setRotation(options.rotation);
    }

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
    const infinite = !!(options && options.infinite === true);

    const content =
        `<div class="water-animation-in-map ${infinite ? 'water-animation-in-map-infinite' : ''}">` +
        '  <div class="water-animation1"></div>' +
        '  <div class="water-animation2"></div>' +
        '  <div class="water-animation3"></div>' +
        '</div>';
    const label = new RMap.Label(content);
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
    const sizeInMap = new RMap.Size(scaledSize[0], scaledSize[1]);

    if (targetIcon) {
        // 设置 icon 图片
        targetIcon.setImageUrl(icon);
        // 设置 icon 图片尺寸
        targetIcon.setImageSize(sizeInMap);
        // 恢复 icon 尺寸
        targetIcon.setSize(sizeInMap);
        // 设置 icon 偏移量
        if (options && options.anchor) {
            const scaledAnchorSize = options.anchor.map((v) => (needScaled ? getWithByScreen(v) : v));
            const anchorSizeInMap = new RMap.Size(scaledAnchorSize[0], scaledAnchorSize[1]);
            targetIcon.setAnchor(anchorSizeInMap);
        } else {
            targetIcon.setAnchor(new BMap.Size(iconSize[0] / 2, iconSize[1] / 2));
        }
        // 设置 icon
        marker.setIcon(targetIcon);

        // 如果 marker 设置了动画效果，那么更改图标时需要清除
        if (withAnimation) {
            marker.getLabel().setStyle({display: 'none'});
        }
    }

    // 获取当前旋转角度
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

export const addCommonLabel: AddCommonLabel = (target, content, point, options) => {
    const needScaled = !(options && options.needScaled === false);
    const label = new RMap.Label(content);

    // label 的参数
    let opts: any = {};

    // 如果是直接添加 label 的话需要指定位置，如果是为 maker 添加 label 则不需要
    if (target instanceof RMap.Map && point) {
        // 文本标注所在的地理位置
        opts.position = convertPoint(point);
    }

    // label 外围样式，内部样式通过上面的节点类在自行定义
    const DEFAULT_STYLE = {padding: 0, border: 'none', background: 'none'};
    const labelStyle =
        options && options.labelStyle ? Object.assign({}, DEFAULT_STYLE, options.labelStyle) : DEFAULT_STYLE;
    label.setStyle(labelStyle);

    if (target instanceof RMap.Map) {
        target.addOverlay(label);
    } else if (target instanceof RMap.Marker) {
        target.setLabel(label);
    }

    return label;
};

// 添加文本框
export const addMapLabel: AddMapLabel = (target, text, point, offset, className, options) => {
    const needTriangle = options && options.needTriangle === true;
    const needScaled = !(options && options.needScaled === false);
    const scaledOffsetY = needScaled ? getWithByScreen(offset[1]) : offset[1];

    // label 的参数
    let opts: any = {
        // 设置文本偏移量
        offset: new RMap.Size(offset[0], scaledOffsetY)
    };

    // 如果是直接添加 label 的话需要指定位置，如果是为 maker 添加 label 则不需要
    if (target instanceof RMap.Map) {
        // 文本标注所在的地理位置
        opts.position = convertPoint(point);
    }

    // label 的 html 节点
    const content =
        `<div class="${className}">` +
        `<div class="map-label-text">${text}</div>` +
        `${needTriangle ? '<div class="map-label-triangle"></div>' : ''}` +
        '</div>';
    const label = new RMap.Label(content, opts);

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

    if (target instanceof RMap.Map) {
        target.addOverlay(label);
    } else if (target instanceof RMap.Marker) {
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
    label.setOffset(new RMap.Size(scaledOffsetX, scaledOffsetY));

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
    const NW = new RMap.Point(SW.lng, NE.lat);
    const SE = new RMap.Point(NE.lng, SW.lat);
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
    const mask = new RMap.Polygon(points, polyOptions);
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
