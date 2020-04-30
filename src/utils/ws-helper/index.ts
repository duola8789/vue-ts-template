/**
 * @file WebSocket 相关辅助函数
 */
import {Message} from 'element-ui';

import {stringifyParams, parseJSON} from '@/utils';
import {WsConnectHelper, WsMessageHandler, WsEventHandlers, WsPushSubjects} from './types';

import {mockStationChange} from '@/utils/ws-helper/mock';

// 根据当前页面网络协议，获取对应的 WS 协议
const _getWSUrl = (url: string, param: string) => {
    const {protocol, host} = window.location;
    const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
    return `${wsProtocol}://${host}${WS_BASE_URL}${url}?${param}`;
};

// 默认的 WS 连接前缀
export const WS_BASE_URL = process.env.VUE_APP_WS_BASE_URL;

// WS 事件处理程序的键名
export const WS_EVENT_HANDLERS: WsEventHandlers = {
    station: Symbol('station'), // 监控 - 站点
    vehicle: Symbol('vehicle') // 监控 - 车辆
};

// WS 推送的主题（服务端确定）
export const WS_PUSH: WsPushSubjects = {
    station: 'v0', // 监控 - 站点
    vehicle: 'v1' // 监控 - 车辆
};

let errCount = 0;
// 创建 WS 连接
export const wsConnectHelper: WsConnectHelper = (url, params) => {
    return new Promise((resolve) => {
        const token = window.localStorage.getItem('v2xToken') as string;
        const tokenObj = params ? Object.assign({}, params, {token}) : {token};
        const paramsUrl = stringifyParams(tokenObj);
        const fullUrl = WS_BASE_URL.startsWith('ws') ? `${WS_BASE_URL}${url}?${paramsUrl}` : _getWSUrl(url, paramsUrl);
        if (token) {
            const ws = new WebSocket(fullUrl);
            ws.onopen = () => {
                resolve(ws);
            };
            ws.onerror = () => {
                if (errCount <= 0) {
                    errCount += 1;
                    Message.error({
                        message: 'WebSocket连接建立失败，请刷新页面重试',
                        onClose() {
                            errCount -= 1;
                        }
                    });
                }
            };
        } else {
            Message.error('token不存在，请刷新页面');
        }
    });
};

// WS 事件处理函数
export const wsMessageHandler: WsMessageHandler = async (messageEvent, params, commit) => {
    try {
        const {type, isMock = false, extraInfo} = params;

        const wsData = parseJSON(messageEvent.data);
        if (!wsData) {
            return;
        }

        switch (type) {
            case WS_EVENT_HANDLERS.station: {
                // // 传入定义的相应数据的类型，如下的 any，并对 WS 推送的主题再次进行验证
                // const {wsType} = wsData as any;
                // if (wsType === 1) {
                //     // do something...
                // }
                // // 在本地定时器模拟 WS 推送时需要将 isMock 设定为 true，并传入 vuex 的 module 路径
                // const namespace = isMock ? 'monitorManagement/trafficMonitor/' : '';
                //
                // // 更新当日交通事件
                // const payload: ExamplePayload = {}
                // commit(namespace + WS_DAY_TRAFFIC_EVENTS_MUTATION, payload);
                break;
            }

            default: {
                break;
            }
        }
    } catch (e) {
        throw new Error(e);
    }
};

// mock
// mockStationChange(WS_EVENT_HANDLERS.station, true, 5000);
