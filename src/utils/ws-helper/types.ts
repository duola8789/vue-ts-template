import {Commit} from 'vuex';

export type WsEventHandlerKeys = 'station' | 'vehicle';

export type WsEventHandlers = {
    [keys in WsEventHandlerKeys]: Symbol;
};

export type WsPushSubjectKeys = 'v0' | 'v1';

export interface WsPushSubjects {
    [keys: string]: WsPushSubjectKeys;
}

export interface WsConnectHelper {
    (url: string, params?: {[keys: string]: any}): Promise<WebSocket>;
}

export interface WsMessageHandler {
    (messageEvent: any, params: {type: Symbol; isMock?: boolean; extraInfo?: any}, commit: Commit): Promise<void>;
}
