export type WsTopicKeys = 'v0' | 'v1';

export interface WsTopics {
    [keys: string]: WsTopicKeys;
}

export interface WsConnectHelper {
    (url: string, params?: {[keys: string]: any}): Promise<WebSocket>;
}
