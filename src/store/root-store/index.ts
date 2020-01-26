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
import {request, getLocalStorageHelper, setLocalStorageHelper, removeLocalStorageHelper} from '@/utils';

const state: RootState = {
    token: getLocalStorageHelper('token'),
    userInfo: getLocalStorageHelper('userInfo'),
    userRole: ''
};

const getters: RootGetters = {
    isLogin: () => () => {
        const token = getLocalStorageHelper('token');
        const userInfo = getLocalStorageHelper('userInfo');
        return !!token && !!userInfo && !!userInfo.userId;
    },
    username(state) {
        return state.userInfo ? state.userInfo.username : '';
    },
    userId(state) {
        return state.userInfo ? state.userInfo.userId : '';
    },
    isAuthorized(state) {
        return !!state.userInfo;
    }
};

const mutations: RootMutations = {
    // 更新用户信息
    [ROOT_UPDATE_USER_INFO_MUTATION](state, {token, userInfo}) {
        state.token = token;
        state.userInfo = userInfo;
    },
    // 更新权限信息
    [ROOT_UPDATE_USER_ROLE_MUTATION](state, role) {
        state.userRole = role;
    },
    // 退出登录
    [ROOT_LOGOUT_MUTATION](state) {
        state.token = '';
        state.userInfo = null;
        state.userRole = '';
    }
};

const actions: RootActions = {
    // 登录
    async [ROOT_LOGIN_ACTION]({commit}) {
        const {code, data} = await request.post<RootLoginResponse>(ROOT_LOGIN_URL);
        if (code === 0 && data) {
            const {token = '', username = '', userId = ''} = data;
            const userInfo = {username, userId};
            commit(ROOT_UPDATE_USER_INFO_MUTATION, {token, userInfo});
            setLocalStorageHelper('token', token);
            setLocalStorageHelper('userInfo', userInfo);
        }
        return code === 0;
    },
    // 获取用户权限
    async [ROOT_GET_USER_ROLE_ACTION]({commit}, userId) {
        const {code, data} = await request.post<{role: string}>(ROOT_GET_USER_ROLE_URL, {userId});
        if (code === 0 && data) {
            commit(ROOT_UPDATE_USER_ROLE_MUTATION, data.role);
        }
        return code === 0;
    },
    // 退出登录
    async [ROOT_LOGOUT_ACTION]({state, commit}) {
        const {code} = await request.post<{}>(ROOT_LOGOUT_URL, {userId: state.userInfo!.userId});
        if (code === 0) {
            commit(ROOT_LOGOUT_MUTATION);
            removeLocalStorageHelper('token');
            removeLocalStorageHelper('userInfo');
        }
        return code === 0;
    }
};

export default {state, getters, mutations, actions};
