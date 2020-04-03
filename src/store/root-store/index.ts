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
    ROOT_UPDATE_USER_INFO_MUTATION,
    ROOT_UPDATE_USER_ROLE_MUTATION,
    ROOT_LOGIN_URL,
    ROOT_LOGIN_ACTION,
    ROOT_LOGOUT_URL,
    ROOT_LOGOUT_MUTATION,
    ROOT_LOGOUT_ACTION,
    ROOT_GET_USER_ROLE_ACTION,
    ROOT_GET_USER_ROLE_URL
} from '@/store/root-store/store-types';
import {request} from '@/utils';

const state: RootState = {
    token: window.localStorage.getItem('_roboToken') || '',
    username: window.localStorage.getItem('_roboUsername') || '',
    role: window.localStorage.getItem('_roboRole') || ''
};

const getters: RootGetters = {
    isLogin: () => () => {
        // 没有在前端处理 token 过期的情况，如果需要处理，需要使用封装的 getLocalStorageHelper 和 setLocalStorageHelper
        const token = window.localStorage.getItem('_roboToken');
        return !!token;
    },
    isAuthorized(state) {
        // 此处验证登陆状态的处理比较简单，仅仅区分了两种角色，如果是更细粒度的权限可以在全局状态中保存一个 URL 列表，在此进行比对
        return !!(state.role && state.role === 'admin');
    }
};

const mutations: RootMutations = {
    // 更新用户信息
    [ROOT_UPDATE_USER_INFO_MUTATION](state, {token, username}) {
        state.token = token || state.token;
        state.username = username || state.username;
        window.localStorage.setItem('_roboToken', state.token);
        window.localStorage.setItem('_roboUsername', state.username);
    },
    // 更新权限信息
    [ROOT_UPDATE_USER_ROLE_MUTATION](state, role) {
        state.role = role ? role.toLocaleLowerCase() : state.role;
        window.localStorage.setItem('_roboRole', state.role);
    },
    // 退出登录
    [ROOT_LOGOUT_MUTATION](state) {
        state.token = '';
        state.username = '';
        state.role = '';
        window.localStorage.removeItem('_roboToken');
        window.localStorage.removeItem('_roboUsername');
        window.localStorage.removeItem('_roboRole');
    }
};

const actions: RootActions = {
    // 登录
    async [ROOT_LOGIN_ACTION]({commit}) {
        const {code, data} = await request.post<RootLoginResponse>(ROOT_LOGIN_URL);
        if (code === 0 && data) {
            const {token = '', username = ''} = data;
            commit(ROOT_UPDATE_USER_INFO_MUTATION, {token, username});
        }
        return code === 0;
    },
    // 获取用户权限
    async [ROOT_GET_USER_ROLE_ACTION]({commit}, username) {
        const {code, data} = await request.post<{role: string}>(ROOT_GET_USER_ROLE_URL, {username});
        if (code === 0 && data) {
            commit(ROOT_UPDATE_USER_ROLE_MUTATION, data.role);
        }
        return code === 0;
    },
    // 退出登录
    async [ROOT_LOGOUT_ACTION]({commit}) {
        const {code} = await request.post<{}>(ROOT_LOGOUT_URL);
        if (code === 0) {
            commit(ROOT_LOGOUT_MUTATION);
        }
        return code === 0;
    }
};

export default {state, getters, mutations, actions};
