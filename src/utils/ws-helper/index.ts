/**
 * @file WebSocket 相关辅助函数
 */
import {Message} from 'element-ui';

import store from '@/store';
import {parseJSON, stringifyParams} from '@/utils';
import {WsConnectHelper} from './types';
import {WS_CONNECT_ACTION} from '@/store/root-store/store-types';
import {CURRENT_PROJECT_INFO} from '@/config';

// 默认的 WS 连接前缀
export const WS_BASE_URL = process.env.VUE_APP_WS_BASE_URL;

// 获取完整的 WS 链接 URL，在此项 WS 链接后添加参数
const _getWSUrl = (url: string, params: any) => {
    const baseParams = {project: CURRENT_PROJECT_INFO.projectKey, token: store.state.token || undefined};
    const paramsUrl = stringifyParams(Object.assign({}, baseParams, params));

    if (url.startsWith('ws')) {
        return paramsUrl ? `${url}?${paramsUrl}` : url;
    }

    if (WS_BASE_URL.startsWith('ws')) {
        return paramsUrl ? `${WS_BASE_URL}${url}?${paramsUrl}` : `${WS_BASE_URL}${url}`;
    }

    const {protocol, host} = window.location;
    const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
    return paramsUrl
        ? `${wsProtocol}://${host}${WS_BASE_URL}${url}?${paramsUrl}`
        : `${wsProtocol}://${host}${WS_BASE_URL}${url}`;
};

// WS 链接路径
export const WS_URLS = {
    default: '/v1/socket'
};

// WS 推送的主题（服务端确定）
export const WS_TOPICS = {
    gisVehState: 11, // GIS 车辆状态
    gisRoadEvents: 12, // GIS 事件数据
    gisOverviewData: 13, //  GIS 巡检状态总览
    gisEventStat: 14, // GIS 道路事件统计
    gisEventRegion: 15, // GIS 事件热门区域
    briefData: 21 // 数据监控-调用服务次数
};

let errCount = 0;
const hintWsError = () => {
    if (errCount <= 0) {
        errCount += 1;
        Message.error({
            message: '实时推送连接建立失败，请刷新页面重试',
            onClose() {
                errCount -= 1;
            }
        });
    }
};

// 创建 WS 连接
export const wsConnectHelper: WsConnectHelper = (url, params) => {
    return new Promise((resolve) => {
        const fullUrl = _getWSUrl(url, params);
        const ws = new WebSocket(fullUrl);

        ws.onopen = () => {
            resolve(ws);
        };

        ws.onerror = () => {
            hintWsError();
        };
    });
};

// 解析 WS 推送的数据
export const parseMessageEvent = (messageEvent: MessageEvent): any => {
    if (!messageEvent) {
        return null;
    }
    const {data} = messageEvent;

    if (!data || typeof data !== 'string' || ['fail', 'ok'].includes(data)) {
        if (messageEvent.data === 'fail') {
            hintWsError();
        }
        return null;
    }

    return parseJSON(data);
};

// 添加 WS 事件监听器
export const addWsEvent = async (listener: (messageEvent: MessageEvent) => void) => {
    if (!store.state.ws) {
        await store.dispatch(WS_CONNECT_ACTION);
    }
    if (store.state.ws) {
        store.state.ws.addEventListener('message', listener);
    }
};

// 移除 WS 事件监听器
export const removeWsEvent = async (listener: (messageEvent: MessageEvent) => void) => {
    if (store.state.ws) {
        store.state.ws.removeEventListener('message', listener);
    }
};
