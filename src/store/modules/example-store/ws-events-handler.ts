import store from '@/store';
import storeModules from '@/store/modules';
const NAME_SPACE = storeModules.example.name;

// WS 推送事件处理程序
export async function exampleWsHandler(wsData: string[]) {
    // store.commit(NAME_SPACE + 'ACTION NAME', payload)
}
