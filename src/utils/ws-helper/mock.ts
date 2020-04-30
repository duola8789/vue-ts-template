/**
 * @file 用计时器来在本地 Mock WebSocket 连接
 */
import store from '@/store';
import {wsMessageHandler} from '@/utils';

export const mockStationChange = (type: Symbol, isAdd = true, interval = 3000): number => {
    const MOCK_EVENTS_REMOVE = 123;
    return setInterval(async () => {
        await wsMessageHandler({data: JSON.stringify(MOCK_EVENTS_REMOVE)}, {type, isMock: true}, store.commit);
    }, interval);
};
