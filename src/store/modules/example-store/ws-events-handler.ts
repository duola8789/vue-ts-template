import store from '@/store';
import {STORE_EXAMPLE} from '@/store/modules/config';
import {parseMessageEvent, WS_TOPICS} from '@/utils';

const NAME_SPACE = `${STORE_EXAMPLE}/`;

// WS 推送事件处理程序
export function exampleMonitorWsListener(messageEvent: MessageEvent) {
    const wsData: WsResponse<any> = parseMessageEvent(messageEvent);
    if (wsData) {
        const {ext, data} = wsData;
        if (data && ext) {
            switch (+ext.type) {
                case WS_TOPICS.gisOverviewData: {
                    exampleDataHandler(data as any);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
}

export function exampleDataHandler(data: any) {
    // store.commit(NAME_SPACE + OVERVIEW_DATA_MUTATION, data);
}
