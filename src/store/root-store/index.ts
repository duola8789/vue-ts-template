/**
 * 在 index 中定义 store 的具体实现
 * 在 interface-types 定义 store 中相关实现的 TypeScript 类型接口
 * 在 store-types 定义 store 中使用的 Mutation/Action Type 常量
 */
import {
    RootState,
    RootGetters,
    RootMutations,
    RootActions,
    RootLoginResponse
} from '@/store/root-store/interface-types';
import {
    LOGIN_MUTATION,
    LOGIN_ACTION,
    LOGIN_URL,
    USER_ROLE_MUTATION,
    USER_ROLE_ACTION,
    USER_ROLE_URL,
    LOGOUT_MUTATION,
    LOGOUT_ACTION,
    LOGOUT_URL,
    WS_MUTATION,
    WS_CONNECT_ACTION,
    WS_DISCONNECT_ACTION
} from './store-types';
import {request, WS_URLS, wsConnectHelper} from '@/utils';

const PROJECT_ID = process.env.VUE_APP_PROJECT_ID;
const KEY_PREFIX = `_apollo_inspection_${PROJECT_ID}_`;
const TOKEN_KEY = `${KEY_PREFIX}token`;
const USERNAME_KEY = `${KEY_PREFIX}username`;

const state: RootState = {
    token: window.localStorage.getItem(TOKEN_KEY) || '',
    username: window.localStorage.getItem(USERNAME_KEY) || '',
    role: '',
    ws: null
};

const getters: RootGetters = {
    isLogin: () => () => {
        // 没有在前端处理 token 过期的情况，如果需要处理，需要使用封装的 getLocalStorageHelper 和 setLocalStorageHelper
        const token = window.localStorage.getItem(TOKEN_KEY);
        return !!token;
    },
    isAuthorized(state) {
        // 此处验证登录状态的处理比较简单，仅仅区分了两种角色，如果是更细粒度的权限可以在全局状态中保存一个 URL 列表，在此进行比对
        return !!(state.role && state.role === 'admin');
    }
};

const mutations: RootMutations = {
    // 更新用户信息
    [LOGIN_MUTATION](state, {token, username}) {
        state.token = token || state.token;
        state.username = username || state.username;
        window.localStorage.setItem(TOKEN_KEY, state.token);
        window.localStorage.setItem(USERNAME_KEY, state.username);
    },
    // 更新权限信息
    [USER_ROLE_MUTATION](state, role) {
        state.role = role ? role.toLocaleLowerCase() : state.role;
    },
    // 退出登录
    [LOGOUT_MUTATION](state) {
        state.token = '';
        state.username = '';
        state.role = '';
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(USERNAME_KEY);
    },
    // 保存 Websocket 实例
    [WS_MUTATION](state, ws) {
        state.ws = ws;
    }
};

const actions: RootActions = {
    // 登录
    async [LOGIN_ACTION]({commit}) {
        const {code, data} = await request.post<RootLoginResponse>(LOGIN_URL);
        if (code === 0 && data) {
            const {token = '', username = ''} = data;
            commit(LOGIN_MUTATION, {token, username});
        }
        return code === 0;
    },
    // 获取用户权限
    async [USER_ROLE_ACTION]({commit}, username) {
        const {code, data} = await request.post<{role: string}>(USER_ROLE_URL, {username});
        if (code === 0 && data) {
            commit(USER_ROLE_MUTATION, data.role);
        } else {
            commit(USER_ROLE_MUTATION, 'user');
        }
        return code === 0;
    },
    // 退出登录
    async [LOGOUT_ACTION]({commit}) {
        const {code} = await request.post<{}>(LOGOUT_URL);
        if (code === 0) {
            commit(LOGOUT_MUTATION);
        }
        return code === 0;
    },
    // 连接 Websocket
    async [WS_CONNECT_ACTION]({commit, state}) {
        if (!state.ws) {
            const ws = await wsConnectHelper(WS_URLS.default);
            commit(WS_MUTATION, ws);
        }
    },
    // 断开 Websocket
    async [WS_DISCONNECT_ACTION]({commit, state}) {
        if (state.ws && typeof state.ws.close === 'function') {
            state.ws.close();
            commit(WS_MUTATION, null);
        }
    }
};

export default {state, getters, mutations, actions};
