/**
 * @file WebSocket 相关辅助函数
 */
import {Message} from 'element-ui';

// 开发模式下引入 WS 的 Mock 函数
// process.env.NODE_ENV === 'development' && require('./mocker');

import store from '@/store';
import {stringifyParams} from '@/utils';
import {WsConnectHelper, WsTopics} from './types';

// 默认的 WS 连接前缀
export const WS_BASE_URL = process.env.VUE_APP_WS_BASE_URL;

// 获取完整的 WS 链接 URL，在此项 WS 链接后添加参数
const _getWSUrl = (url: string, params: any) => {
    const paramsUrl = stringifyParams(Object.assign({}, params));

    if (WS_BASE_URL.startsWith('ws')) {
        return `${WS_BASE_URL}${url}?${paramsUrl}`;
    }

    const {protocol, host} = window.location;
    const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
    return `${wsProtocol}://${host}${WS_BASE_URL}${url}?${paramsUrl}`;
};

// WS 链接路径
export const WS_URLS = {
    traffic: '/traffic'
};

// WS 推送的主题（服务端确定）
export const WS_TOPICS: WsTopics = {
    station: 'v0', // 监控 - 站点
    vehicle: 'v1' // 监控 - 车辆
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
        const {token} = store.state;
        if (token) {
            const fullUrl = _getWSUrl(url, params);
            const ws = new WebSocket(fullUrl);

            ws.onopen = () => {
                resolve(ws);
            };

            ws.onerror = () => {
                hintWsError();
            };
        }
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

    try {
        const res = JSON.parse(data);
        return res.data || null;
    } catch (e) {
        console.error(e, 'ws 解析错误');
        return null;
    }
};
