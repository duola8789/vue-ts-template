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
    USER_PERMISSION_MUTATION,
    USER_PERMISSION_ACTION,
    USER_PERMISSION_URL,
    LOGOUT_MUTATION,
    LOGOUT_ACTION,
    LOGOUT_URL,
    WS_MUTATION,
    WS_CONNECT_ACTION,
    WS_DISCONNECT_ACTION
} from './store-types';
import {request, WS_URLS, wsConnectHelper} from '@/utils';

import {USER_PERMISSION_HASH} from '@/config';

const KEY_PREFIX = `_robotaxi_`;
const TOKEN_KEY = `${KEY_PREFIX}token`;
const USERNAME_KEY = `${KEY_PREFIX}user_name`;

const state: RootState = {
    token: window.localStorage.getItem(TOKEN_KEY) || '',
    userName: window.localStorage.getItem(USERNAME_KEY) || '',
    permission: -1,
    ws: null
};

const getters: RootGetters = {
    isLogin: () => () => {
        const token = window.localStorage.getItem(TOKEN_KEY);
        return !!token;
    },
    isAuthorized(state) {
        const visiblePermission: number[] = [USER_PERMISSION_HASH.admin, USER_PERMISSION_HASH.user];
        return visiblePermission.includes(+state.permission);
    }
};

const mutations: RootMutations = {
    // 更新用户信息
    [LOGIN_MUTATION](state, {token, userName}) {
        state.token = token || state.token;
        state.userName = userName || state.userName;
        window.localStorage.setItem(TOKEN_KEY, state.token);
        window.localStorage.setItem(USERNAME_KEY, state.userName);
    },
    // 更新权限信息
    [USER_PERMISSION_MUTATION](state, permission) {
        state.permission = permission;
    },
    // 退出登录
    [LOGOUT_MUTATION](state) {
        state.token = '';
        state.userName = '';
        state.permission = -1;
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
            const {token = '', userName = ''} = data;
            commit(LOGIN_MUTATION, {token, userName});
        }
        return code === 0;
    },
    // 获取用户权限
    async [USER_PERMISSION_ACTION]({commit}, userName) {
        const {code, data} = await request.post<{role: string}>(USER_PERMISSION_URL, {userName});
        if (code === 0 && data) {
            commit(USER_PERMISSION_MUTATION, data.role);
        } else {
            commit(USER_PERMISSION_MUTATION, 'user');
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
